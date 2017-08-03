'use strict';
import { PromisedIO } from "./promisified-io";
import { join } from "path";

export class Configuration {

    static apiAiAccessToken: string;
    static httpPort: string;
    static httpsPort: string;

    static async setupConfiguration() {
        return new Promise((resolve, reject) => {
            PromisedIO.readFile(join(__dirname, '../', 'config.json'))
                .then((configFile) => {
                    var configFileJson = JSON.parse(configFile);
                    Configuration.apiAiAccessToken = process.env.APIAI_ACCESS_TOKEN || configFileJson.APIAI_ACCESS_TOKEN;

                    Configuration.httpPort = process.env.PORT || configFileJson.http_port;

                    Configuration.httpsPort = process.env.https_port || configFileJson.https_port;

                    resolve();
                }, err => {
                    console.log('Something wrong with config file, please check \'config.json\' configuration');
                    reject();
                })
        });

    }


}

