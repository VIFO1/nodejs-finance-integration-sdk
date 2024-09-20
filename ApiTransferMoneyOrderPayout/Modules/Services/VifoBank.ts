import VifoSendRequest from "./VifoSendRequest";
import VifoBankInterface from "../Interfaces/VifoBankInterface";

class VifoBank implements VifoBankInterface {
    private sendRequest: VifoSendRequest;
    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateBody(headers: object, body: object): string[] {
        const errors = [];

        if (headers == null || typeof headers !== 'object' || Array.isArray(headers)) {
            errors.push('headers must be a non-empty object');
        }
        if (body == null || typeof body !== 'object' || Array.isArray(body)) {
            errors.push('body must be a non-empty object');
        }

        return errors;
    }

    async getBank(headers: object, body: object): Promise<object> {
        const endpoint = '/v2/data/banks/napas';
        const errors = this.validateBody(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }

        return await this.sendRequest.sendRequest("GET", endpoint, headers, body);
    }


    async getBeneficiaryName(headers: object, body: object): Promise<object> {
        const endpoint = '/v2/finance/napas/receiver';
        const errors = this.validateBody(headers, body);

        if (errors.length > 0) {
            return { errors: errors };
        }
        return await this.sendRequest.sendRequest("POST", endpoint, headers, body);

    }
}

export default VifoBank;