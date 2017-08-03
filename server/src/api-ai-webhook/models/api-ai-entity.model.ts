'use strict';


export class ApiAiEntityModel {
    sessionId: string = '';
    name: string = '';
    entries: Entry[] = [];

    constructor(sessionId, name, entries) {
        this.sessionId = sessionId;
        this.name = name;
        this.entries = entries;
    }

    getApiAiModelObject = () => {
        return {
            sessionId: this.sessionId,
            entities: [
                {
                    name: this.name,
                    entries: this.entries
                }
            ]

        };
    }
}

export class Entry {
    constructor(value, synonums) {
        this.value = value;
        this.synonyms = synonums;
    }

    value: string = '';
    synonyms: string[];
}

