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
const authenticateUser = await serviceFactory. performUserAuthentication(body: BodyAutheticaterface): Promise<object>l

2.1 Methods for Token Setup
const accessTokenUser = service.setUserToken('your_user_token_here');
-This method is used to set the authentication token for user-based requests. 

const accessTokenAdmin = service.setAdminToken('your_user_token_here');
-This method is used to set the authentication token for admin-based requests.

Using Tokens in Requests
Once the tokens are set using the above methods, they will be automatically included in the headers for their respective requests.

3.Prepare data
3.1  Get List of available Banks:
const banks = await serviceFactory.fetchBankInformation(body:object): Promise<object>;

3.2 Get NAPAS Beneficiary Name:
const beneficiaryName = await serviceFactory.fetchBeneficiaryName(body: BodyBeneficiaryName): Promise<object>;

4.Create Transfer Money API:
const transferMoney = await serviceFactory.executeMoneyTransfer(body: BodyTransferMoneyInterface): Promise<object>;

5.Bulk Approve Transfer Money API
const approveMoneyTransfer = await serviceFactory.approveMoneyTransfer(secretKey: string, timestamp: string, body: BodyApproveTransferMoney): Promise<object>;

6.Webhook to inform the result of transfer / pay out request
const webhook = await serviceFactory.verifyWebhookSignature(data: BodyWebhookInterface, requestSignature: string, secretKey: string, timestamp: string): Promise<boolean>;

7. Others request
const otherRequest = await serviceFactory.processOtherRequest(key: string): Promise<object>;

8.Create Reva Order
const createRevaOrder = await serviceFactory.createRevaOrder(
        fullname: string,
        benefiary_bank_code: string,
        benefiary_account_no: string,
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        email: string | null,
        address: string | null,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: string,
        endDate: string | null
 ): Promise<object>;
-Description: This method creates a new Reva order.

9.Create Seva Order
const createSevaOrder = await serviceFactory.createSevaOrder(
        fullname: string,
        benefiary_bank_code: string,
        benefiary_account_no: string,
        productCode: string,
        distributorOrderNumber: string,
        phone: string,
        email: string | null,
        address: string | null,
        finalAmount: number,
        comment: string,
        bankDetail: boolean,
        qrType: string,
        endDate: string | null
): Promise<object>;
-Description: This method creates a new Seva order.

