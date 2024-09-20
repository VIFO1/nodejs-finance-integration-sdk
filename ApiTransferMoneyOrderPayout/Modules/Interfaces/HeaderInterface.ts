interface HeaderInterface {
    Accept: string;
    'Content-Type': string;
    'Authorization': string | null;
    'x-request-timestamp': string | null;
    'x-request-signature': string | null;
}

export default HeaderInterface;
