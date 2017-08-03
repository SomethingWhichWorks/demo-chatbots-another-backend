'use strict';

import { Handler } from "./impl/handler";
import * as _ from "lodash";
import { Logger } from "../support/logger";
import { GenericHandler } from "./impl/generic.handler";

const CommandHandlerLogName = 'CommandHandler : ';

export class CommandHandler {

    listOfRegisteredHandler: CommandVsHandler[] = [];
    genericHandler: GenericHandler = new GenericHandler();

    register = (command: string, handlerFromRequest: Handler) => {
        if (command && handlerFromRequest) {
            Logger.debug(CommandHandlerLogName + 'loading handler: ' + handlerFromRequest.handlerName);

            let handler: Handler = this.getHandlerForCommand(command);

            if (!handler) {
                //handler = <typeof Handler>require(handler);
                let commandVsHandlerObject = new CommandVsHandler(command, handlerFromRequest);
                this.listOfRegisteredHandler.push(commandVsHandlerObject);

                Logger.debug(CommandHandlerLogName + 'registered handler: ' + handlerFromRequest.handlerName + ', with command: ' + command);
            } else {
                Logger.debug(CommandHandlerLogName + handlerFromRequest.handlerName + ', with command: ' + command + " is already registerd");
            }
        } else {
            Logger.debug(CommandHandlerLogName + command);
            Logger.debug(CommandHandlerLogName + handlerFromRequest);
            Logger.debug(CommandHandlerLogName + 'command, or hander are not correct');
        }
    }

    handleCommand(requestFromEngine: any): any {

        let command: string = requestFromEngine.intentName;

        let handler: Handler = this.getHandlerForCommand(command);
        var user = requestFromEngine.user;
        let parameters = this.generateParametersFromEntities(requestFromEngine.entities);

        //Adding the channel information into Parameters 
        let channelValue = requestFromEngine.channel;
        if(channelValue) {
            let entityName = 'channel';
            let entitiyValue = channelValue;
            parameters[entityName] = entitiyValue;
        }

        if (!handler) {
            Logger.debug(CommandHandlerLogName + 'No matching hnalder found, redirecting request to generic handler');
            return this.genericHandler.handleRequest(user, parameters);

        } else {
            Logger.debug(CommandHandlerLogName + 'Handler procesing the command: ' + handler.command);
            return handler.handleRequest(user, parameters);
        }
    }

    getHandlerForCommand(command: string): Handler {
        let matchedObject: CommandVsHandler = _.find(this.listOfRegisteredHandler, (handler) => {
            return handler.command === command;
        });

        if (matchedObject) {
            Logger.log(CommandHandlerLogName + 'matchedObject: ' + JSON.stringify(matchedObject));
            return matchedObject.getHandler();
        } else {
            return undefined;
        }
    }


    generateParametersFromEntities(entities): any {
        if (entities) {
            let parameters = {};
            _.each(entities, (entityObject) => {
                let entityName = entityObject.entity;
                let entitiyValue = entityObject.value;
                parameters[entityName] = entitiyValue;
            });
            return parameters;
        } else {
            return {};
        }
    }


}

class CommandVsHandler {
    command: string;
    handler: Handler;

    constructor(xcommand: string, xhandler: Handler) {
        this.command = xcommand;
        this.handler = xhandler;
    }

    setHandler = (xhandler: Handler): void => {
        this.handler = xhandler;
    }

    setCommand = (xcommand: string): void => {
        this.command = xcommand;
    }

    getHandler = (): Handler => {
        return this.handler;
    }

    getCommand = (): string => {
        return this.command;
    }
}