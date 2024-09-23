import VifoBank from "../Modules/Services/VifoBank";
import HeaderInterface from "../Modules/Interfaces/HeaderInterface";
let bank = new VifoBank();
let headers: HeaderInterface= {
    Accept: '',
    'Content-Type': '',
    Authorization: '' ,
    'x-request-timestamp': '' ,
    'x-request-signature': '' ,
};
async function testBank() {
    const result = await bank.getBank(headers, {});
    console.log(result);

}

async function testBeneficiaryName() {
    const resultBeneficiaryName = await bank.getBeneficiaryName(headers, {bank_code: '',account_number: ''});
    console.log(resultBeneficiaryName);
}

testBank();
testBeneficiaryName();