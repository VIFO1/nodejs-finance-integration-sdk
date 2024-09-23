export enum QRTypeSeva {
    RAW = "RAW", 
    QR_RAW = "QR_RAW"
}

interface BodyCreateSevaOrderInterface
{
    fullname: string ,
    benefiary_bank_code: string,
    benefiary_account_no: string,
    product_code:string,
    distributor_order_number:string ,
    phone: string,
    email: string | null,
    address: string | null,
    final_amount: number,
    comment: string,
    bank_detail: boolean | null,
    qr_type : QRTypeSeva | null ,
    end_date : string | null,
}

export default BodyCreateSevaOrderInterface;