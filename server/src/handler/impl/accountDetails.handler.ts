'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { AccountDetailsService } from '../../services/accountDetails.service';
import { AccountsHtmlUtils } from '../html-utils/AccountsHtmlUtils';


export class AccountDetailsHandler implements Handler {
	command: string = 'command.account.details';
	handlerName: string = 'AccountDetailsHandler';


	init(commandHandler: CommandHandler) {
		commandHandler.register(this.command, this);
	}

	handleRequest(user: string, parameters: any): any {

		return new Promise((resolve, reject) => {
			let accountDetailsService: AccountDetailsService = new AccountDetailsService();
			let filteredAccountDetails = '';

			Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
			Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));

			try {
				accountDetailsService.getAccountDetails(parameters['account'], user)
					.then((data) => {
						filteredAccountDetails = data;
						Logger.log(this.handlerName + ': promise resolved : ' + filteredAccountDetails);
						resolve(AccountsHtmlUtils.buildAccountDetailsResponse(parameters['channel'], filteredAccountDetails));
					}).catch((error) => {
						Logger.log(this.handlerName + ': promise rejected : ' + error);
						reject("Unable to fetch Account Details data for user - " + user);
					})
			} catch (ex) {
				Logger.log("Unable to fetch Account Details data for user - " + user);
				reject("Unable to fetch Account Details data for user - " + user);
			}

		});
	}
}



