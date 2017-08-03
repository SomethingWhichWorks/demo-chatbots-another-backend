'use strict';
import * as _ from "lodash";
import { BooleanSpeechHelper } from "./BooleanSpeechHelper";

export class AccountsHtmlUtils {

    static buildAccountListResponse(channel: string, accounts: any) {
        switch (channel) {
            case "web":
                return AccountsHtmlUtils.buildAccountListResponseForWebChannel(accounts);
            case "mobile":
                return AccountsHtmlUtils.buildAccountListResponseForOtherChannels(accounts);
            default:
                return AccountsHtmlUtils.buildAccountListResponseForOtherChannels(accounts);
        }
    }

    static buildAccountDetailsResponse(channel: string, account: any) {
        let node ="Nick Name of Account :" + account.account_overview.nickName + '\n';
        node = node + "Favorite Account :" + BooleanSpeechHelper.getResponseForBoolean(account.account_overview.favorite)+ '\n';
        node = node + "Account Title:" + account.account_overview.title+ '\n';
        node = node + "account_number:" + account.display_account_number+ '\n';
        node = node + "iban:" + account.iban+ '\n';
        node = node + "booked_balance:" + account.booked_balance+ '\n';
        node = node + "currency:" + account.currency;

        return node;
    }

    // Build HTML Response only for Web Channel 
    static buildAccountListResponseForOtherChannels = (accounts) => {
        let response = '';
        _.each(accounts, (account) => {
            if (account) {
                let node = '';
                node = node + "Nick Name of Account :" + account.account_overview.nickName + '\n';
                node = node + "Favorite Account :" + BooleanSpeechHelper.getResponseForBoolean(account.account_overview.favorite) + '\n';
                node = node + "Account Title:" + account.account_overview.title + '\n';
                node = node + "account_number:" + account.display_account_number + '\n';
                node = node + "iban:" + account.iban + '\n';
                node = node + "booked_balance:" + account.booked_balance + '\n';
                node = node + "currency:" + account.currency + '\n';
                response = response + node + '\n\n';
            }
        });

        if (response) {
            return response;
        } else {
            return 'User does not have any account';
        }
    }


    // Build HTML Response only for Web Channel 
    static buildAccountListResponseForWebChannel = (accounts) => {
        let response = '';
        _.each(accounts, (account) => {
            if (account) {
                let node = '';
                node = node + "<div> Nick Name of Account :" + account.account_overview.nickName + "</div>";
                node = node + "<div> Favorite Account :" + BooleanSpeechHelper.getResponseForBoolean(account.account_overview.favorite) + "</div>";
                node = node + "<div> Account Title:" + account.account_overview.title + "</div>";
                node = node + "<div> account_number:" + account.display_account_number + "</div>";
                node = node + "<div> iban:" + account.iban + "</div>";
                node = node + "<div> booked_balance:" + account.booked_balance + "</div>";
                node = node + "<div> currency:" + account.currency + "</div>";
                response = response + node + '<br />';
            }
        });
        if (response) {
            return '<div>' + response + '</div>';
        } else {
            return 'User does not have any account';
        }
    }

}