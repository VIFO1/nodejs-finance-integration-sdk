import BodyAutheticaterface from "./BodyAutheticaterface";
import HeaderInterface from "./HeaderInterface";
import BodyBeneficiaryName from "./BodyBeneficiaryName";
import BodyApproveTransferMoney from "./BodyApproveTransferMoney";
import BodyTransferMoneyInterface from "./BodyTransferMoneyInterface";
import BodyWebhookInterface from "./BodyWebhookInterface";
import BodyCreateRevaOrderInterface from "./BodyCreateRevaOrderInterface";
import BodyCreateSevaOrderInterface from "./BodyCreateSevaOrderInterface";
interface VifoServiceFactoryInterface {
    setTokenUser(token: string): void;

    setTokenAdmin(token: string): void;

    getAuthorizationHeaders(type: string): HeaderInterface;

    performUserAuthentication(body: BodyAutheticaterface): Promise<object>;

    fetchBankInformation(body: object): Promise<object>;

    fetchBeneficiaryName(body: BodyBeneficiaryName): Promise<object>;

    executeMoneyTransfer(body: BodyTransferMoneyInterface): Promise<object>;

    approveMoneyTransfer(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): Promise<object>;

    verifyWebhookSignature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;

    processOtherRequest(key: string): Promise<object>;

    createRevaOrder(
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
        qrType: string,
        endDate: string | null
    ): Promise<object>;

    createSevaOrder(
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
        qrType: string,
        endDate: string | null
    ): Promise<object>;

}

export default VifoServiceFactoryInterface;