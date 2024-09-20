import Webhook from "../Modules/Services/Webhook";
let webhook  = new Webhook;

async function testWebhook() {
    const result = await webhook.handleSignnature({},"VIFO123","pass123","2022-11-11");
    console.log(result);
    
}

testWebhook();