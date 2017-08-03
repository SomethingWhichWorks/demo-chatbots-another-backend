'use strict';

export class BooleanSpeechHelper {
    static getResponseForBoolean = (booleanResponse: boolean) => {
        if(booleanResponse) {
            return "Yes";
        } else {
            return "No"
        }
    }
}