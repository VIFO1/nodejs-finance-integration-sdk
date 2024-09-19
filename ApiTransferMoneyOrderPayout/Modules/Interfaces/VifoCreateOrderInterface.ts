interface VifoCreateOrderInterface {
    validateRequestInput(headers: object, body: object): string[];
    createOrder(headers: object, body: object): Promise<object>;
}
export default VifoCreateOrderInterface;