export enum QRTypeSeva {
    RAW = "RAW", 
    QR_RAW = "QR_RAW"
}

interface BodyCreateSevaOrderInterface
{
    product_code:string | null,
    phone: string,
    fullname: string ,
    final_amount: number,
    distributor_order_number:string ,
    benefiary_bank_code: string,
    benefiary_account_no: string,
    comment: string,
    "source account no": string
}

export default BodyCreateSevaOrderInterface;