function sendEther() {
    var recipient = document.getElementById("recipient-name").value;
    console.log(recipient);
    var amount = document.getElementById("send-amount").value;
    var weiAmount = web3.toWei(amount, "ether");
	myWallet.sendEther.sendTransaction(recipient, weiAmount, {from: account}, function (error, result) {
		console.log(result);
	});
	var closeButton = document.getElementById("send-close").click();
}

function fundWallet() {
	var amount = document.getElementById("fund-amount").value;
	var weiAmount = web3.toWei(amount, "ether");
	web3.eth.sendTransaction({from:currentAccount, to:myWallet, value: weiAmount}, function (error, result) {
		console.log(result);
	})
	var closeButton = document.getElementById("fund-close").click();
}

function getBalance() {
	web3.eth.getBalance(myWallet, function(error, result) { 
		return web3.fromWei(result.toString(), "ether");
	});
}