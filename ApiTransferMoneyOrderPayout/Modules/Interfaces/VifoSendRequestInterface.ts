interface VifoSendRequestInterface{
    sendRequest(method: string, endpoint: string, headers: object, body: object): Promise<object>
}
export default VifoSendRequestInterface;