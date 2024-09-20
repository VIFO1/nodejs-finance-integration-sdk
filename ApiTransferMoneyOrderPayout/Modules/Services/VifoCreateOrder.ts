import VifoSendRequest from "./VifoSendRequest";
import VifoCreateOrderInterface from "../Interfaces/VifoCreateOrderInterface";
import HeaderInterface from "../Interfaces/HeaderInterface";
import BodyCreateOrderInterface from "../Interfaces/BodyCreateOrderInterface";
class VifoCreateOrder implements VifoCreateOrderInterface {
    private sendRequest: VifoSendRequest;

    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateRequestInput(headers: HeaderInterface, body: object): string[] {
        const errors = [];

        if (typeof headers !== 'object') {
            errors.push('headers must be a non-empty object');
        }
        if (typeof body !== 'object') {
            errors.push('headers must be a non-empty object');
        }

        const requiredFields = [
            'product_code',
            'phone',
            'fullname',
            'final_amount',
            'distributor_order_number',
            'benefiary account no',
            'benefiary_bank_code',
            'comment',
        ];

        requiredFields.forEach((field) => {
            if (!(field in body)) {
                errors.push(`${field} is required.`);
            }
        });

        return errors;
    }

    async createOrder(headers: HeaderInterface, body: BodyCreateOrderInterface): Promise<object> {
        const errors = this.validateRequestInput(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = '/v2/finance';

        return await this.sendRequest.sendRequest("POST", endpoint, headers, body);
    }
}

export default VifoCreateOrder;