'use strict';
import * as _ from "lodash";
import { PromisedIO } from '../support/promisified-io';


export class TransactionsService {

	getTransactionsHistory = (timeframeProjected: any, transactionsCount: any, userId: any): any => {

		return new Promise((resolve, reject) => {

			const TRANSACTIONS_URL = 'http://localhost:3000/transactions';

			PromisedIO.httpGetRequest(TRANSACTIONS_URL + "?user_id=" + userId)
				.then((data) => {
					let filteredTransactions = '';
					if ((timeframeProjected.trim() === 'last' || timeframeProjected.trim() === 'history') && transactionsCount > 0) {
						filteredTransactions = JSON.parse(data);
					}
					resolve(filteredTransactions);
				}).catch((error) => {
					reject('Unable to fetch Transactions at this time, please try again letter');
				});
		});
	}


	getTransactionsDetails = (transactionNumber: any, userId: any): any => {
		return new Promise((resolve, reject) => {
			const TRANSACTIONS_URL = 'http://localhost:3000/transactions';
			PromisedIO.httpGetRequest(TRANSACTIONS_URL + "?user_id=" + userId)
				.then((data) => {
					let transactionDetails = {};
					if (transactionNumber) {
						let fetchedTransactions = JSON.parse(data);

						if (fetchedTransactions && fetchedTransactions.length > 0) {
							transactionDetails = _.find(fetchedTransactions, function (transaction) { return transaction.id == transactionNumber; });
						} else {
							reject('I can not see any transaction exist for user : ' + userId);
						}
					}
					resolve(transactionDetails);
				}).catch((error) => {
					reject('Unable to fetch Transaction Details at this time, please try again letter');
				});
		});
	}

}
