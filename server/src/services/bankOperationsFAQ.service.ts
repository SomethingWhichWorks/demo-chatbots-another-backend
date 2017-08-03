'use strict';
import * as _ from "lodash";
import { PromisedIO } from '../support/promisified-io';


export class BankOperationsFAQService {

	getOperationsFAQResponse = (parameters: any): any => {

		return new Promise((resolve, reject) => {

			const BANK_OPERATIONS_URL = 'http://localhost:3000/bankOperations';

			PromisedIO.httpGetRequest(BANK_OPERATIONS_URL)
				.then((data) => {
					let response = '';
					let operationsFAQResponse = '';
					let parsedJsonData = JSON.parse(data);
					let bankOperationData = parsedJsonData[0];
					if (parameters) {
						if (parameters['bank-hours'] || parameters['date-period'] || parameters['time-period']) {
							//BANK Hours query
							bankOperationData['working_Hours'].forEach(entry => {
								var entryText = entry.day + ': ' + entry.openingHours + '\n';
								response = response + entryText;
							});
							operationsFAQResponse = "You can visit bank anytime between these hours : " + response;

						} else if (parameters['bank-instruments']) {
							//BANK instruments Query
							let instrument = parameters['bank-instruments'];

							let matchedObject = _.find(bankOperationData['bank_instruments'], (instrumentObj: any) => {
								return instrumentObj.instrument.toUpperCase() === instrument.toUpperCase();
							});

							if (matchedObject) {
								response = matchedObject.helpText;
							} else {
								response = bankOperationData["general_response"];
							}

							operationsFAQResponse = response;
						} else {
							operationsFAQResponse = bankOperationData["general_response"];
						}
					} else {
						operationsFAQResponse = "I dont understand what do you mean, please try again";
					}
					resolve(operationsFAQResponse);
				}).catch((error) => {
					resolve('Unable to fetch Bank Operation data at this time, please try again letter');
				});
		});

	}
}

