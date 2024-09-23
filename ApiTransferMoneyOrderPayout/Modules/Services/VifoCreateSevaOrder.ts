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


    async createSevaOrder(headers: HeaderInterface, body: BodyCreateSevaOrderInterface): Promise<object> {
        const errors = validateCreateOrder(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = '/v2/finance';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }
}

export default VifoCreateSevaOrder;
