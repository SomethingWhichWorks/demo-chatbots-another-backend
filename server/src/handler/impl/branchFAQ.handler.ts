'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { BranchFAQService } from '../../services/branchFAQ.service';
import { BranchHtmlUtils } from '../html-utils/BranchHtmlUtils';


export class BranchFAQHandler implements Handler {
	command: string = 'command.branch.faq';
	handlerName: string = 'BranchFAQHandler';

	init(commandHandler: CommandHandler) {
		commandHandler.register(this.command, this);
	}

	handleRequest(user: string, parameters: any): any {

		return new Promise((resolve, reject) => {
			let branchFAQService: BranchFAQService = new BranchFAQService();
			try {
				branchFAQService.getBranchFAQResponse(parameters, user)
					.then((data) => {
						let response = '';
						Logger.log(': promise resolved : ' + response);

						if (data) {
							_.each(data.branches, (branchObject) => {
								response = response + BranchHtmlUtils.buildResponse(parameters['channel'], branchObject);
							});
						} else {
							response = "Unable to find branches in the city, please try again later";
						}
						resolve(response);
					})
					.catch((error) => {
						Logger.log(': promise rejected : ' + error);
						reject("Unable to fetch Bank Branch FAQ response data for user - " + user + ", error: " + error);
					})
			} catch (ex) {
				Logger.log("Unable to fetch Bank Branch FAQ response data for user - " + user);
				reject("Unable to fetch Bank Branch FAQ response data for user - " + user + ", error: " + ex);
			}

		});

	}
}

