interface BodyTransferMoneyInterface {
    product_code: string,
    phone: string,
    fullname: string,
    final_amount: number
    distributor_order_number: string,
    benefiary_bank_code:string
    benefiary_account_no:string ,
    comment: string,
    "source account no":string 
}

export default BodyTransferMoneyInterface;