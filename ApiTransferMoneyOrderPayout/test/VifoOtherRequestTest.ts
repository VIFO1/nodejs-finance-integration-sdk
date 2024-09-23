import VifoOtherRequest from "../Modules/Services/VifoOtherRequest";
import HeaderInterface from "../Modules/Interfaces/HeaderInterface";
async function testOtherRequest() {
    const otherRequest = new VifoOtherRequest();
    const headers: HeaderInterface = {
        Accept: '',
        'Content-Type': '',
        Authorization: '',
        'x-request-timestamp': '',
        'x-request-signature': '',
    };
    const result = await otherRequest.validateOrderKey(headers, 'test123');
    console.log(result);

}
testOtherRequest();