'use strict';
import * as _ from "lodash";
import { BooleanSpeechHelper } from "./BooleanSpeechHelper";

export class BeneficiariesHtmlUtils {

    static buildResponse(channel: string, beneficiaries: any) {
        switch (channel) {
            case "web":
                return BeneficiariesHtmlUtils.buildResponseForWebChannel(beneficiaries);
            case "mobile":
                return BeneficiariesHtmlUtils.buildResponseForOtherChannels(beneficiaries);
            default:
                return BeneficiariesHtmlUtils.buildResponseForOtherChannels(beneficiaries);
        }
    }

    //Response for Other channels 
    static buildResponseForOtherChannels = (beneficiaries) => {
        let response = '';
        _.each(beneficiaries, (beneficiary) => {
            if (beneficiary) {

                let node = '';
                node = node + "Nick Name of Beneficiary : " + beneficiary.beneficiary_overview.nickName + '\n';
                node = node + "Beneficiary Title: " + beneficiary.beneficiary_overview.title + '\n';
                node = node + "account_number: " + beneficiary.display_account_number + '\n';
                node = node + "iban: " + beneficiary.iban + '\n';

                response = response + node + '\n\n';
            }
        });

        if (response) {
            return response;
        } else {
            return 'No beneficiaries exists for user';
        }
    }


    //Response for Web Channel Only
    static buildResponseForWebChannel = (beneficiaries) => {
        let response = '';
        _.each(beneficiaries, (beneficiary) => {
            if (beneficiary) {
                let node = '';
                node = node + "<div><strong> Nick Name of Beneficiary :</strong> " + beneficiary.beneficiary_overview.nickName + "</div>";
                node = node + "<div><strong> Beneficiary Title:</strong> " + beneficiary.beneficiary_overview.title + "</div>";
                node = node + "<div><strong> account_number:</strong> " + beneficiary.display_account_number + "</div>";
                node = node + "<div><strong> iban:</strong> " + beneficiary.iban + "</div>";

                response = response + node + '<br />';
            }
        });

        if (response) {
            return '<div>' + response + '</div>';
        } else {
            return 'No beneficiaries exists for user';
        }
    }
}