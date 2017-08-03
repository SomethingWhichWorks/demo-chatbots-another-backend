import * as express from "express";
import * as bodyParser from "body-parser";
import * as _ from "lodash";
import http = require("http");
import https = require("https");
import fs = require('fs');
import { join } from "path";

import { Logger } from "./support/logger";

// Static Support variables
import { Configuration } from "./support/configuration";

// All the required Routers
import { ApiAiWebhookRouter } from './api-ai-webhook/api-ai-Webhook.router';
import { FacebookWebhookRouter } from './facebook-webhook/facebookWebhook.router';

// Command Handler to handle all command
import { CommandHandler } from "./handler/commandHandler";

// All the handler from the application
import { GenericHandler } from "./handler/impl/generic.handler";
import { BranchFAQHandler } from "./handler/impl/branchFAQ.handler";
import { BankOperationsFAQHandler } from "./handler/impl/bankOperationsFAQ.handler";
import { TransactionsHistoryHandler } from "./handler/impl/transactionsHistory.handler";
import { TransactionDetailsHandler } from "./handler/impl/transactionDetails.handler";
import { AccountListHandler } from "./handler/impl/accountList.handler";
import { AccountDetailsHandler } from "./handler/impl/accountDetails.handler";
import { BeneficiariesHandler } from "./handler/impl/beneficiaries.handler";
import { WeatherHandler } from "./handler/impl/weather.handler";
import { CreatePaymentsHandler } from "./handler/impl/createPayments.handler";

// loading Mock data
import { MockDataService } from "./data/mockData.service";


var app = express();
var router = express.Router();

app.use(bodyParser.json());   // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

try {
    //Init Configuration and regiuster all routers 
    Configuration.setupConfiguration()
        .then(() => {
            Logger.log('Configs loded now');
            // Add headers
            app.use(function (req, res, next) {
                // Website you wish to allow to connect
                res.setHeader('Access-Control-Allow-Origin', '*');
                // Request headers you wish to allow
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                // Pass to next layer of middleware
                next();
            });

            app.use(function (req, res, next) {
                if (req.path.indexOf('api') !== -1) {
                    var logResp = {
                        'Time': Date.now(),
                        'request api': req.path,
                        'request method': req.method,
                        'request body': req.body,
                        'request paras': JSON.stringify(req.params)
                    };
                    Logger.log(JSON.stringify(logResp));
                }
                next();
            });

            /**
             * This thing will remain here, I am sure 
             */

            app.use(express.static(__dirname));
            app.use('/', express.static(join(__dirname, '../', 'dist')));

            var port = process.env.PORT || 8080;

            // middleware that is specific to this router
            router.use(function (req, res, next) {
                var logResp = {
                    'Time': Date.now(),
                    'request api': req.path,
                    'request method': req.method,
                    'request body': req.body,
                    'request paras': JSON.stringify(req.params)
                };
                Logger.log(JSON.stringify(logResp));
                next();
            });

            //Initialzing Mock Data 
            MockDataService.init();

            //We will use same handler for all requests
            let commandHandler = new CommandHandler();

            //Register the handler with commandHandler, check init method in handlers
            let genericHandler = new GenericHandler();
            genericHandler.init(commandHandler);

            let branchFAQHandler = new BranchFAQHandler();
            branchFAQHandler.init(commandHandler);

            let bankOperationsFAQHandler = new BankOperationsFAQHandler();
            bankOperationsFAQHandler.init(commandHandler);

			let transactionsHistoryHandler = new TransactionsHistoryHandler();
            transactionsHistoryHandler.init(commandHandler);
			
			let transactionDetailsHandler = new TransactionDetailsHandler();
            transactionDetailsHandler.init(commandHandler);

            let accountListHandler = new AccountListHandler();
            accountListHandler.init(commandHandler);

            let accountDetailsHandler = new AccountDetailsHandler();
            accountDetailsHandler.init(commandHandler);

            let beneficiariesHandler = new BeneficiariesHandler();
            beneficiariesHandler.init(commandHandler);

            let weatherHandler = new WeatherHandler();
            weatherHandler.init(commandHandler);

            let createPaymentsHandler = new CreatePaymentsHandler();
            createPaymentsHandler.init(commandHandler);


            // Passing CommandHandler to all routers
            var apiAiWebhookRouter = new ApiAiWebhookRouter();
            apiAiWebhookRouter.init(app, commandHandler);



            // Added routers            
            app.get('/', router);

            //starting and listening http server
            app.listen(Configuration.httpPort, () => {
                Logger.log("Server is listening on http port " + Configuration.httpPort);
            });

        })
        .catch((err) => {
            showError(err);
            process.exit();
        });
} catch (err) {
    Logger.log('Error thown: ' + err);
}

function showError(error) {
    Logger.log('Unable to start the server, please check the configurations and try again');
    Logger.log('Really sorry for that, something went wrong....');
    Logger.log(error);
}


