'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsHtmlUtils } from '../html-utils/TransactionsHtmlUtils';

export class TransactionDetailsHandler implements Handler {
	command: string = 'command.transaction.details';
	handlerName: string = 'TransactionDetailsHandler';

	init(commandHandler: CommandHandler) {
		commandHandler.register(this.command, this);
	}

	handleRequest(user: string, parameters: any): any {

		return new Promise((resolve, reject) => {
			let transactionDetails = '';
			let txnService: TransactionsService = new TransactionsService();
			let {transactionNumber} = parameters;

			Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
			Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));

			try {
				txnService.getTransactionsDetails(transactionNumber, user)
					.then((data) => {
						Logger.log(this.handlerName + ': promise resolved : ' + data);
						if (data) {
							transactionDetails = TransactionsHtmlUtils.buildTransactionDetailsResponse(parameters['channel'], data);
						} else {
							transactionDetails = 'I can not see any transaction details for transaction number : ' + transactionNumber;
						}

						resolve(transactionDetails);
					})
					.catch((error) => {
						Logger.log(this.handlerName + ': promise rejected : ' + error);
						reject("Unable to fetch Transactions details data for user - " + user);
					})
			} catch (exception) {
				Logger.log(this.handlerName + ': Exception thrown' + exception);
				reject("Unable to fetch Transactions details data for user - " + user);
			}

		});
	}

}
