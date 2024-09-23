import HeaderInterface from "./HeaderInterface";
import BodyCreateSevaOrderInterface from "./BodyCreateSevaOrderInterface";
interface VifoCreateSevaOrderInterface {
    createSevaOrder(headers: HeaderInterface, body: BodyCreateSevaOrderInterface): Promise<object>;
}
export default VifoCreateSevaOrderInterface;