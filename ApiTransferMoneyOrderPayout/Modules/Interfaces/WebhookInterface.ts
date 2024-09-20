import BodyWebhookInterface from "./BodyWebhookInterface";
interface WebhookInterface {
    validate(secretKey: string, timestamp: string, body: BodyWebhookInterface): string[];
    createSignature(secretKey: string, timestamp: string, body: BodyWebhookInterface): string;
    handleSignnature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;
}
export default WebhookInterface;