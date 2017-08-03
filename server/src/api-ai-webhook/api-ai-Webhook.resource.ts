'use strict';
import * as _ from "lodash";
import { Configuration } from "../support/configuration";
import { CommandHandler } from "../handler/commandHandler";
import { ApiAiService } from "./api-ai.service";
import { Logger } from "../support/logger";
import { Handler } from "../handler/impl/handler";

const ApiAiWebhookResourceName = 'ApiAiWebhookResource :';

export class ApiAiWebhookResource {

    commandHandler: CommandHandler;
    apiAiService: ApiAiService;

    constructor(commandHandler: CommandHandler) {
        this.commandHandler = commandHandler;
        this.apiAiService = new ApiAiService();
    }

    healthcheck(req, res) {
        console.log('Api AI Webhook needed for all apps');
        return res.status(200).json({ message: 'Api Ai chatbot webhook API Healthcheck Successful' });
    }

    getResponseForWebhook = (req, res) => {

        var requestObject = req.body;
        Logger.log("Request Object Received from ML Engine " + JSON.stringify(requestObject));
        let responseObject = requestObject.fulfillment;
        var responseMessage = '';

        //If the actionInComplete = true -> there are subsequent flows setup on ML
        //Or some mandatory paramters missing, so additional questions follow
        this.commandHandler.handleCommand(requestObject)
            .then((responseData) => {
                this.sendResponse(res, responseData);
            })
            .catch((error) => {
                this.sendResponse(res, error);
            });
    }

    sendResponse = (res, response) => {
        var responseMessage;
        if (typeof response === 'object') {
            responseMessage = JSON.stringify(response);
        } else {
            responseMessage = response;
        }

        return res.status(200).json({
            responseMessage: responseMessage
        });
    }

} 