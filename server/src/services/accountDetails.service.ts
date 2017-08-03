'use strict';
import * as _ from "lodash";
import { PromisedIO } from '../support/promisified-io';

export class AccountDetailsService { 
    	
	getAccountDetails = (paramAccount: any,  userId: any): any => {
		
		const ACCOUNTS_URL = 'http://localhost:3000/accounts'; 
		
		return new Promise((resolve, reject) => {
			PromisedIO.httpGetRequest(ACCOUNTS_URL + "?user_id=" + userId)
				.then((data) => {
					let accountDetails = '';
					
					if (paramAccount !== '') { 
						let userAccounts = JSON.parse(data);
										
						if(userAccounts && userAccounts.length > 0) { 
							let matchedAccountObject = _.find(userAccounts, (account) => {
								if(account) {
									return account.account_number === paramAccount||
									account.account_overview.nickName === paramAccount ||
									account.account_overview.title === paramAccount;
								}
							});
							
							if (matchedAccountObject) {
								resolve(matchedAccountObject);
							} else {
								reject('No such account exists, please try again');
							}
						} else {
							reject('No account exists for user ' + userId);
						}

					} else {
						reject('Please enter valid account number or nickname');
					}
					 
				}).catch((error) => {
					reject('Unable to fetch account details at this time, please try again letter');
				});
        });
			
	}
	
}
 



