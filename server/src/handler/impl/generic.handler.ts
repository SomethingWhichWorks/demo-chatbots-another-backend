'use strict';
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';


export class GenericHandler implements Handler {
    command: string = 'command.generic';
    handlerName: string = 'GenericHandler';

    init(commandHandler: CommandHandler) {
        commandHandler.register(this.command, this);
    }

    handleRequest(user: string, parameters: any): any {

        return new Promise((resolve, reject) => {
            resolve("Could you please repeat again");
        });
    }
}