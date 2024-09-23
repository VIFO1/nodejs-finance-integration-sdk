function validateSignatureInputs(secretKey: string, timestamp: string, body: object): string[] {
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

    return errors;
}
export default validateSignatureInputs;