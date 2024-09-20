import BodyAutheticaterface from '../Interfaces/BodyAutheticaterface';
import HeaderLoginInterface from './HeaderLoginInterface';
interface VifoAutheticateInterface {
    validateLoginInput(headers: HeaderLoginInterface, body: BodyAutheticaterface): string[];
    authenticateUser(headers: HeaderLoginInterface, body: BodyAutheticaterface):Promise<object>;
}
export default VifoAutheticateInterface;