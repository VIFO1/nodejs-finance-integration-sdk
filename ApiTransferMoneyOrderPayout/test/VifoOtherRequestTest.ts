import VifoOtherRequest from "../Modules/Services/VifoOtherRequest";
let otherRequest = new VifoOtherRequest();

async function testOtherRequest() {
    const result = await otherRequest.validateOrderKey({}, 'test123');
    console.log(result);

}
testOtherRequest();