import VifoApproveTransferMoney from "../Modules/Services/VifoApproveTransferMoney";


async function testApproveTransfer() {
    const approveTransferMoney = new VifoApproveTransferMoney();

    const secretKey = '';
    const timestamp = '2022-01-01T00:00:00Z';
    const body = {};
    const headers = {};

    const rerult = await approveTransferMoney.approveTransfers(secretKey, timestamp, headers, body);
    console.log(rerult);

}

testApproveTransfer();

