function deployNewWallet(email, callback) {
	getRegistry().deployNewWallet.sendTransaction(email, {from: currentAccount}, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			console.log(result);
			waitForConfirmation(result, callback);
		}
	});
}

window.addEventListener("load", function() {

	document.getElementById("setupBtn").addEventListener("click", function() {
	    deployNewWallet(document.getElementById("emailInput").value, function(error, result) {
	    	if (!error) {
	    		window.location.replace("mywallet");
	    	} else {
	    		console.log(error);
	    	}
	    })
	});

});