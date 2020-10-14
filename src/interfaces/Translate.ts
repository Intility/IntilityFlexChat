export type AvailableLanguages = 'nb' | 'en' | 'original';

export interface TranslateRequest {
    text: string;
}

export interface TranslateResponse {
    detectedLanguage: DetectedLanguage;
    translations: Translations[];
}

interface DetectedLanguage {
    language: string;
    score: number;
}

interface Translations {
    text: string;
    to: string;
}
