import VifoApproveTransferMoney from "../Modules/Services/VifoApproveTransferMoney";
import HeaderInterface from "../Modules/Interfaces/HeaderInterface";
import BodyApproveTransferMoney from "../Modules/Interfaces/BodyApproveTransferMoney";
async function testApproveTransfer() {
    const approveTransferMoney = new VifoApproveTransferMoney();

    const secretKey = '';
    const timestamp = '2022-01-01T00:00:00Z';
    const body:BodyApproveTransferMoney = {
        status: 1,
        ids: []
    };
    const headers: HeaderInterface= {
        Accept: '',
        'Content-Type': '',
        Authorization: '' ,
        'x-request-timestamp': '' ,
        'x-request-signature': '' ,
    };

    const rerult = await approveTransferMoney.approveTransfers(secretKey, timestamp, headers, body);
    console.log(rerult);

}

testApproveTransfer();

