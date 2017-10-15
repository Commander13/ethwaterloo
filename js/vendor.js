function deployVendor(callback) {
	var typeDrop = document.getElementById("exampleSelect1");
    var type = typeDrop.options[typeDrop.selectedIndex].value;
    var amount = document.getElementById("send-amount").value;
    var weiAmount = web3.toWei(amount, "ether");
    var frequency = Number(document.getElementById("freq-input").value);
    var frequencyDrop = document.getElementById("freq-input");
    var frequencyUnit = frequencyDrop.options[frequencyDrop.selectedIndex].value;
    if (frequencyUnit == 0) {
    	frequency = frequency*60*60;
    } else if (frequencyUnit == 1) {
    	frequency = frequency*60*60*24;
    } else if (frequencyUnit == 2) {
    	frequency = frequency*60*60*24*7;
    } else if (frequencyUnit == 3) {
    	frequency = frequency*60*60*24*7*30;
    }
    var email = document.getElementById("fname").value;
	getRegistry().deployVendor.sendTransaction(type, amount, frequency, email, {from: currentAccount}, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			console.log(result);
			waitForConfirmation(result, callback);
		}
	});
}

window.addEventListener("load", function() {
	populateWalletDropdown(document.getElementById("accountDropdown"));
	document.getElementById("setupBtn").addEventListener("click", function() {
		console.log("Clicked");
	    deployVendor(function(error, result) {
	    	if (!error) {
	    		console.log("Success");
	    		window.location.replace("vendorportal");
	    	} else {
	    		console.log(error);
	    	}
	    })
	});

});
