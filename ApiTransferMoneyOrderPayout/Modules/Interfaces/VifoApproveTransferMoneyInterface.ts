import HeaderInterface from "./HeaderInterface";
import BodyApproveTransferMoney from "./BodyApproveTransferMoney";
interface VifoApproveTransferMoneyInterface {
    createSignature(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): string | string[];
    approveTransfers(secretKey: string, timestamp: string, headers: HeaderInterface, body: BodyApproveTransferMoney): Promise<object>;
}
export default VifoApproveTransferMoneyInterface;