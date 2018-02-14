import { Score } from 'Schema/Music';

export abstract class Parser {
    static parse(fileContent: string): Score {
        throw new Error('override me');
    }
}