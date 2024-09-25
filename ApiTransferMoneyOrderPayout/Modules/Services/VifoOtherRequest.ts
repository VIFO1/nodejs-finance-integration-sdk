import VifoSendRequest from "./VifoSendRequest";
import VifoOtherRequestInterface from "../Interfaces/VifoOtherRequestInterface";
import HeaderInterface from "../Interfaces/HeaderInterface";

class VifoOtherRequest implements VifoOtherRequestInterface {
    private sendRequest: VifoSendRequest;

    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateOrderKey(headers: HeaderInterface, key:string): string[] {
        const errors = [];

        if (typeof headers !== 'object') {
            errors.push('headers must be a non-empty object');
        }

        if (typeof key !== 'string' || key == '') {
            errors.push('Order key must be a string and cannot be empty');
        }

        return errors;
    }

    async checkOrderStatus(headers: HeaderInterface, key:string): Promise<object> {
        const errors = this.validateOrderKey(headers, key);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = `/v2/finance/${key}/status`;
        return await this.sendRequest.sendRequest('GET', endpoint, headers, {});
    }
}

export default VifoOtherRequest;