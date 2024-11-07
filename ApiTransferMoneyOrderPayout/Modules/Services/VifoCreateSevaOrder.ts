import VifoSendRequest from "./VifoSendRequest";
import HeaderInterface from "../Interfaces/HeaderInterface";
import validateCreateOrder from "../CommonFunctions/validateCreateOrder";
import VifoCreateSevaOrderInterface from "../Interfaces/VifoCreateSevaOrderInterface";
import BodyCreateSevaOrderInterface from "../Interfaces/BodyCreateSevaOrderInterface";
class VifoCreateSevaOrder implements VifoCreateSevaOrderInterface {
    private sendRequest: VifoSendRequest;

    constructor() {
        this.sendRequest = new VifoSendRequest();
    }
    private validateSevaOrder(headers: HeaderInterface, body: object): string[] {
        const errors = [];
        if (typeof headers !== 'object') {
            errors.push('headers must be a non-empty object');
        }
        if (typeof body !== 'object') {
            errors.push('body must be a non-empty object');
        }
        const requiredFields = [
            'product_code',
            'phone',
            'fullname',
            'final_amount',
            'distributor_order_number',
            'benefiary_bank_code',
            'benefiary_account_no',
            'comment',
        ];

        requiredFields.forEach((field) => {
            if (!body[field as keyof typeof body]) {  
                errors.push(`${field} cannot be empty.`);
            }
        });
        return errors;
    }

    async createSevaOrder(headers: HeaderInterface, body: BodyCreateSevaOrderInterface): Promise<object> {
        const errors = this.validateSevaOrder(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = '/v2/finance';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }
}

export default VifoCreateSevaOrder;
