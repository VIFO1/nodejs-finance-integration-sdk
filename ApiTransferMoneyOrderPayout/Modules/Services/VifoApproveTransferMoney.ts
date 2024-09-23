import VifoSendRequest from './VifoSendRequest';
import VifoApproveTransferMoneyInterface from '../Interfaces/VifoApproveTransferMoneyInterface';
import HeaderInterface from '../Interfaces/HeaderInterface';
import BodyApproveTransferMoney from '../Interfaces/BodyApproveTransferMoney';
import generateSignature from '../CommonFunctions/generateSignature';
import validateSignatureInputs from '../CommonFunctions/validateSignatureInputs';

class VifoApproveTransferMoney implements VifoApproveTransferMoneyInterface {
    private sendRequest: VifoSendRequest;
    constructor() {
        this.sendRequest = new VifoSendRequest();
    }

    createSignature(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): string | string[] {
        const errors = validateSignatureInputs(secretKey, timestamp, body);
        if (errors.length > 0) {
            return `Errors: ${errors}`;
        }

        return generateSignature(secretKey, timestamp, body);
    }


    async approveTransfers(secretKey: string, timestamp: string, headers: HeaderInterface, body: BodyApproveTransferMoney): Promise<object> {
        const errors = validateSignatureInputs(secretKey, timestamp, body);
        if (errors.length > 0) {
            return { errors: errors };
        }

        const endpoint = '/v2/finance/confirm';

        return await this.sendRequest.sendRequest('POST', endpoint, headers, body);
    }
}

export default VifoApproveTransferMoney;