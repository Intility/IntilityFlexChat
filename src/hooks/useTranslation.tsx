import axios, { AxiosResponse } from 'axios';
import { TranslateResponse, TranslateRequest } from '../interfaces/Translate';
import { v4 as uuidv4 } from 'uuid';

const useTranslation = () => {
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

    const detectLanguage = (text: string) =>
        instance.post('/detect', [{ text }], {
            headers: {
                ...instance.defaults.headers,
                'X-ClientTraceId': uuidv4(),
            },
        });

    const translateText = (text: string, to: string | string[]) =>
        instance.post<TranslateRequest[], AxiosResponse<TranslateResponse[]>>(
            `/translate`,
            [{ text }],
            {
                headers: {
                    ...instance.defaults.headers,
                    'X-ClientTraceId': uuidv4(),
                },
                params: {
                    ...instance.defaults.params,
                    to: to instanceof Array ? to.join(',') : to,
                },
            },
        );

    return { detectLanguage, translateText };
};

export default useTranslation;
