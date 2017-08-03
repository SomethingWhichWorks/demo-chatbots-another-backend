'use strict';
import { ApiAiWebhookResource } from "./api-ai-Webhook.resource";
import { CommandHandler } from "../handler/commandHandler";

export class ApiAiWebhookRouter {
    app: any;
    commandHandler: CommandHandler;
    apiAiWebhookResource: ApiAiWebhookResource; 

    init = (app, commandHandler: CommandHandler) => {
        this.app = app;
        this.apiAiWebhookResource = new ApiAiWebhookResource(commandHandler);
        this.addRoutes();
    }

    addRoutes = () => {
        this.app.route('/api/chatbot/query')
            .head(this.apiAiWebhookResource.healthcheck)
            .post(this.apiAiWebhookResource.getResponseForWebhook); 
    }
}





