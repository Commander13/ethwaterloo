var subscriptions = [];
var parser = new DOMParser();

function loadSubscriptions() {

	myWallet.getSubscriptionKeys(function(error, result) {
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

					var cardHtml = "<div class=\"col-md-4\">\r\n\t<div class=\"flip\">\r\n\t\t<div class=\"card\">\r\n\t\t\t<div class=\"face front\">\r\n\t\t\t\t<div class=\"inner\">\r\n\t\t\t\t\t<img src=\"$IMAGE$\"\/>\r\n\t\t\t\t<\/div>\r\n\t\t\t<\/div>\r\n\t\t\t<div class=\"face back\">\r\n\t\t\t\t<div class=\"inner text-center\">\r\n\t\t\t\t\t<h6>Amount: $AMOUNT$ ETH<br\/><br\/>\r\n\t\t\t\t\tFrequency: $FREQUENCY$<br\/><br\/>\r\n\t\t\t\t\tNext Payment: $NEXT_PAYMENT$<\/h6>\r\n\t\t\t\t\t<button id=\"unsubscribeBtn\" type=\"button\" class=\"btn btn-default\">Unsubscribe<\/button>\r\n\t\t\t\t<\/div>\r\n\t\t\t<\/div>\r\n\t\t<\/div>\r\n\t<\/div>\r\n<\/div>";
				  	cardHtml = cardHtml.replace("$IMAGE$", "img/google.png");
				  	cardHtml = cardHtml.replace("$AMOUNT$", subscription.amount);
				  	cardHtml = cardHtml.replace("$FREQUENCY$", "every " + (subscription.frequency/60) + " mins");
				  	var nextPayment;
				  	if (subscription.lastPayment == 0) {
				  		nextPayment = subscription.startTime + subscription.frequency;
				  	} else {
						nextPayment = subscription.lastPayment + subscription.frequency;
				  	}
				  	cardHtml = cardHtml.replace("$NEXT_PAYMENT$", nextPayment);
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

					document.getElementById("subscriptionsGroup").appendChild(card.firstChild);
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


// <div class="col-md-4">
// 	<div class="flip">
// 		<div class="card">
// 			<div class="face front">
// 				<div class="inner">
// 				<img src="$IMAGE$"/ data-toggle="modal" data-target="#sendeth" data-whatever="@mdo">
// 				</div>
// 			</div>
// 			<div class="face back">
// 				<div class="inner text-center">
// 					<h6>Amount: $AMOUNT$ ETH<br/><br/>
// 					Frequency: $FREQUENCY$<br/><br/>
// 					Next Payment: $NEXT_PAYMENT$</h6>
// 					<button id="unsubscribeBtn" type="button" class="btn btn-default">Unsubscribe</button>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>
