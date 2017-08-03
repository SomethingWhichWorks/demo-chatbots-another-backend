'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { AccountListService }  from '../../services/accountList.service';
import { AccountsHtmlUtils } from '../html-utils/AccountsHtmlUtils';

export class AccountListHandler implements Handler {
    command: string = 'command.accounts.list';
    handlerName: string = 'AccountListHandler';

    init(commandHandler: CommandHandler) {
        commandHandler.register(this.command, this);
    }

    handleRequest(user: string, parameters: any): any {

        return new Promise((resolve, reject) => {
          	let accountListService: AccountListService = new AccountListService();
			let filteredAccountList = '';

            Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
            Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));

			try {
				accountListService.getAccountListForUser(user)
				.then((data) => {
					filteredAccountList = data;
					Logger.log(this.handlerName + ': promise resolved : ' + data);
					resolve(AccountsHtmlUtils.buildAccountListResponse(parameters['channel'], filteredAccountList));
				})
				.catch((error) => {
					Logger.log(this.handlerName + ': promise rejected : ' + error);
					reject("Unable to fetch Accounts data for user - " + user);
				})
			} catch (ex) {
				Logger.log("Unable to fetch Accounts data for user - " + user);
				reject("Unable to fetch Accounts data for user - " + user);
			}
		});
		
		}
}



