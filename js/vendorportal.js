var balance;
var subscriptions = [];var parser = new DOMParser();

function waitForVendorAccountLoad() {

	if (vendorSubscriptions == null || vendorSubscriptions.length == 0) {
		setTimeout(waitForVendorAccountLoad, 1000);
	} else {
		balance = getBalance(vendorSubscriptions[0], function(error, result) {
			if (!error) {
				var balanceLabel = document.getElementById("balance-label");
				balanceLabel.textContent = balance;
			} else {
				console.log(error);
			}
		});
		populateSubscribers();
	}
}

function withdrawFunds() {

	vendor.withdrawFunds.sendTransaction(balance, {from: vendorSubscriptions[0]}, function (error, result) {
		console.log(result);
	});

}

function collectPayment(amount, subscriber) {

	vendor.collectPayment.sendTransaction(amount, subscriber, {from: vendorSubscriptions[0]}, function (error, result) {
		console.log(result);
	});

}

function populateSubscribers() {
	getVendor(vendorSubscriptions[0]).getSubscriptionKeys(function(error, result) {
		var subKeys = result;
		console.log(result);
		for (var i = 0; i < subKeys.length; i++) {
			var key = subKeys[i];
			if (key != 0) {
				getVendor(vendorSubscriptions[0]).subscriptions(key, function(error, result) {
					if (error) {
						return;
					}
					var subscription = result;
					subscriptions.push(subscription);	
					var cardHtml = "<div class=\"card-header\" role=\"tab\" id=\"headingOne\">\r\n        <h5 class=\"mb-0\">\r\n          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\" style=\"float:left\">\r\n            $CLIENT$\r\n          <\/a>\r\n          <button type=\"button\" id=\"unsubscribeBtn\" class=\"btn btn-primary btn-sm\" style=\"float:right;margin-left: 10px;\">Cancel<\/button>\r\n          <button type=\"button\" id=\"collectBtn\" class=\"btn btn-primary btn-sm\" style=\"float:right\">Collect<\/button>\r\n        <\/h5>\r\n      <\/div>";
		 			cardHtml = cardHtml.replace("$CLIENT$", subscription.counterparty);
				  	console.log(cardHtml);
				  	var card = parser.parseFromString(cardHtml, "text/html");
				  	console.log(card);
				  	card.getElementById("unsubscribeBtn").addEventListener("click", function() {
					    wallet.cancelSubscription.sendTransaction(subscription.counterparty, {from: account}, function (error, result) {
							if (!error) {
								console.log(result);
								alert("Subscription Cancelled");
							} else {
								alert(error);
							}
						});
					});
					card.getElementById("collectBtn").addEventListener("click", function() {
						collectPayment(vendorSubscriptions[0].amount, subscription.counterparty);
					});

					document.getElementById("accordion").appendChild(card.firstChild);
				});
			}
		}
	});

}
	

window.addEventListener("load", function() {

	populateWalletDropdown(document.getElementById("accountDropdown"));
	waitForVendorAccountLoad();
	document.getElementById("withdraw").addEventListener("click", function() {
		console.log("Clicked");
		if (balance > 0) {
	    	withdrawFunds();
		}	
	});

});