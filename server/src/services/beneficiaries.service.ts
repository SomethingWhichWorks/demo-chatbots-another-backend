'use strict';
import * as _ from "lodash";
import { Logger } from '../support/logger';
import { PromisedIO } from '../support/promisified-io';

export class BeneficiariesService { 

	getBeneficiariesForUser = (userId: any): any => {
		
		const BENEFICIARIES_URL = 'http://localhost:3000/beneficiaries';				
		
		return new Promise((resolve, reject) => {
                PromisedIO.httpGetRequest(BENEFICIARIES_URL + "?user_id=" + userId)
                    .then((data) => {
					let response = '';
                        let filteredBeneficiaries = JSON.parse(data);
						if(filteredBeneficiaries && filteredBeneficiaries.length > 0){
							resolve(filteredBeneficiaries);
						} else {
							resolve('No beneficiaries exist for user - ' + userId);
						}
                    }).catch((error) => {
						resolve('unable to fetch beneficiaries at this time, please try again letter');
                    });
            });
	}
}



