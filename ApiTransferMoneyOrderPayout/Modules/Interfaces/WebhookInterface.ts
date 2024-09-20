interface WebhookInterface {
    validate(secretKey: string, timestamp: string, body: object): string[];
    createSignature(secretKey: string, timestamp: string, body: object): string;
    handleSignnature(data: object, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;
}
export default WebhookInterface;