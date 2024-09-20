import VifoCreateOrder from "../Modules/Services/VifoCreateOrder";
let createOder = new VifoCreateOrder;

async function createOrderTest()
{
    const rerult = await createOder.createOrder({},{});
    console.log(rerult);
    
}

createOrderTest();