function sendEther(recipient, amount, account) {
    var recipient = document.getElementById("recipient-name").value;
    console.log(recipient);
    var amount = document.getElementById("send-amount").value;
    var weiAmount = web3.toWei(amount, "ether");
	myWallet.sendEther.sendTransaction(recipient, weiAmount, {from: account}, function (error, result) {
		console.log(result);
	});

}