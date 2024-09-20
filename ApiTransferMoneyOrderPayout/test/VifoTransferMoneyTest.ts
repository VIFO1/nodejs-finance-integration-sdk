import VifoApproveTransferMoney from "../Modules/Services/VifoApproveTransferMoney";
let approveMoneyTransfer = new VifoApproveTransferMoney;

async function testApproveMoneyTransfer() {
    const result = await approveMoneyTransfer.approveTransfers("VIFO123", '2022-11-11', {}, {});
    console.log(result);

}
testApproveMoneyTransfer();