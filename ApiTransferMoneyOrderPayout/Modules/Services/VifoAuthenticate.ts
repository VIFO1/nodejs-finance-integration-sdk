import VifoSendRequest from './VifoSendRequest';
import VifoAutheticateInterface from '../Interfaces/VifoAutheticateInterface';

class VifoAutheticate implements VifoAutheticateInterface {
    private sendRequest: VifoSendRequest;
    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateLoginInput(headers: object, username: string, password: string): string[] {
        const errors = [];

        if (typeof username !== 'string' || username == '') {
            errors.push('Invalid username');
        }

        if (typeof password !== 'string' || password == '') {
            errors.push('Invalid password');
        }

        if (headers == null || typeof headers !== 'object' || Array.isArray(headers)) {
            errors.push('headers must be a non-empty object');
        }

        return errors;
    }


    async authenticateUser(headers: object, username: string, password: string): Promise<object> {
        const errorsLoginInput = this.validateLoginInput(headers, username, password);

        if (errorsLoginInput.length > 0) {
            return { errorsLoginInput: errorsLoginInput };
        }

        const body = {
            username: username,
            password: password
        };

        const endpoint = '/v1/clients/web/admin/login';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }


}

export default VifoAutheticate;