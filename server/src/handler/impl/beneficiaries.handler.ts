'use strict';
import * as _ from "lodash";
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { BeneficiariesService } from '../../services/beneficiaries.service';
import { BeneficiariesHtmlUtils } from '../html-utils/BeneficiariesHtmlUtils';



export class BeneficiariesHandler implements Handler {
    command: string = 'command.beneficiaries.list';
    handlerName: string = 'BeneficiariesHandler';


    init(commandHandler: CommandHandler) {
        commandHandler.register(this.command, this);
    }

    handleRequest(user: string, parameters: any): any {

        let beneficiariesService: BeneficiariesService = new BeneficiariesService();

        Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
        Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));

        return new Promise((resolve, reject) => {
            try {
                beneficiariesService.getBeneficiariesForUser(user)
                    .then((data) => {
                        Logger.log(this.handlerName + ': promise resolved : ' + data);
                        resolve(BeneficiariesHtmlUtils.buildResponse(parameters['channel'], data));
                    })
                    .catch((error) => {
                        Logger.log(this.handlerName + ': promise rejected : ' + error);
                        resolve("Unable to fetch Beneficiaries data for user - " + user);
                    })
            } catch (ex) {
                resolve("Unable to fetch Beneficiaries data for user - " + user);
            }
        });
    }
}



