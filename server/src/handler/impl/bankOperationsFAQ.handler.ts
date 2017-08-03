'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { BankOperationsFAQService }  from '../../services/bankOperationsFAQ.service';
 


export class BankOperationsFAQHandler implements Handler {
    command: string = 'command.bank.faq';
    handlerName: string = 'BankOperationsFAQHandler';

    init(commandHandler: CommandHandler) {
        commandHandler.register(this.command, this);
    }

    handleRequest(user: string, parameters: any): any {
        
        Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
        Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));
        let response = '';

        return new Promise((resolve, reject) => {
            let bankOperationsFAQService: BankOperationsFAQService = new BankOperationsFAQService();
            
			try {
				bankOperationsFAQService.getOperationsFAQResponse(parameters)
				.then((data) => {
					response = data;
					Logger.log(': promise resolved : ' + response);
					resolve(response);
				})
				.catch(() => {
					Logger.log("Unable to fetch Bank Operations FAQ response data for user - " + user);
					resolve("Unable to fetch Bank Operations FAQ response data for user - " + user);
				})
			} catch (ex) {
				Logger.log("Unable to fetch Bank Operations FAQ response data for user - " + user);
				resolve("Unable to fetch Bank Operations FAQ response data for user - " + user);
			}
			
        });

    }
}

