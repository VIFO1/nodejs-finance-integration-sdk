import VifoServiceFactory from "../Modules/Services/VifoServiceFactory";
import BodyBeneficiaryName from "../Modules/Interfaces/BodyBeneficiaryName";
async function testServiceFactory() {
    const serviceFactory = new VifoServiceFactory('dev');

    const body : BodyBeneficiaryName = {
        bank_code:'string',
        account_number:'string'
    }
    const bank = await serviceFactory.fetchBankInformation({});

    const getBankName = await serviceFactory.fetchBeneficiaryName(body);

    console.log(bank);
    console.log(getBankName);
}

testServiceFactory();