import VifoCreateOrder from "../Modules/Services/VifoCreateOrder";
import HeaderInterface from "../Modules/Interfaces/HeaderInterface";
async function createOrderTest() {
    const createOder = new VifoCreateOrder;

    const headers: HeaderInterface = {
        Accept: '',
        'Content-Type': '',
        Authorization: '',
        'x-request-timestamp': '',
        'x-request-signature': '',
    };
    const rerult = await createOder.createOrder(headers, {
        fullname: '',
        benefiary_bank_code: '',
        'benefiary account no': '',
        product_code: '',
        distributor_order_number: '',
        phone: '',
        email: '',
        address: '',
        final_amount: 1,
        comment: '',
        bank_detail: false,
        qr_type: '',
        end_date: null,
    });
    console.log(rerult);

}

createOrderTest();