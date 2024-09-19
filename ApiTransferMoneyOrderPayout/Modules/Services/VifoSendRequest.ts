import axios from 'axios';
import VifoSendRequestInterface from '../Interfaces/VifoSendRequestInterface';
class VifoSendRequest implements VifoSendRequestInterface {
    private baseUrl: string;

    constructor(env = 'dev') {
        if (env == 'dev') {
            this.baseUrl = 'https://sapi.vifo.vn';
        } else if (env == 'tsg') {
            this.baseUrl = 'https://sapi.vifo.vn';
        } else if (env == 'production') {
            this.baseUrl = 'https://api.vifo.vn';
        } else {
            throw new Error(`Invalid environment: ${env}`);
        }
    }
    async sendRequest(method: string, endpoint: string, headers: object, body: object): Promise<object> {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await axios({
                method: method,
                url: url,
                headers: headers,
                data: body
            });
            return {
                status_code: response.status,
                body: response.data,
            };
        } catch (error: unknown) {
            let errorMessage = 'An unknown error occurred';
            let statusCode = 500;
            let responseBody = null;
            if (axios.isAxiosError(error)) {
                errorMessage = `Request Exception: ${error.message}`;
                statusCode = error.response ? error.response.status : 500;
                responseBody = error.response ? error.response.data : null;
            }
            return {
                errors: errorMessage,
                status_code: statusCode,
                body: responseBody
            };

        }
    }
}
export default VifoSendRequest;