interface VifoOtherRequestInterface {
    validateOrderKey(headers: object, key: string): string[];
    checkOrderStatus(headers: object, key: string): Promise<object>;
}
export default VifoOtherRequestInterface;