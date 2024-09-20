import VifoServiceFactory from "../Modules/Services/VifoServiceFactory";
let serviceFactory = new VifoServiceFactory('dev');

async function testServiceFactory() {
    const bank = await serviceFactory.fetchBankInformation({});

    const getBankName = await serviceFactory.fetchBeneficiaryName({});

    console.log(bank);
    console.log(getBankName);
}

testServiceFactory();