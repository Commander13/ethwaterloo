var wallet = getWallet("");
var vendor = getVendor("");
var registry = getRegistry("");

function getWallet(address) {

	return web3.eth.contract(walletAbi).at(address);
}

function getVendor(address) {

	return web3.eth.contract(subscriptionAbi).at(address);
}

function getRegistry(address) {

	return web3.eth.contract(registryAbi).at(address);
}

function getAccounts() {

	return web3.eth.accounts;
}

function getBalance(address) {

	web3.eth.getBalance(address, function(error, result) { 
		console.log(web3.fromWei(result.toString(), "ether")) 
	});

}


function waitForConfirmation(txhash, callback) {

	var filter = web3.eth.filter("latest");
	filter.watch(function(error, result) {
		if (!error) {
			web3.eth.getTransaction(txhash, function(error, result) {
				if (error) {
					callback(error, null);
				} else {
					if (result.block != null) {
						web3.eth.getTransactionReceipt(txhash, function(error, result) {
							if (error) {
								callback(error, null);
							} else {
								if (result.gas < result.gasUsed) {
									callback(null, result);
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


//WALLET
function sendEther(recipient, amount, account) {

	var weiAmount = web3.toWei(amount, "ether");
	wallet.sendEther.sendTransaction(recipient, weiAmount, {from: account}, function (error, result) {
		console.log(result);
	});

}

function fundWallet(amount, walletAddress, account) {

	var weiAmount = web3.toWei(amount, "ether");
	web3.eth.sendTransaction({from:account, to:walletAddress, value: weiAmount}, function (error, result) {
		console.log(result);
	})

}

function cancelWalletSubscription(vendor, account) {

	wallet.cancelSubscription.sendTransaction(vendor, {from: account}, function (error, result) {
		console.log(result);
	});

}

function confirmNewSubscription(vendor, account) {

	wallet.confirmNewSubscription.sendTransaction(vendor, {from: account}, function (error, result) {
		console.log(result);
	});

}

function updateEmailAddress(email, account) {

	wallet.updateEmailAddress.sendTransaction(email, {from: account}, function (error, result) {
		console.log(result);
	});

}

var subscriptions = [];
function getSubscriptions() {

	vendor.subscriptionKeys(function(error, result) {
		var subKeys = result;
		for (int i = 0; i < subKeys.length; i++) {
			var key = subKeys[i];
			vendor.subscriptions(key, function(error, result) {
				subscriptions.push(result);
				//TODO: Update UI
			})
		}
	});

}


//VENDOR
function cancelVendorSubscription(vendor, account) {

	vendor.cancelSubscription.sendTransaction(vendor, {from: account}, function (error, result) {
		console.log(result);
	});

}

function withdrawFunds(amount, account) {

	vendor.withdrawFunds.sendTransaction(amount, {from: account}, function (error, result) {
		console.log(result);
	});

}

function collectPayment(amount, subscriber, account) {

	vendor.collectPayment.sendTransaction(amount, subscriber, {from: account}, function (error, result) {
		console.log(result);
	});

}


//REGISTRY
function addSubscription(vendor, account) {

	registry.addSubscription.sendTransaction(vendor, {from: account}, function (error, result) {
		console.log(result);
	});

}

//UI Functions
function populateWalletDropdown(dropdown) {
	var accounts = getAccounts();
	for(i = 0; i < accounts.length; i += 1) {
		var newElement;
        newElement = document.createElement('option');
        newElement.textContent = "    "+accounts[i];
        newElement.value = accounts[i];
        newElement.style.backgroundImage = getBlockiesImage(accounts[i], 5, 10);
        newElement.style.backgroundRepeat = "no-repeat";
        dropdown.appendChild(newElement);
	}
}