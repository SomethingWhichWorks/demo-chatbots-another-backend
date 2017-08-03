'use strict';

export class Logger {

    static debug(message: any): void {
        console.log(message);    
    }

    static error(message: any): void {
        console.error(message);    
    }

    static info(message: any): void {
        console.info(message);    
    }

     static log(message: any): void {
       Logger.debug(message);    
    }

}