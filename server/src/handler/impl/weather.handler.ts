'use strict';
import { Handler } from './handler';
import { Logger } from '../../support/logger';
import { CommandHandler } from '../commandHandler';
import { PromisedIO } from '../../support/promisified-io';


export class WeatherHandler implements Handler {
    command: string = 'command.weather';
    handlerName: string = 'WeatherHandler';

    init(commandHandler: CommandHandler) {
        commandHandler.register(this.command, this);
    }

    handleRequest(user: string, parameters: any): any {
        Logger.log(this.handlerName + ': handling the request for command: ' + this.command);
        Logger.log(this.handlerName + ': request Params: ' + JSON.stringify(parameters));
        let date = new Date();

        if (parameters['geo-city'] !== '') {
            if (parameters['date'] !== '') {
                date = parameters['date']
            }

            //calling yahoo's weather api
            let sql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + parameters['geo-city'] + '")';
            let response = '';

            // ToDo : This can only be enabled if every handler is changed to return promise
            return new Promise((resolve, reject) => {
                PromisedIO.httpGetRequest('https://query.yahooapis.com/v1/public/yql?q=' + sql + '&format=json')
                    .then((data) => {
                        Logger.log(this.handlerName + ': Data received from weather API: ' + JSON.stringify(data));
                        var response = JSON.parse(data);
                        resolve('Weather is ' + response.query.results.channel.item.condition.text + ' on ' + date);
                    }).catch((error) => {
                        Logger.log(this.handlerName + ': error received from weather API: ' + JSON.stringify(error));
                        resolve('unable to fetch weather at this time, please try again letter');
                    });
            });
            //return 'Weather will be rainy in ' + parameters['geo-city']  + ' on ' + date;
        } else {
            return 'Can you repeat again, I am not able to understand';
        }
    }

}