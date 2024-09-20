import HeaderInterface from "./HeaderInterface";
import BodyCreateOrderInterface from "./BodyCreateOrderInterface";
interface VifoCreateOrderInterface {
    validateRequestInput(headers: HeaderInterface, body: BodyCreateOrderInterface): string[];
    createOrder(headers: HeaderInterface, body: BodyCreateOrderInterface): Promise<object>;
}
export default VifoCreateOrderInterface;