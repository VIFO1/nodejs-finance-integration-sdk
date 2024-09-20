interface BodyCreateOrderInterface {
    'fullname': string ,
    'benefiary_bank_code': string,
    'benefiary account no': string,
    'product_code':string,
    'distributor_order_number':string ,
    'phone': string,
    'email': string | null,
    'address': string | null,
    'final_amount': number,
    'comment': string,
    'bank_detail': boolean | null,
    'qr_type ': string | null ,
    'end_date ': string | null,
}
export default BodyCreateOrderInterface;