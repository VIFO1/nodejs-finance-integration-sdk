import HeaderInterface from "./HeaderInterface";
import BodyCreateRevaOrderInterface from "./BodyCreateRevaOrderInterface";
interface VifoCreateRevaOrderInterface {
    createRevaOrder(headers: HeaderInterface, body: BodyCreateRevaOrderInterface): Promise<object>;
}
export default VifoCreateRevaOrderInterface;