define("GCsdk.BasicPaymentProduct", ["GCsdk.core", "GCsdk.AccountOnFile", "GCsdk.PaymentProductDisplayHints"], function(GCsdk, AccountOnFile, PaymentProductDisplayHints) {

	var _parseJSON = function (_json, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
	};

	var BasicPaymentProduct = function (json) {
		this.json = json;
		this.accountsOnFile = []; 
		this.accountOnFileById = {}; 
		this.allowsRecurring = json.allowsRecurring;
		this.allowsTokenization = json.allowsTokenization;
		this.autoTokenized  = json.autoTokenized ;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.id = json.id;
		this.maxAmount = json.maxAmount;
		this.minAmount = json.minAmount;
		this.mobileIntegrationLevel = json.mobileIntegrationLevel;
		this.usesRedirectionTo3rdParty = json.usesRedirectionTo3rdParty;
		
		_parseJSON(json, this.accountsOnFile, this.accountOnFileById);
	};

	GCsdk.BasicPaymentProduct = BasicPaymentProduct;
	return BasicPaymentProduct;
});