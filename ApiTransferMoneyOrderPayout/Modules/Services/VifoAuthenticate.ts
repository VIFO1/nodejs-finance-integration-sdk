import VifoSendRequest from './VifoSendRequest';
import VifoAutheticateInterface from '../Interfaces/VifoAutheticateInterface';
import BodyAutheticaterface from '../Interfaces/BodyAutheticaterface';
import HeaderLoginInterface from '../Interfaces/HeaderLoginInterface';
class VifoAutheticate implements VifoAutheticateInterface {
    private sendRequest: VifoSendRequest;
    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateLoginInput(headers: HeaderLoginInterface, body: BodyAutheticaterface): string[] {
        const errors = [];


        if (headers == null || typeof headers !== 'object' || Array.isArray(headers)) {
            errors.push('headers must be a non-empty object');
        }

        if (body == null || typeof body !== 'object' || Array.isArray(body)) {
            errors.push('headers must be a non-empty object');
        }
        return errors;
    }


    async authenticateUser(headers: HeaderLoginInterface, body: BodyAutheticaterface): Promise<object> {
        const errorsLoginInput = this.validateLoginInput(headers, body);

        if (errorsLoginInput.length > 0) {
            return { errorsLoginInput: errorsLoginInput };
        }

        const endpoint = '/v1/clients/web/admin/login';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }


}

export default VifoAutheticate;