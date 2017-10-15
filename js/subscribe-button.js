var registryAbi = [{"constant":true,"inputs":[{"name":"theAddress","type":"address"}],"name":"fetchWallet","outputs":[{"name":"_walletAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"vendorAddress","type":"address"}],"name":"fetchVendor","outputs":[{"name":"_theVendor","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fetchMyVendorContracts","outputs":[{"name":"_contracts","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fetchMyWallet","outputs":[{"name":"_theWallet","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"bytes"}],"name":"deployNewWallet","outputs":[{"name":"_newWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_vendorType","type":"uint8"},{"name":"_amount","type":"uint256"},{"name":"_frequency","type":"uint256"},{"name":"_email","type":"bytes"}],"name":"deployVendor","outputs":[{"name":"_newWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"addSubscription","outputs":[{"name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"}];
var walletAbi = [{"constant":false,"inputs":[{"name":"_email","type":"bytes"}],"name":"updateEmailAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"variableAmount","type":"uint256"}],"name":"collectPayment","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"confirmNewSubscription","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"email","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"cancelSubscription","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ratings","outputs":[{"name":"submitter","type":"address"},{"name":"total","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"subscriptionKeys","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subscriptions","outputs":[{"name":"counterparty","type":"address"},{"name":"startTime","type":"uint256"},{"name":"lastPaymentTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"addSubscription","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_email","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];

var vendorAddress = "<PUT VENDOR ADDRESS HERE>";

var wallet;
var registry;
var subscription;

function hasWeb3() {
	return (typeof web3 == undefined);
}

window.onload = function() {

	if (hasWeb3()) {
		var account = web3.eth.accounts[0];
		registry = web3.eth.contract(registryAbi).at("0x591101E2AeAe049781a9Fa74244b0b264132816d");
		wallet = registry.fetchMyWallet(function(error, result) {
			wallet = web3.eth.contract(walletAbi).at(result);
			wallet.subscriptions(vendorAddress, function(error, result) {
				subscription = result;
				document.getElementById("subscribeBtn").value = "Subscribed!";
			})
		});
	}

	document.getElementById("subscribeBtn").addEventListener("click", function() {
	    if (!hasWeb3() || wallet == null) {
	    	window.location.replace("http://www.porterawallet.com/signup");
	    } else if (subscription == null) {
	    	registry.addSubscription.sendTransaction(vendorAddress, {from: account}, function (error, result) {
				console.log(result);
				document.getElementById("subscribeBtn").value = "Subscribed!";
			});
	    } else {
	    	window.location.replace("http://www.porterawallet.com/subscriptions");
	    }
	});

};