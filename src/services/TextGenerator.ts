export interface ImportedData {
    id: number;
    word: string;
}

interface Params {
    hasDictionaryDef?: boolean;
    minCorpusCount?: number;
    maxCorpusCount?: number;
    minDictionaryCount?: number;
    maxDictionaryCount?: number;
    minLength?: number;
    maxLength?: number;
    limit?: number;
    [name: string]: any;
}

export default class TextGenerator {
    public generate() {
        const xhr = new XMLHttpRequest();
        const url = 'http://api.wordnik.com:80/v4/words.json/randomWords?';
        const params: Params = {
            hasDictionaryDef: false,
            minCorpusCount: 0,
            maxCorpusCount: -1,
            minDictionaryCount: 1,
            maxDictionaryCount: -1,
            minLength: 5,
            maxLength: -1,
            limit: 10,
            api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        };

        const urn = Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&');

        return new Promise<string[]>((res, rej) => {
            xhr.addEventListener('load', () => {
                const response: ImportedData[] = JSON.parse(xhr.response);
                res(response.map(data => data.word));
            });

            xhr.addEventListener('error', err => console.error(err));
            xhr.addEventListener('timeout', err => console.error(err));
            xhr.addEventListener('abort', err => console.error(err));
            xhr.open('GET', url + urn);
            xhr.send();
        });
    }
}
