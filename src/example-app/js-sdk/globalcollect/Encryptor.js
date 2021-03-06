define("GCsdk.Encryptor", ["GCsdk.core", "GCsdk.promise", "GCsdk.JOSEEncryptor"], function(GCsdk, Promise, JOSEEncryptor) {

	var Encryptor = function(publicKeyResponsePromise) {
		this.encrypt = function(paymentRequest) {
			var promise = new Promise();
			var encryptedString = '';
			publicKeyResponsePromise.then(function (publicKeyResponse) {
				if (paymentRequest.isValid()) {
				    
					var blob = {
					   clientSessionId: paymentRequest.getClientSessionID()
					   ,nonce: forge.util.bytesToHex(forge.random.getBytesSync(16))
					   ,paymentProductId: paymentRequest.getPaymentProduct().id
                       ,tokenize: paymentRequest.getTokenize()
                    };
                    
					if (paymentRequest.getAccountOnFile()) {
                        blob["accountOnFileId"] = paymentRequest.getAccountOnFile().id;
                    }
                    
                    var paymentValues = [], values = paymentRequest.getUnmaskedValues();
                    for (var key in values) {
                        paymentValues.push({
                            key: key,
                            value: values[key]
                        });
                    }
                    blob["paymentValues"] = paymentValues;
					
					// use blob to encrypt
					var joseEncryptor = new JOSEEncryptor();
					encryptedString = joseEncryptor.encrypt(blob, publicKeyResponse);
					promise.resolve(encryptedString);
				} else {
					promise.reject(paymentRequest.getErrorMessageIds());
				}
			}, function (error) {
				promise.reject(error);
			});
			return promise;
		};
	};

	GCsdk.Encryptor = Encryptor;
	return Encryptor;
});