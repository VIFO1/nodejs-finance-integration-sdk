import Webhook from "../Modules/Services/Webhook";

async function testWebhook() {
    const webhook = new Webhook;
 
    const result = await webhook.handleSignnature({status: 1, ids: ['123']}, "VIFO123", "pass123", "2022-11-11");
    console.log(result);

}

testWebhook();