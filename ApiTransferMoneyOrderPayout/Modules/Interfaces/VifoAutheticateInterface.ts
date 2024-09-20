interface VifoAutheticateInterface {
    validateLoginInput(headers: object, username: string, password: string): string[];
    authenticateUser(headers: object, username: string, password: string): Promise<object>;
}
export default VifoAutheticateInterface;