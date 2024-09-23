import HeaderInterface from "./HeaderInterface";
interface VifoOtherRequestInterface {
    validateOrderKey(headers: HeaderInterface, key:string): string[];
    checkOrderStatus(headers: HeaderInterface, key:string): Promise<object>;
}
export default VifoOtherRequestInterface;