import BodyWebhookInterface from "./BodyWebhookInterface";
interface WebhookInterface {
    createSignature(secretKey: string, timestamp: string, body: BodyWebhookInterface): string | string[]
    handleSignnature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;
}
export default WebhookInterface;