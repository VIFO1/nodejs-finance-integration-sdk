import VifoBank from "../Modules/Services/VifoBank";
let bank = new VifoBank();
async function testBank() {
    const result = await bank.getBank({}, []);
    console.log(result);

}

async function testBeneficiaryName() {
    const resultBeneficiaryName = await bank.getBeneficiaryName({}, []);
    console.log(resultBeneficiaryName);
}

testBank();
testBeneficiaryName();