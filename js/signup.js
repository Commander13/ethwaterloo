function deployNewWallet(String email, account, callback) {
	var registry = getRegistry();
	registry.deployNewWallet.sendTransaction(email, {from: account}, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			waitForConfirmation(callback);
		}
	});
}

function hasWeb3() {
	return (typeof web3 == undefined);
}