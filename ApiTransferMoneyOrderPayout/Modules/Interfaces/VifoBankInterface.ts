interface VifoBankInterface {
    validateBody(headers: object, body: object): string[];
    getBank(headers: object, body: object): object;
    getBeneficiaryName(headers: object, body: object): object;

}

export default VifoBankInterface;