interface VifoTransferMoneyInterface {
    validateRequestInput(headers: object, body: object): string[];
    createTransferMoney(headers: object, body: object): Promise<object>;
}
export default VifoTransferMoneyInterface;