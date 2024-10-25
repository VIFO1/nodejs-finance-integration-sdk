import BodyAutheticaterface from "./BodyAutheticaterface";
import HeaderInterface from "./HeaderInterface";
import BodyBeneficiaryName from "./BodyBeneficiaryName";
import BodyApproveTransferMoney from "./BodyApproveTransferMoney";
import BodyTransferMoneyInterface from "./BodyTransferMoneyInterface";
import BodyWebhookInterface from "./BodyWebhookInterface";
import { QRTypeReva } from '../Interfaces/BodyCreateRevaOrderInterface';
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
        benefiaryAccountName:string,
        productCode: string | null,
        distributorOrderNumber: string,
        phone: string,
        email: string,
        address: string,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: QRTypeReva | null,
        endDate: string | null
    ): Promise<object>;

    createSevaOrder(
        productCode: string | null,
        phone: string,
        fullname: string,
        finalAmount: number,
        distributorOrderNumber: string,
        benefiaryBankCode: string,
        benefiaryAccountNo: string,
        comment: string,
        sourceAccountNo:string
    ): Promise<object>;

}

export default VifoServiceFactoryInterface;