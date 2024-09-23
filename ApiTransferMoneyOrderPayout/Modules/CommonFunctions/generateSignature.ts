import crypto from 'crypto';

 function generateSignature(secretKey: string, timestamp: string, body: object): string | string[] {
    const errors = [];

    if (secretKey === '' || typeof secretKey !== 'string') {
        errors.push('Invalid secret key');
    }

    if (timestamp === '') {
        errors.push('Invalid timestamp');
    }

    if (typeof body !== 'object' || Object.keys(body).length === 0) {
        errors.push('The body must be a non-empty object');
    }

    if (errors.length > 0) {
        return `Errors: ${errors}`;
    }

    const bodyArray = Object.entries(body);
    const sortedBodyArray = bodyArray.sort(([a], [b]) => a.localeCompare(b));
    const sortedBodyObject = Object.fromEntries(sortedBodyArray);
    const payload = JSON.stringify(sortedBodyObject);
    const signatureString = timestamp + payload;
    
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(signatureString);
    
    return hmac.digest('hex');
}
export default generateSignature;