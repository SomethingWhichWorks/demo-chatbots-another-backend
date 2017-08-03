'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { MockDataService } from '../../data/mockData.service';
import { CreatePaymentsService }  from '../../services/createPayments.service';


 

export class CreatePaymentsHandler implements Handler {
    command: string = 'command.payments.create';
    handlerName: string = 'CreatePaymentsHandler';
	
    
	init(commandHandler: CommandHandler) {
        commandHandler.register(this.command, this);
    }

    handleRequest(user: string, parameters: any): any {

        return new Promise((resolve, reject) => {
            
            Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
            Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));

            //resolve('Payment request has been sent to backoffice for processing');
			let createPaymentsService: CreatePaymentsService = new CreatePaymentsService();
			
			try {
				createPaymentsService.createPayment(parameters,user)
				.then((data) => {
					let response = data;
					Logger.log(': Payments Creation promise resolved : ' + response);
					resolve(response);
				})
				.catch((error) => {
					Logger.log("Error thrown while creating payment " + error);
					resolve("Unable to create payment for user - " + user);
				})
			} catch (exception) {
				Logger.log("Error thrown while creating payment " + exception);
				resolve("Unable to create payment for user - " + user);
			}
			
			
        });
		
		
		
		
    }
}



