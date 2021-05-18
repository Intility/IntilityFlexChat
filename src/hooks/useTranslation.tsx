import axios, { AxiosResponse } from 'axios';
import { TranslateResponse, TranslateRequest } from '../interfaces/Translate';

interface UseTranslation {
    detectLanguageAsync: (text: string) => Promise<AxiosResponse<any>>;
    translateTextAsync: (text: string, to: string | string[]) => Promise<AxiosResponse<TranslateResponse[]>>
}

const useTranslation = (): UseTranslation => {
    const { REACT_APP_AZURE_TRANSLATOR_KEY } = process.env;
    const instance = axios.create({
        baseURL: 'https://api.cognitive.microsofttranslator.com',
        params: {
            'api-version': '3.0',
        },
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': REACT_APP_AZURE_TRANSLATOR_KEY,
            'Ocp-Apim-Subscription-Region': 'westeurope',
        },
    });

    const detectLanguageAsync = (text: string) => instance.post('/detect', [{ text }]);

    const translateTextAsync = (text: string, to: string | string[]) =>
        instance.post<TranslateRequest[], AxiosResponse<TranslateResponse[]>>(
            `/translate`,
            [{ text }],
            {
                params: {
                    ...instance.defaults.params,
                    to: to instanceof Array ? to.join(',') : to,
                },
            },
        );

    return { detectLanguageAsync, translateTextAsync };
};

export default useTranslation;
