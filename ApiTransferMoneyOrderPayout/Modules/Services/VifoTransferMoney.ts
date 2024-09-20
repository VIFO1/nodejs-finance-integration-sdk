import VifoSendRequest from './VifoSendRequest';
import VifoTransferMoneyInterface from '../Interfaces/VifoTransferMoneyInterface';

class VifoTransferMoney implements VifoTransferMoneyInterface {
    private sendRequest: VifoSendRequest;
    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateRequestInput(headers: object, body: object): string[] {
        const errors = [];

        if (headers == null || typeof headers !== 'object' || Array.isArray(headers)) {
            errors.push('headers must be a non-empty object');
        }
        if (body == null || typeof body !== 'object' || Array.isArray(body)) {
            errors.push('body must be a non-empty object');
        }

        return errors;
    }

    async createTransferMoney(headers: object, body: object): Promise<object> {
        const endpoint = '/v2/finance';
        const errors = this.validateRequestInput(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }

        return await this.sendRequest.sendRequest("POST", endpoint, headers, body);
    }
}

export default VifoTransferMoney;