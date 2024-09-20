import ResponseDataInterface from '../Interfaces/ResponseDataInterface';

interface VifoSendRequestInterface {
    sendRequest(method: string, endpoint: string, headers: object, body: object): Promise<ResponseDataInterface>;
}
export default VifoSendRequestInterface;