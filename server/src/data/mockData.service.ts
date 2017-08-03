'use strict';
import { PromisedIO } from "../support/promisified-io";
import { join } from "path";
import { Logger } from "../support/logger";
import { ApiAiService } from '../api-ai-webhook/api-ai.service';

const MockDataServiceName = 'MockDataService : ';
export class MockDataService {
    static branchData = [];
    static bankOperationsData = [];
    static userData = {
        accounts: [],
        transactions: [],
        cards: [],
        beneficiaries: []
    }

    //Loading data from /data directory, add all here
    static init() {
        
        //branch Data
        MockDataService.populdateData(MockDataService.createFullPath('branchData.json'))
            .then((data) => {
                MockDataService.branchData = data;
                Logger.log(MockDataServiceName + 'content of file:' + JSON.stringify(data));
            }).catch((error) => { 
                Logger.error(MockDataServiceName + "Unable to load data from mock file:  branchData.json");
            });

        //ank operation hours Data
        MockDataService.populdateData(MockDataService.createFullPath('bankOperationsData.json'))
            .then((data) => {
                MockDataService.bankOperationsData = data;
                Logger.log(MockDataServiceName + 'content of file:' + JSON.stringify(data));
            }).catch((error) => { 
                 Logger.error(MockDataServiceName + "Unable to load data from mock file:  bankOperationsData.json");
            });

        //Accounts Data
        MockDataService.populdateData(MockDataService.createFullPath('accountsData.json'))
            .then((data) => {
                MockDataService.userData.accounts = data;
                Logger.log(MockDataServiceName + 'content of file:' + JSON.stringify(data));

            }).catch((error) => {
                Logger.error(MockDataServiceName + "Unable to load data from mock file:  accountsData.json");
             });

        //transactions Data            
        MockDataService.populdateData(MockDataService.createFullPath('transactionData.json'))
            .then((data) => {
                MockDataService.userData.transactions = data;
                Logger.log(MockDataServiceName + 'content of file:' + JSON.stringify(data));
            }).catch((error) => {
                Logger.error(MockDataServiceName + "Unable to load data from mock file:  transactionData.json");
             });

        //cards Data
        MockDataService.populdateData(MockDataService.createFullPath('cardsData.json'))
            .then((data) => {
                MockDataService.userData.cards = data;
                Logger.log(MockDataServiceName + 'content of file:' + JSON.stringify(data));
            }).catch((error) => { 
                 Logger.error(MockDataServiceName + "Unable to load data from mock file:  cardsData.json");
             });

              //cards Data
        MockDataService.populdateData(MockDataService.createFullPath('beneficiariesData.json'))
            .then((data) => {
                MockDataService.userData.beneficiaries = data;
                Logger.log(MockDataServiceName + 'content of file:' + JSON.stringify(data));
            }).catch((error) => { 
                 Logger.error(MockDataServiceName + "Unable to load data from mock file:  cardsData.json");
             });
    }

    // Generic method to populate data
    static populdateData = (filePath: string): any => {
        return new Promise((resolve, reject) => {
            var objectToPopulate = [];
            PromisedIO.readFile(filePath)
                .then((data) => {
                    objectToPopulate = JSON.parse(data);
                    Logger.log(MockDataServiceName + 'Loaded mock data from file: ' + filePath);
                    resolve(objectToPopulate);
                })
                .catch((error) => {
                    Logger.log(MockDataServiceName + 'Unable to laod data from' + filePath + ', error is : ' + error);
                    resolve(objectToPopulate);
                });
        });

    }

    // Simple util function
    private static createFullPath = (fileName: string): string => {
        return join(__dirname, '../data/mockdata/', fileName);
    }
}

