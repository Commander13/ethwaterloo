var subscriptions = [];
var parser = new DOMParser();

function loadSubscriptions() {

	myWallet.subscriptionKeys(function(error, result) {
		var subKeys = result;
		for (var i = 0; i < subKeys.length; i++) {
			var key = subKeys[i];
			if (key != 0) {
				myWallet.subscriptions(key, function(error, result) {
					if (error) {
						return;
					}
					var subscription = result;
					subscriptions.push(subscription);
					
					var cardHtml = "<div class=\"col-md-4\"><div class=\"flip\"><div class=\"card\"><div class=\"face front\"><div class=\"inner\"><img src=\"$IMAGE$\"><\/div><\/div><div class=\"face back\"><div class=\"inner text-center\"><h6>Amount: $AMOUNT$ ETH<br><br>Frequency: $FREQUENCY$<br><br>Next Payment: $NEXT_PAYMENT$<\/h6><button id=\"unsubscribeBtn\" type=\"button\" class=\"btn btn-default\">Unsubscribe<\/button><\/div><\/div><\/div><\/div><\/div>";
				  	cardHtml.replace("$IMAGE$", subscription.logo);
				  	cardHtml.replace("$AMOUNT$", subscription.amount);
				  	cardHtml.replace("$FREQUENCY$", "every " + (subscription.frequency/60) + " mins");
				  	var nextPayment;
				  	if (subscription.lastPayment == 0) {
				  		nextPayment = susbcription.startTime + susbcription.frequency;
				  	} else {
						nextPayment = subscription.lastPayment + susbcription.frequency;
				  	}
				  	cardHtml.replace("$NEXT_PAYMENT$", nextPayment);
				  	var card = parser.parseFromString(cardHtml, "text/xml");
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

					document.getElementById("subscriptionsGroup").appendChild(card);
				})
			}
		}
	});

}

function waitForAccountLoad() {

	if (myWallet == null) {
		setTimeout(waitForAccountLoad, 1000);
	} else {
		loadSubscriptions();
	}

}

window.addEventListener("load", function() {

	populateWalletDropdown(document.getElementById("accountDropdown"));
	waitForAccountLoad();

});
