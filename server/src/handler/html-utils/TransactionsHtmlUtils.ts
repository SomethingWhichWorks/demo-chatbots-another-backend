'use strict';
import * as _ from "lodash";


export class TransactionsHtmlUtils {

	/* Transaction History Response */
	static buildTransactionHistoryResponse = (channel: string, accounts: any) => {
		switch (channel) {
			case "web":
				return TransactionsHtmlUtils.buildTransactionHistoryResponseForWebChannel(accounts);
			case "mobile":
				return TransactionsHtmlUtils.buildTransactionHistoryResponseForOtherChannels(accounts);
			default:
				return TransactionsHtmlUtils.buildTransactionHistoryResponseForOtherChannels(accounts);
		}
	}

	//Only for Web Channel
	static buildTransactionHistoryResponseForWebChannel = (transactionObject) => {
		let id: string;
		let amount: string;
		let currency: string;
		let recipientName: string;

		id = transactionObject.id || '';
		amount = transactionObject.amount || '';
		currency = transactionObject.currency || '';
		recipientName = transactionObject.recipient_name || '';


		return '<br><div>' +
			'<div><strong>Transaction Id -</strong> ' + id + '</div>' +
			'<div>Recipient Name - ' + recipientName + '</div>' +
			'<div>Transaction Amount - ' + amount + '</div>' +
			'<div>Transaction Currency - ' + currency + '</div>' +
			'</div><br>';
	}

	//For All other channels
	static buildTransactionHistoryResponseForOtherChannels = (transactionObject) => {
		let id: string;
		let amount: string;
		let currency: string;
		let recipientName: string;

		id = transactionObject.id || '';
		amount = transactionObject.amount || '';
		currency = transactionObject.currency || '';
		recipientName = transactionObject.recipient_name || '';

		return 'Transaction Id - ' + id + '\n' +
			'Recipient Name - ' + recipientName + '\n' +
			'Transaction Amount - ' + amount + '\n' +
			'Transaction Currency - ' + currency + '\n';
	}


	/* Transaction Suggestions Response */
	static buildTransactionSuggestionsResponse = (channel: string, transactionObject: any): string => {
		let id: string;
		id = transactionObject.id || '';
		return 'With my help you can get transaction details as well, you have to just enter details of ' + id;
	}


	/* Transaction Details Response */
	static buildTransactionDetailsResponse = (channel: string, transactionObject: any): string => {
		switch (channel) {
			case "web":
				return TransactionsHtmlUtils.buildTransactionDetailsResponseForWebChannel(transactionObject);
			case "mobile":
				return TransactionsHtmlUtils.buildTransactionDetailsResponseForOtherChannels(transactionObject);
			default:
				return TransactionsHtmlUtils.buildTransactionDetailsResponseForOtherChannels(transactionObject);
		}
	}

	//Only for Web Channel
	static buildTransactionDetailsResponseForWebChannel = (transactionObject) => {
		let id: string;
		let amount: string;
		let currency: string;
		let recipientName: string;
		let message: string;
		let status: string;
		let entryDate: string;


		id = transactionObject.id || '';
		amount = transactionObject.amount || '';
		currency = transactionObject.currency || '';
		recipientName = transactionObject.recipient_name || '';
		message = transactionObject.message || '';
		status = transactionObject.status || '';
		entryDate = transactionObject.entry_date || '';


		return '<div>' +
			'<div><strong>Details for transaction id ' + id + ' ...' + '</strong></div>' +
			'<br><div>Recipient Name - ' + recipientName + '</div>' +
			'<div>Amount - ' + amount + '</div>' +
			'<div>Currency - ' + currency + '</div>' +
			'<div>Message - ' + message + '</div>' +
			'<div>Status - ' + status + '</div>' +
			'<div>Date - ' + entryDate + '</div>' +
			'</div><br>';
	}

	//For All other channels
	static buildTransactionDetailsResponseForOtherChannels = (transactionObject) => {
		let id: string;
		let amount: string;
		let currency: string;
		let recipientName: string;
		let message: string;
		let status: string;
		let entryDate: string;


		id = transactionObject.id || '';
		amount = transactionObject.amount || '';
		currency = transactionObject.currency || '';
		recipientName = transactionObject.recipient_name || '';
		message = transactionObject.message || '';
		status = transactionObject.status || '';
		entryDate = transactionObject.entry_date || '';


		return 'Details for transaction id ' + id + ' ...' + '\n' +
			'Recipient Name - ' + recipientName + '\n' +
			'Amount - ' + amount + '\n' +
			'Currency - ' + currency + '\n' +
			'Message - ' + message + '\n' +
			'Status - ' + status + '\n' +
			'Date - ' + entryDate + '\n';
	}
}