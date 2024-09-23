import VifoSendRequest from "./VifoSendRequest";
import HeaderInterface from "../Interfaces/HeaderInterface";
import validateCreateOrder from "../CommonFunctions/validateCreateOrder";
import VifoCreateRevaOrderInterface from "../Interfaces/VifoCreateRevaOrderInterface";
import BodyCreateRevaOrderInterface from "../Interfaces/BodyCreateRevaOrderInterface";
class VifoCreateRevaOrder  implements VifoCreateRevaOrderInterface {
    private sendRequest: VifoSendRequest;

    constructor() {
        this.sendRequest = new VifoSendRequest();
    }
    
    async createRevaOrder(headers: HeaderInterface, body: BodyCreateRevaOrderInterface): Promise<object> {
        const errors = validateCreateOrder(headers, body);
        if (errors.length > 0) {
            return { errors: errors };
        }
        const endpoint = '/v2/finance';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }
}

export default VifoCreateRevaOrder;