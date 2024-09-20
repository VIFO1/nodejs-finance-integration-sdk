# finance-integration-sdk
PHP SDK finance of VIFO
# PHP File Usage Guide
## Purpose

This Nodejs file uses services from `VifoServiceFactory` to perform banking, money transfer and other requests. The following guide provides detailed information on how to use and understand the functions of the code.

## Requirements
- **Node.js**: Version 14.x or higher.
- **npm**: Installed (comes with Node.js) for managing JavaScript packages.

## Code Structure
### 1. Import Classes and Requirements Automatically
```javascript
import VifoServiceFactory;

2.Login
const serviceFactory = new VifoServiceFactory('*');
const authenticateUser = await serviceFactory. performUserAuthentication(username: string, password: string): Promise<object>l

2.1 Methods for Token Setup
const accessTokenUser = service.setUserToken('your_user_token_here');
-This method is used to set the authentication token for user-based requests. 

const accessTokenAdmin = service.setAdminToken('your_user_token_here');
-This method is used to set the authentication token for admin-based requests.

Using Tokens in Requests
Once the tokens are set using the above methods, they will be automatically included in the headers for their respective requests.

3.Prepare data
3.1  Get List of available Banks:
const banks = await serviceFactory.fetchBankInformation(body: object): Promise<object>;

3.2 Get NAPAS Beneficiary Name:
const beneficiaryName = await serviceFactory.fetchBeneficiaryName(body: object): Promise<object>;

4.Create Transfer Money API:
const transferMoney = await serviceFactory.executeMoneyTransfer(body: object): Promise<object>;

5.Bulk Approve Transfer Money API
const approveMoneyTransfer = await serviceFactory.approveMoneyTransfer(secretKey: string, timestamp: string, body: object): Promise<object>;

6.Webhook to inform the result of transfer / pay out request
const webhook = await serviceFactory.verifyWebhookSignature(data: object, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;

7. Others request
const otherRequest = await serviceFactory.processOtherRequest(key: string): Promise<object>;

8.Create Reva Order
const createRevaOrder = await serviceFactory.createRevaOrder(
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        fullname: string,
        finalAmount: number,
        beneficiaryAccountNo: string,
        beneficiaryBankCode: string,
        comment: string,
        sourceAccountNo: string
 ): Promise<object>;
-Description: This method creates a new Reva order.

9.Create Seva Order
const createSevaOrder = await serviceFactory.createSevaOrder(
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        fullname: string,
        finalAmount: number,
        beneficiaryAccountNo: string,
        beneficiaryBankCode: string,
        comment: string,
        sourceAccountNo: string
): Promise<object>;
-Description: This method creates a new Seva order.

