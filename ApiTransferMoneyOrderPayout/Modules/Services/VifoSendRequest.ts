import axios from 'axios';
import VifoSendRequestInterface from '../Interfaces/VifoSendRequestInterface';
import ResponseDataInterface from '../Interfaces/ResponseDataInterface';

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


    async sendRequest(method: string, endpoint: string, headers: object, body: object): Promise<ResponseDataInterface> {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await axios({
                method: method,
                url: url,
                headers: headers,
                data: body
            });
            return {
                errors: null,
                status_code: response.status,
                body: response.data
            };
        } catch (error: unknown) {
            let errorMessages: string[] = [];
            let statusCode = 500;
            let responseBody = null;

            if (axios.isAxiosError(error)) {
                errorMessages.push(`Request Exception: ${error.message}`);
                statusCode = error.response ? error.response.status : 500;
                responseBody = error.response ? error.response.data : null;
            }

            return {
                status_code: statusCode,
                body: responseBody,
                errors: errorMessages
            };
        }
    }

}
export default VifoSendRequest;