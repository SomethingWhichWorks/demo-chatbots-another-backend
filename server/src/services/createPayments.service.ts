'use strict';
import * as _ from "lodash";
import { PromisedIO } from '../support/promisified-io';
import { AccountDetailsService } from './accountDetails.service';

export class CreatePaymentsService {
	createPayment = (parameters: any, user: any): any => {
		return new Promise((resolve, reject) => {
			const TRANSACTIONS_URL = 'http://localhost:3000/transactions';
			const ACCOUNTS_URL = 'http://localhost:3000/accounts/';

			let formData = CreatePaymentsService.preparePaymentsModel(parameters, user);
			let accountDetailsService: AccountDetailsService = new AccountDetailsService();
			let paymentCreated: any = '';

			PromisedIO.httpPostRequest(TRANSACTIONS_URL, formData)
				.then((paymentSuccessfulData) => {
					paymentCreated = paymentSuccessfulData;
					return paymentSuccessfulData;
				}).then((payment) => {
					let upadateAmountForToAccount: any = '';
					upadateAmountForToAccount = accountDetailsService.getAccountDetails(parameters.toAccount, user)
						.then((toAccount) => {
							if (toAccount) {
								toAccount.booked_balance = Number(toAccount.booked_balance) + Number(parameters.amount);
							}
							return toAccount;
						}).catch((error) => {
							//Logger.log(': promise rejected : ' + data1);
							console.log('Error Thrown while fetching account details: ' + error);
							console.log("Unable to fetch Account Details data for user - " + user);
							reject('Error Thrown while fetching account details: ' + error);
						})
					return upadateAmountForToAccount;

				}).then((toAccountUpadated) => {
					if (toAccountUpadated) {
						PromisedIO.httpPutRequest(ACCOUNTS_URL + parameters.toAccount, toAccountUpadated)
							.then((updatedAccount) => {
								// resolve("Payment created successfully !!!!");
								// resolve(updatedAccount);
								return updatedAccount;
							});
					}
				}).then((payment) => {
					let upadateAmountForFromAccount: any = '';
					upadateAmountForFromAccount = accountDetailsService.getAccountDetails(parameters.fromAccount, user)
						.then((fromAccount) => {
							if (fromAccount) {
								fromAccount.booked_balance = Number(fromAccount.booked_balance) - Number(parameters.amount);
							}
							return fromAccount;
						}).catch((error) => {
							//Logger.log(': promise rejected : ' + data1);
							console.log('Error Thrown while fetching account details: ' + error);
							console.log("Unable to fetch Account Details data for user - " + user);
							reject('Error Thrown while fetching account details: ' + error);
						})
					return upadateAmountForFromAccount;
				}).then((fromAccountUpadated) => {
					if (fromAccountUpadated) {
						PromisedIO.httpPutRequest(ACCOUNTS_URL + parameters.fromAccount, fromAccountUpadated)
							.then((updatedAccount) => {
								resolve("Payment created successfully with payment id : " + paymentCreated.id);
							});
					}
				}).catch((error) => {
					reject('Unable to create payment at this time, please try again letter');
				});
		});

	}

	static preparePaymentsModel = (parameters: any, user: any) => {
		return {
			"user_id": user,
			"from": parameters.fromAccount,
			"to": parameters.toAccount,
			"recipient_name": parameters.toAccount,
			"recipient_address": [
				"Address Line 123",
				"Address Line 345"
			],
			"message": "Payment Creation",
			"amount": parameters.amount,
			"entry_date": "01 August 2017",
			"status": "Confirmed",
			"type": "Third Party",
			"due": "01 August 2017",
			"currency": "DKK",
			"recurring": {
				"count": "0",
				"interval": "daily",
				"frequency": "0"
			},
			"cross_border": {
				"sepa_reference": "string",
				"bic": "string",
				"branch_code": "000",
				"bank_name": "Nordea Bank",
				"bank_country": "Denmark"
			}

		};
	}
}



