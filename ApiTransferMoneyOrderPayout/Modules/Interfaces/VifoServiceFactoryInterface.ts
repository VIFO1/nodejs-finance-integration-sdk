import BodyAutheticaterface from "./BodyAutheticaterface";
import HeaderInterface from "./HeaderInterface";
import BodyBankInfoInterface from "./BodyBankInfoInterface";
import BodyBeneficiaryName from "./BodyBeneficiaryName";
import BodyApproveTransferMoney from "./BodyApproveTransferMoney";
import BodyTransferMoneyInterface from "./BodyTransferMoneyInterface";
import BodyWebhookInterface from "./BodyWebhookInterface";

interface VifoServiceFactoryInterface {
    setTokenUser(token: string): void;

    setTokenAdmin(token: string): void;

    getAuthorizationHeaders(type: string): HeaderInterface ;

    performUserAuthentication(body : BodyAutheticaterface): Promise<object>;

    fetchBankInformation(body: BodyBankInfoInterface): Promise<object>;

    fetchBeneficiaryName(body: BodyBeneficiaryName): Promise<object>;

    executeMoneyTransfer(body: BodyTransferMoneyInterface): Promise<object>;

    approveMoneyTransfer(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): Promise<object>;

    verifyWebhookSignature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;

    processOtherRequest(key:string): Promise<object>;

    createRevaOrder(
        fullname: string,
        benefiary_bank_code: string,
        benefiary_account_no: string,
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        email: string,
        address: string,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: string,
        endDate: string
    ): Promise<object>;

    createSevaOrder(
        fullname: string,
        benefiary_bank_code: string,
        benefiary_account_no: string,
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        email: string,
        address: string,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: string,
        endDate: string
    ): Promise<object>

}

export default VifoServiceFactoryInterface;