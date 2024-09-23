import crypto from 'crypto';
import WebhookInterface from '../Interfaces/WebhookInterface';
import BodyWebhookInterface from '../Interfaces/BodyWebhookInterface';
import generateSignature from '../CommonFunctions/generateSignature';
import validateSignatureInputs from '../CommonFunctions/validateSignatureInputs';

class Webhook implements WebhookInterface {

    createSignature(secretKey: string, timestamp: string, body: BodyWebhookInterface): string | string[] {
        const errors = validateSignatureInputs(secretKey, timestamp, body);
        if (errors.length > 0) {
            return `Errors: ${errors}`;
        }

        return generateSignature(secretKey, timestamp, body);
    }


    async handleSignnature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean> {
        const errors = validateSignatureInputs(secretKey, timestamp, data);

        if (errors.length > 0) {
            throw new Error('Validation errors: ' + errors);
        }

        const generatedSignature = await this.createSignature(secretKey, timestamp, data);

        if (requestSignature == generatedSignature) {
            return true
        } else {
            return false;
        }
    }
}

export default Webhook;