import VifoSendRequest from './VifoSendRequest';
import VifoAuthenticate from './VifoAuthenticate';
import VifoBank from './VifoBank';
import VifoTransferMoney from './VifoTransferMoney';
import VifoApproveTransferMoney from './VifoApproveTransferMoney';
import Webhook from './Webhook';
import VifoOtherRequest from './VifoOtherRequest';
import VifoCreateOrder from './VifoCreateOrder';
import VifoServiceFactoryInterface from '../Interfaces/VifoServiceFactoryInterface';

class VifoServiceFactory implements VifoServiceFactoryInterface {
    private sendRequest: VifoSendRequest;
    private webhook: Webhook;
    private createOrder: VifoCreateOrder;
    private otherRequest: VifoOtherRequest;
    private approveTransferMoney: VifoApproveTransferMoney;
    private transferMoney: VifoTransferMoney;
    private bank: VifoBank;
    private loginAuthenticateUser: VifoAuthenticate;
    private env: string;
    private headers: object;
    private headersLogin: object;
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
        this.createOrder = new VifoCreateOrder;
        this.approveTransferMoney = new VifoApproveTransferMoney();

        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

    getAuthorizationHeaders(type: string): { [key: string]: string } {
        const token = type == 'user' ? this.userToken : this.adminToken;

        return {
            ...this.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    async performUserAuthentication(username: string, password: string): Promise<object> {
        const response = await this.loginAuthenticateUser.authenticateUser(this.headersLogin, username, password);

        if ('errors' in response) {
            return {
                message: 'Authentication failed',
                status_code: 'status_code' in response ? response.status_code : ''

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

    async fetchBeneficiaryName(body: object): Promise<object> {
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

    async executeMoneyTransfer(body: object): Promise<object> {
        const headers = this.getAuthorizationHeaders('user');

        const response = await this.transferMoney.createTransferMoney(headers, body);

        if ('success' in response) {
            return {
                message: 'body' in response ? response.body : ''
            };
        }
        return response;
    }

    async approveMoneyTransfer(secretKey: string, timestamp: string, body: object): Promise<object> {
        const headers = this.getAuthorizationHeaders('admin');

        const requestSignature = this.approveTransferMoney.createSignature(secretKey, timestamp, body);

        headers['x-request-timestamp'] = `${timestamp}`;
        headers['x-request-signature'] = `${requestSignature}`;

        const response = await this.approveTransferMoney.approveTransfers(secretKey, timestamp, headers, body);

        if ('errors' in response) {
            return {
                errors: 'errors',
                body: 'body' in response ? response.body : ''
            }
        }
        return response;
    }
    async verifyWebhookSignature(data: object, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean> {
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
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        fullname: string,
        finalAmount: number,
        beneficiaryAccountNo: string,
        beneficiaryBankCode: string,
        comment: string,
        sourceAccountNo: string
    ): Promise<object> {
        const headers = this.getAuthorizationHeaders('admin');
        const body = {
            'product_code': productCode,
            'phone': phone,
            'fullname': fullname,
            'final_amount': finalAmount,
            'distributor_order_number': distributorOrderNumber,
            'benefiary_bank_code': beneficiaryBankCode,
            'benefiary account no': beneficiaryAccountNo,
            'comment': comment,
            'source_account_no': sourceAccountNo,
        }
        const response = await this.createOrder.createOrder(headers, body);
        if ('errors' in response) {
            return {
                status: 'errors',
                'message': response.errors,
                status_code: 'status_code' in response ? response.status_code : ''
            };
        }
        return response;
    }

    async createSevaOrder(
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        fullname: string,
        finalAmount: number,
        beneficiaryAccountNo: string,
        beneficiaryBankCode: string,
        comment: string,
        sourceAccountNo: string
    ): Promise<object> {
        return await this.createRevaOrder(
            productCode,
            distributorOrderNumber,
            phone,
            fullname,
            finalAmount,
            beneficiaryAccountNo,
            beneficiaryBankCode,
            comment,
            sourceAccountNo
        );
    }
}
export default VifoServiceFactory;
