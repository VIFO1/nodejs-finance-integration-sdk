import HeaderInterface from "../Interfaces/HeaderInterface";
import BodyBeneficiaryName from "./BodyBeneficiaryName";
interface VifoBankInterface {
    validateBody(headers: HeaderInterface, body:object): string[];
    getBank(headers: HeaderInterface, body: BodyBeneficiaryName): Promise<object>;
    getBeneficiaryName(headers: HeaderInterface, body: BodyBeneficiaryName): Promise<object>;

}
export default VifoBankInterface;