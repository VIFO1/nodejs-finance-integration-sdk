import VifoSendRequest from "../Modules/Services/VifoSendRequest";
let sendRequest = new VifoSendRequest;

async function testSendRequest() {
    const result = await sendRequest.sendRequest('POST','youtube.com',{},{});
    console.log(result);
    
}
testSendRequest();