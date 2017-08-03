'use strict';
import { CommandHandler } from '../commandHandler';

export interface Handler {
    command: string;
    handlerName: string;
    
    init(commandHandler: CommandHandler): void;
    handleRequest(user: string, parameters: any): any;
}