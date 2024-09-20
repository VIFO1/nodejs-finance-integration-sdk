import HeaderInterface from "../Interfaces/HeaderInterface";
import BodyBankInfoInterface from "./BodyBankInfoInterface";
import BodyBeneficiaryName from "./BodyBeneficiaryName";
interface VifoBankInterface {
    validateBody(headers: HeaderInterface, body: BodyBankInfoInterface | BodyBeneficiaryName): string[];
    getBank(headers: HeaderInterface, body: BodyBankInfoInterface): Promise<object>;
    getBeneficiaryName(headers: HeaderInterface, body: BodyBeneficiaryName): Promise<object>;

}
export default VifoBankInterface;