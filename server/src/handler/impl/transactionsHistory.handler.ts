'use strict';
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsHtmlUtils } from '../html-utils/TransactionsHtmlUtils';

export class TransactionsHistoryHandler implements Handler {
	command: string = 'command.transactions.history';
	handlerName: string = 'TransactionsHistoryHandler';

	init(commandHandler: CommandHandler) {
		commandHandler.register(this.command, this);
	}

	handleRequest(user: string, parameters: any): any {

		return new Promise((resolve, reject) => {
			let filteredTransactions = '';
			let txnService: TransactionsService = new TransactionsService();
			let {timeframeProjected, transactionsCount} = parameters;

			Logger.log(this.handlerName + ': handling the request for command: ' + this.command);


			try {
				txnService.getTransactionsHistory(timeframeProjected, transactionsCount, user)
					.then((data) => {
						let fetchedTransactions = data;
						Logger.log(this.handlerName + ': promise resolved : ' + fetchedTransactions);
						if (fetchedTransactions && fetchedTransactions.length > 0) {
							filteredTransactions = filteredTransactions.concat('Here is your transactions history...');
							for (var i = 0; i < transactionsCount; i++) {
								filteredTransactions = filteredTransactions
									.concat(TransactionsHtmlUtils.buildTransactionHistoryResponse(parameters['channel'], fetchedTransactions[i]));
							}
							filteredTransactions = filteredTransactions.concat(TransactionsHtmlUtils.buildTransactionSuggestionsResponse(parameters['channel'], (fetchedTransactions[i - 1])));
						} else {
							filteredTransactions = filteredTransactions.concat('I can not see any transactions history for you.');
						}

						resolve(filteredTransactions);
					})
					.catch((error) => {
						Logger.log(this.handlerName + ': promise rejected : ' + error);
						resolve("Unable to fetch Transactions data for user - " + user);
					})
			} catch (exception) {
				Logger.log("Exception thrown : " + exception);
				resolve("Unable to fetch Transactions data for user - " + user);
			}
		});
	}
}
