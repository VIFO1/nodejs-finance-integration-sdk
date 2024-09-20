import HeaderInterface from "./HeaderInterface";
import BodyApproveTransferMoney from "./BodyApproveTransferMoney";
interface VifoApproveTransferMoneyInterface {
    validateApproveTransfersInput(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): string[];
    createSignature(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): string
    approveTransfers(secretKey: string, timestamp: string, headers: HeaderInterface, body: BodyApproveTransferMoney): Promise<object>;
}
export default VifoApproveTransferMoneyInterface;