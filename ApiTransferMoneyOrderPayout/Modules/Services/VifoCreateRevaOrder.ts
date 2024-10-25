import VifoSendRequest from "./VifoSendRequest";
import HeaderInterface from "../Interfaces/HeaderInterface";
import validateCreateOrder from "../CommonFunctions/validateCreateOrder";
import VifoCreateRevaOrderInterface from "../Interfaces/VifoCreateRevaOrderInterface";
import BodyCreateRevaOrderInterface from "../Interfaces/BodyCreateRevaOrderInterface";
class VifoCreateRevaOrder implements VifoCreateRevaOrderInterface {
    private sendRequest: VifoSendRequest;

    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateRevaOrder(headers: HeaderInterface, body: object): string[] {
        const errors = [];
        if (typeof headers !== 'object') {
            errors.push('headers must be a non-empty object');
        }
        if (typeof body !== 'object') {
            errors.push('body must be a non-empty object');
        }
        const requiredFields = [
            'product_code',
            'distributor_order_number',
            'phone',
            'fullname',
            'final_amount',
            'benefiary_account_name',
            'comment',
        ];

        requiredFields.forEach((field) => {
            if (!body[field as keyof typeof body]) {  
                errors.push(`${field} cannot be empty.`);
            }
        });

        return errors;
    }
    async createRevaOrder(headers: HeaderInterface, body: BodyCreateRevaOrderInterface): Promise<object> {
        const errors = this.validateRevaOrder(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = '/v2/finance';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }
}

export default VifoCreateRevaOrder;