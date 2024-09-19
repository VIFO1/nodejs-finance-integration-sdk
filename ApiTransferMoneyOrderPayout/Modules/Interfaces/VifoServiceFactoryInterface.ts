interface VifoServiceFactoryInterface {
    setTokenUser(token: string): void;

    setTokenAdmin(token: string): void;

    getAuthorizationHeaders(type: string): { [key: string]: string };

    performUserAuthentication(username: string, password: string): Promise<object>;

    fetchBankInformation(body: object): Promise<string>;

    fetchBeneficiaryName(body: object): Promise<object>;

    executeMoneyTransfer(body: object): Promise<object>;

    approveMoneyTransfer(secretKey: string, timestamp: string, body: object): Promise<object>;

    verifyWebhookSignature(data: object, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;

    processOtherRequest(key: string): Promise<object>;

    createRevaOrder(
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        fullname: string,
        finalAmount: number,
        beneficiaryAccountNo: string,
        beneficiaryBankCode: string,
        comment: string,
        sourceAccountNo: string
    ): Promise<object>;

    createNevaOrder(
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        fullname: string,
        finalAmount: number,
        beneficiaryAccountNo: string,
        beneficiaryBankCode: string,
        comment: string,
        sourceAccountNo: string
    ): Promise<object>

}

export default VifoServiceFactoryInterface;