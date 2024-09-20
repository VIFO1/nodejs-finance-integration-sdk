import VifoSendRequest from './VifoSendRequest';
import crypto from 'crypto';
import VifoApproveTransferMoneyInterface from '../Interfaces/VifoApproveTransferMoneyInterface';
import HeaderInterface from '../Interfaces/HeaderInterface';
import BodyApproveTransferMoney from '../Interfaces/BodyApproveTransferMoney';
class VifoApproveTransferMoney implements VifoApproveTransferMoneyInterface {
    private sendRequest: VifoSendRequest;
    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    validateApproveTransfersInput(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): string[] {
        const errors = [];

        if (secretKey == '' || typeof secretKey !== 'string') {
            errors.push('Invalid secret key');
        }

        if (timestamp == '') {
            errors.push('Invalid timestamp');
        }

        if (typeof body !== 'object' || Object.keys(body).length == 0) {
            errors.push('The body must be a non-empty object');
        }

        return errors;
    }

    createSignature(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): string {
        const errors = this.validateApproveTransfersInput(secretKey, timestamp, body);

        if (errors.length > 0) {
            return `Errors: ${errors}`;
        }
        const bodyArray = Object.entries(body);

        const sortBodyAlphabet = bodyArray.sort(([a], [b]) => a.localeCompare(b));

        const bodyObject = Object.fromEntries(sortBodyAlphabet);

        const payload = JSON.stringify(bodyObject);

        const signatureString = timestamp + payload;

        const hmac = crypto.createHmac('sha256', secretKey);

        hmac.update(signatureString);

        const gen_hmac = hmac.digest('hex');


        return gen_hmac;
    }

    async approveTransfers(secretKey: string, timestamp: string, headers: HeaderInterface, body: BodyApproveTransferMoney): Promise<object> {
        const errors = this.validateApproveTransfersInput(secretKey, timestamp, body);
        if (errors.length > 0) {
            return { errors: errors };
        }

        const endpoint = '/v2/finance/confirm';

        return await this.sendRequest.sendRequest("POST", endpoint, headers, body);
    }
}

export default VifoApproveTransferMoney;