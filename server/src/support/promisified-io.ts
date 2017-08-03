'use strict';

import * as fs from "fs";
import * as request from "request";
import * as http from "http";

export class PromisedIO {

    static httpGetRequest(uri: string, headers?: any) {
        return new Promise<any>((resolve, reject) => {
            var options = {
                url: uri,
                headers: {
                    "Content-Type": "application/json"
                }
            };
            
            if(headers) {
                options.headers = headers;
            }

            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                    console.log(response);
                    console.log(body);
                }

                else if (response.statusCode !== 200) {
                    reject(response.statusCode);
                }
                else {
                    resolve(body);
                }
            });

        });
    }

     static httpPostRequest(uri: string, formData: any) {
        return new Promise<any>((resolve, reject) => {
            request.post({
			url: uri, 
			json: true,
			headers: {
				"content-type": "application/json",
			},
			json : formData
			},
			(error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 201) {
                    reject(response.statusCode);
                }
                else {
                    resolve(body);
                }
            });

        });
    }
	
	static httpPutRequest(uri: string, formData: any) {
        return new Promise<any>((resolve, reject) => {
            request.put({
			url: uri, 
			json: true,
			headers: {
				"content-type": "application/json",
			},
			json : formData
			},
			(error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(response.statusCode);
                }
                else {
                    resolve(body);
                }
            });

        });
    }

    static readFile(fileName: string) {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(fileName, 'utf8', (error, data) => {
                if (error) {
                    console.log(error);
                    reject(error)
                } else {
                    resolve(data);
                }
            });
        });
    }

}



