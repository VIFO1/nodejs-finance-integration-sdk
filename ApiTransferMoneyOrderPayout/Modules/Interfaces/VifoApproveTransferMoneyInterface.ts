interface VifoApproveTransferMoneyInterface {
    validateApproveTransfersInput(secretKey: string, timestamp: string, body: object): string[];
    createSignature(secretKey: string, timestamp: string, body: object): string
    approveTransfers(secretKey: string, timestamp: string, headers: object, body: object): Promise<object>;
}
export default VifoApproveTransferMoneyInterface;