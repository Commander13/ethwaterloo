var balance;

function waitForVendorAccountLoad() {

	if (subscriptions.count > 0) {
		setTimeout(waitForVendorAccountLoad, 1000);
	} else {
		console.log(subscriptions);
		balance = getBalance(subscriptions[0]);
		var balanceLabel = document.getElementById("balance-label");
		balanceLabel.textContent = balance;
	}

}

window.addEventListener("load", function() {

	populateWalletDropdown(document.getElementById("accountDropdown"));
	waitForVendorAccountLoad();

});