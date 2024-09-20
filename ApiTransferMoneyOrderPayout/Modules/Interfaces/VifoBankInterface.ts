interface VifoBankInterface {
    validateBody(headers: object, body: object): string[];
    getBank(headers: object, body: object): Promise<object>;
    getBeneficiaryName(headers: object, body: object): Promise<object>;

}
export default VifoBankInterface;