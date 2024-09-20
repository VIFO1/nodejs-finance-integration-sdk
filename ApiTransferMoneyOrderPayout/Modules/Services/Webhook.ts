import crypto from 'crypto';
import WebhookInterface from '../Interfaces/WebhookInterface';
import BodyWebhookInterface from '../Interfaces/BodyWebhookInterface';
class Webhook implements WebhookInterface{
    validate(secretKey: string, timestamp: string, body: BodyWebhookInterface): string[] {
        const errors = [];

        if (secretKey == '' || typeof secretKey !== 'string') {
            errors.push('Invalid secret key');
        }

        if (timestamp == '') {
            errors.push('Invalid timestamp');
        }

        if (typeof body !== 'object') {
            errors.push('The body must be a non-empty object');
        }

        return errors;
    }
    createSignature(secretKey: string, timestamp: string, body: BodyWebhookInterface): string {

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

    async handleSignnature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean> {
        const errors = this.validate(secretKey, timestamp, data);

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