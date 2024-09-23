import VifoApproveTransferMoney from "../Modules/Services/VifoApproveTransferMoney";
import HeaderInterface from "../Modules/Interfaces/HeaderInterface";
async function testApproveMoneyTransfer() {
const approveMoneyTransfer = new VifoApproveTransferMoney;

    const headers: HeaderInterface = {
        Accept: '',
        'Content-Type': '',
        Authorization: '',
        'x-request-timestamp': '',
        'x-request-signature': '',
    };
    const result = await approveMoneyTransfer.approveTransfers("VIFO123", '2022-11-11', headers, {status: 1, ids : ['asd']});
    console.log(result);

}
testApproveMoneyTransfer();