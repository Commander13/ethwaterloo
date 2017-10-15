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
		console.log("Clicked");
		document.getElementById("loadingBar").style.visibility = 'visible';
	    deployNewWallet(document.getElementById("emailInput").value, function(error, result) {
	    	if (!error) {
	    		console.log("Success");
	    		window.location.replace("mywallet");
	    	} else {
	    		console.log(error);
	    	}
	    })
	});

});