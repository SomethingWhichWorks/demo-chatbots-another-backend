'use strict';
import * as _ from "lodash";
import { AccountsHtmlUtils } from './html-utils/AccountsHtmlUtils';
import { PromisedIO } from '../support/promisified-io';

export class AccountListService {
      
	 getAccountListForUser = (userId: any): any => {
		 const ACCOUNTS_URL = 'http://localhost:3000/accounts'; 
		 
		 return new Promise((resolve, reject) => {
                PromisedIO.httpGetRequest(ACCOUNTS_URL  + "?user_id=" + userId)
                    .then((data) => {
						let userAccounts = JSON.parse(data);
						if(userAccounts && userAccounts.length > 0) {
							resolve(userAccounts);
						} else {
							reject('No account exist for user - ' + userId);
						}						
                    }).catch((error) => {
						reject('Unable to fetch accounts at this time, please try again letter');
                    });
            });
		
	 }
}



