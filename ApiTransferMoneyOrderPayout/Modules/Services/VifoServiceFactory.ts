import VifoSendRequest from './VifoSendRequest';
import VifoAuthenticate from './VifoAuthenticate';
import VifoBank from './VifoBank';
import VifoTransferMoney from './VifoTransferMoney';
import VifoApproveTransferMoney from './VifoApproveTransferMoney';
import Webhook from './Webhook';
import VifoOtherRequest from './VifoOtherRequest';
import VifoServiceFactoryInterface from '../Interfaces/VifoServiceFactoryInterface';
import HeaderInterface from '../Interfaces/HeaderInterface';
import HeaderLoginInterface from '../Interfaces/HeaderLoginInterface';
import BodyAutheticaterface from '../Interfaces/BodyAutheticaterface';
import BodyBeneficiaryName from '../Interfaces/BodyBeneficiaryName';
import BodyTransferMoneyInterface from '../Interfaces/BodyTransferMoneyInterface';
import BodyApproveTransferMoney from '../Interfaces/BodyApproveTransferMoney';
import BodyWebhookInterface from '../Interfaces/BodyWebhookInterface';
import BodyCreateRevaOrderInterface from '../Interfaces/BodyCreateRevaOrderInterface';
import BodyCreateSevaOrderInterface from '../Interfaces/BodyCreateSevaOrderInterface';
import VifoCreateSevaOrder from './VifoCreateSevaOrder';
import VifoCreateRevaOrder from './VifoCreateRevaOrder';
import { QRTypeSeva } from '../Interfaces/BodyCreateSevaOrderInterface';
import { QRTypeReva } from '../Interfaces/BodyCreateRevaOrderInterface';
class VifoServiceFactory implements VifoServiceFactoryInterface {
    private sendRequest: VifoSendRequest;
    private webhook: Webhook;
    private orderSeva: VifoCreateSevaOrder;
    private orderReva: VifoCreateRevaOrder;
    private otherRequest: VifoOtherRequest;
    private approveTransferMoney: VifoApproveTransferMoney;
    private transferMoney: VifoTransferMoney;
    private bank: VifoBank;
    private loginAuthenticateUser: VifoAuthenticate;
    private env: string;
    private headers: HeaderInterface;
    private headersLogin: HeaderLoginInterface;
    private userToken: string | null;
    private adminToken: string | null;


    constructor(env: string) {
        this.env = env;
        this.sendRequest = new VifoSendRequest(this.env);
        this.webhook = new Webhook();
        this.otherRequest = new VifoOtherRequest();
        this.loginAuthenticateUser = new VifoAuthenticate();
        this.bank = new VifoBank();
        this.transferMoney = new VifoTransferMoney();
        this.approveTransferMoney = new VifoApproveTransferMoney();
        this.orderSeva = new VifoCreateSevaOrder();
        this.orderReva = new VifoCreateRevaOrder();
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': null,
            'x-request-timestamp': null,
            'x-request-signature': null,
        };
        this.headersLogin = {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'Accept-Language': '*/*',
        };
        this.adminToken = null;
        this.userToken = null;
    }
    setTokenUser(token: string): void {
        this.userToken = token;
    }

    setTokenAdmin(token: string): void {
        this.adminToken = token;
    }

    getAuthorizationHeaders(type: string): HeaderInterface {
        const token = type == 'user' ? this.userToken : this.adminToken;

        return {
            ...this.headers,
            'Authorization': `Bearer ${token}`,
            'x-request-timestamp': null,
            'x-request-signature': null,
        };
    }

    async performUserAuthentication(body: BodyAutheticaterface): Promise<object> {
        const response = await this.loginAuthenticateUser.authenticateUser(this.headersLogin, body);

        if ('body' in response) {
            return {
                status_code: 'status_code' in response ? response.status_code : '',
                body: response.body
            };
        }

        return response;
    }

    async fetchBankInformation(body: object): Promise<object> {
        const headers = this.getAuthorizationHeaders('user');
        const response = await this.bank.getBank(headers, body);

        if ('success' in response) {
            return {
                body: 'body' in response ? response.body : '',
                status_code: 'status_code' in response ? response.status_code : ''
            };
        }
        return response;
    }

    async fetchBeneficiaryName(body: BodyBeneficiaryName): Promise<object> {
        const headers = this.getAuthorizationHeaders('user');

        if (!('bank_code' in body) || !('account_number' in body)) {
            return {
                status: 'errors',
                message: 'Required fields missing: bank_code or account_number.'
            };
        }

        const response = await this.bank.getBeneficiaryName(headers, body);

        return response;
    }

    async executeMoneyTransfer(body: BodyTransferMoneyInterface): Promise<object> {
        const headers = this.getAuthorizationHeaders('user');

        const response = await this.transferMoney.createTransferMoney(headers, body);

        if ('success' in response) {
            return {
                message: 'body' in response ? response.body : ''
            };
        }
        return response;
    }

    async approveMoneyTransfer(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): Promise<object> {
        const headers: HeaderInterface = this.getAuthorizationHeaders('admin');
        const requestSignature = this.approveTransferMoney.createSignature(secretKey, timestamp, body);

        headers['x-request-timestamp'] = timestamp;
        headers['x-request-signature'] = requestSignature;

        const response = await this.approveTransferMoney.approveTransfers(secretKey, timestamp, headers, body);

        if ('errors' in response) {
            return {
                errors: 'errors',
                body: 'body' in response ? response.body : ''
            }
        }
        return response;
    }
    async verifyWebhookSignature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean> {
        const result = await this.webhook.handleSignnature(data, requestSignature, secretKey, timestamp);

        if (result !== true) {
            return false
        }
        return true;
    }
    async processOtherRequest(key: string): Promise<object> {
        const headers = this.getAuthorizationHeaders('user');

        const response = await this.otherRequest.checkOrderStatus(headers, key);
        if ('errors' in response) {
            return {
                errors: response.errors,
                status_code: 'status_code' in response ? response.status_code : '',
                body: 'body' in response ? response.body : ''
            };
        }
        return response;

    }


    async createRevaOrder(
        fullname: string,
        benefiaryBankCode: string,
        benefiaryAccountNo: string,
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        email: string,
        address: string,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: QRTypeReva | null,
        endDate: string | null
    ): Promise<object> {
        const body: BodyCreateRevaOrderInterface = {
            fullname: fullname,
            benefiary_bank_code: benefiaryBankCode,
            benefiary_account_no: benefiaryAccountNo,
            product_code: productCode,
            distributor_order_number: distributorOrderNumber,
            phone: phone,
            email: email,
            address: address,
            final_amount: finalAmount,
            comment: comment,
            bank_detail: bankDetail,
            qr_type: qrType,
            end_date: endDate,
        };

        const headers = this.getAuthorizationHeaders('user');

        const response = await this.orderReva.createRevaOrder(headers, body);
        if ('status_code' in response) {
            return {
                status_code: response.status_code,
                body: 'body' in response ? response.body : ''
            };
        }
        return response;
    }

    async createSevaOrder(
        fullname: string,
        benefiaryBankCode: string,
        benefiaryAccountNo: string,
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        email: string,
        address: string,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: QRTypeSeva | null,
        endDate: string | null
    ): Promise<object> {
        const body: BodyCreateSevaOrderInterface = {
            fullname: fullname,
            benefiary_bank_code: benefiaryBankCode,
            benefiary_account_no: benefiaryAccountNo,
            product_code: productCode,
            distributor_order_number: distributorOrderNumber,
            phone: phone,
            email: email,
            address: address,
            final_amount: finalAmount,
            comment: comment,
            bank_detail: bankDetail,
            qr_type: qrType,
            end_date: endDate,
        };

        const headers = this.getAuthorizationHeaders('user');

        const response = await this.orderSeva.createSevaOrder(headers, body);
        if ('status_code' in response) {
            return {
                status_code: response.status_code,
                body: 'body' in response ? response.body : ''
            };
        }
        return response;
    }


}
export default VifoServiceFactory;
