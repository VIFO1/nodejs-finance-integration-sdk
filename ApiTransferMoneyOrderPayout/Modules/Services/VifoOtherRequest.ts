import VifoSendRequest from "./VifoSendRequest";
import VifoOtherRequestInterface from "../Interfaces/VifoOtherRequestInterface";

class VifoOtherRequest implements VifoOtherRequestInterface {
    private sendRequest: VifoSendRequest;

    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateOrderKey(headers: object, key: string): string[] {
        const errors = [];

        if (typeof headers !== 'object') {
            errors.push('headers must be a non-empty object');
        }

        if (key == '' || typeof key !== 'string') {
            errors.push('Order key must be a string');
        }

        return errors;
    }

    async checkOrderStatus(headers: object, key: string): Promise<object> {
        const errors = this.validateOrderKey(headers, key);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = `/v2/finance/${key}/status`;
        return await this.sendRequest.sendRequest("GET", endpoint, headers, {});
    }
}

export default VifoOtherRequest;