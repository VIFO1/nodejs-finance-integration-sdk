import HeaderInterface from "./HeaderInterface";
import BodyTransferMoneyInterface from "./BodyTransferMoneyInterface";
interface VifoTransferMoneyInterface {
    validateRequestInput(headers: HeaderInterface, body: BodyTransferMoneyInterface): string[];
    createTransferMoney(headers: HeaderInterface, body: BodyTransferMoneyInterface): Promise<object>;
}
export default VifoTransferMoneyInterface;