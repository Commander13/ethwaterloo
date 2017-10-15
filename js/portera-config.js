var registryAddress = "0xb60A846fd1f938568CF5026E22dD628Bba9c00C6";

var registryAbi = [{"constant":true,"inputs":[{"name":"theAddress","type":"address"}],"name":"fetchWallet","outputs":[{"name":"_walletAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"vendorAddress","type":"address"}],"name":"fetchVendor","outputs":[{"name":"_theVendor","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fetchMyVendorContracts","outputs":[{"name":"_contracts","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fetchMyWallet","outputs":[{"name":"_theWallet","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"bytes"}],"name":"deployNewWallet","outputs":[{"name":"newWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_vendorType","type":"uint8"},{"name":"_amount","type":"uint256"},{"name":"_frequency","type":"uint256"},{"name":"_email","type":"bytes"}],"name":"deployVendor","outputs":[{"name":"_newWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"addSubscription","outputs":[{"name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"}];
var subscriptionAbi = [{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxVariableAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vendorType","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"email","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"client","type":"address"}],"name":"cancelSubscription","outputs":[{"name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ratings","outputs":[{"name":"submitter","type":"address"},{"name":"total","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"},{"name":"subscriber","type":"address"}],"name":"collectPayment","outputs":[{"name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"subscriptionKeys","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"frequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subscriptions","outputs":[{"name":"counterparty","type":"address"},{"name":"startTime","type":"uint256"},{"name":"lastPaymentTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"subscriber","type":"address"}],"name":"addSubscription","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_email","type":"bytes"},{"name":"_amount","type":"uint256"},{"name":"_maxVariableAmount","type":"uint256"},{"name":"_vendorType","type":"uint8"},{"name":"_frequency","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];
var walletAbi = [{"constant":false,"inputs":[{"name":"_email","type":"bytes"}],"name":"updateEmailAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"variableAmount","type":"uint256"}],"name":"collectPayment","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"confirmNewSubscription","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"email","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"cancelSubscription","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ratings","outputs":[{"name":"submitter","type":"address"},{"name":"total","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"subscriptionKeys","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subscriptions","outputs":[{"name":"counterparty","type":"address"},{"name":"startTime","type":"uint256"},{"name":"lastPaymentTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vendor","type":"address"}],"name":"addSubscription","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_email","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];

var currentAccount;
var myWallet;
var accounts;

function hasWeb3() {
	return (typeof web3 !== 'undefined');
}

function getWallet(address) {

	return web3.eth.contract(walletAbi).at(address);
}

function getVendor(address) {

	return web3.eth.contract(subscriptionAbi).at(address);
}

function getRegistry() {

	return web3.eth.contract(registryAbi).at(registryAddress);
}

function loadAccounts() {

	web3.eth.getAccounts(function(error, result) {
		accounts = result;

		if (typeof(Storage) !== "undefined") {
			currentAccount = localStorage.getItem("currentAccount");
		}
		if (currentAccount == null) {
			currentAccount = accounts[0];
		}
		getWalletAddress(currentAccount);
	});

}

function getBalance(address) {

	web3.eth.getBalance(address, function(error, result) {
		console.log(web3.fromWei(result.toString(), "ether"))
	})

}

function getBlockiesImage(address, size, scale) {

	return 'url(' + blockies.create({ seed:address ,size: size,scale: scale}).toDataURL()+')'
}

function selectAccount(account) {

	localStorage.setItem("currentAccount", account);
	location.reload();

}

function getWalletAddress(account) {

	getRegistry().fetchWallet(account, function(error, result) {
		console.log("RESULT: " + result);
		if (!error && result != "0x" && result != "0x0000000000000000000000000000000000000000") {
			console.log("Wallet: " +result);
			myWallet = getWallet(result);
		} else if (!window.location.href.includes("signup")) {
			console.log("Going to home");
			window.location.replace("signup");
		}
	});

}


function populateWalletDropdown(dropdown) {

	web3.eth.getAccounts(function(error, result) {
		for(i = 0; i < result.length; i += 1) {
	        var newElement = document.createElement('button');
	        newElement.setAttribute("class", "dropdown-item");
	        newElement.setAttribute("type", "button");
	        newElement.textContent = result[i];
	        newElement.value = result[i];
	        newElement.style.backgroundImage = getBlockiesImage(result[i], 8, 4);
	        newElement.style.backgroundRepeat = "no-repeat";
	        dropdown.appendChild(newElement);
		}
	});

}

function waitForConfirmation(txhash, callback) {

	var filter = web3.eth.filter("latest");
	filter.watch(function(error, result) {
		console.log("UPDATE");
		if (!error) {
			web3.eth.getTransaction(txhash, function(error, result1) {
				console.log(result1);
				if (error) {
					callback(error, null);
				} else {
					if (result1.blockNumber != null) {
						console.log("NOT NULL BLOCK");
						web3.eth.getTransactionReceipt(txhash, function(error, result2) {
							console.log(result2);
							if (error) {
								callback(error, null);
							} else {
								if (result2.gasUsed < result1.gas) {
									callback(null, result2);
								} else {
                             		callback("Out of gas", null);
								}
							}
							filter.stopWatching();
						});
					}
				}
			});
		} else {
			callback(error, null);
		}
	});

}


window.addEventListener("load", function() {

	if (!hasWeb3()) {
		window.location.replace("signup");
		return;
	}


	loadAccounts();

});
