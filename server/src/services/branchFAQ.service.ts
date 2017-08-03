'use strict';
import * as _ from "lodash";
import { PromisedIO } from '../support/promisified-io';


export class BranchFAQService {

	getBranchFAQResponse = (params: any, userId: any): any => {
		return new Promise((resolve, reject) => {

			const BRANCH_FAQ_URL = 'http://localhost:3000/branches';

			PromisedIO.httpGetRequest(BRANCH_FAQ_URL)
				.then((data) => {
					let response = '';
					let branchFAQResponse = '';

					// There is scope to change this into chain operation of lodash, need to explore further
					let branchesInCity = _.find(JSON.parse(data), (branchDetails) => {
						return branchDetails.city === params["geo-city"];
					});
					resolve(branchesInCity);

				}).catch((error) => {
					reject(error);
				});
		});
	}
}

