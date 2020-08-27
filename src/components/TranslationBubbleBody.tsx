import React, { useEffect, useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { TranslateResponse } from '../interfaces/Translate';
import '../styles/TranslationBubbleBody.css';

interface TranslationBubbleBodyProps {
    key: string;
    message?: any;
    perferredLanguage: string;
}

const TranslationBubbleBody: React.FC<TranslationBubbleBodyProps> = (props) => {
    const { message, perferredLanguage } = props;
    const { translateText } = useTranslation();

    const [translatedText, setTranslatedText] = useState<undefined | TranslateResponse>();
    const [currentTranslation, setCurrentTranslation] = useState<string>('en');

    const textBoxStyle: React.CSSProperties = {
        padding: '0 12px 5px 12px',
        marginTop: '3px',
        marginBottom: '0px',
        fontSize: '13px',
        lineHeight: '1.54',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
    };

    const textStyle: React.CSSProperties = {
        marginTop: '0',
        marginBottom: '0',
    };

    // Update default translation language with users perferred language
    useEffect(() => {
        const shortenedLangugeCode = perferredLanguage.split('-')[0];
        setCurrentTranslation(shortenedLangugeCode);
    }, [perferredLanguage]);

    // Make request to translate text
    useEffect(() => {
        // message.index is populated for messages sent in chat.
        if (!message.isFromMe && message.index) {
            const shortenedLangugeCode = perferredLanguage.split('-')[0];

            if (message?.source?.state?.body) {
                translateText(message.source.state.body, [shortenedLangugeCode, 'en'])
                    .then((respose) => setTranslatedText(respose.data[0]))
                    .catch((err) => console.error('Translation error:', err));
            }

            if (message?.source?.body) {
                translateText(message.source.body, [shortenedLangugeCode, 'en'])
                    .then((respose) => setTranslatedText(respose.data[0]))
                    .catch((err) => console.error('Translation error:', err));
            }
        }
    }, [message, perferredLanguage]);

    /*
        Orger by translation
        1. Users perferred language
        2. English
        3. Original message
    */
    const nextTranslation = () => {
        switch (currentTranslation) {
            case 'en':
                return 'original';
            case 'original':
                return perferredLanguage.split('-')[0];
            default:
                return 'en';
        }
    };

    // Get translated text from response object
    const getTranslation = () =>
        translatedText?.translations.find((t) => t.to === currentTranslation);

    const toggleTranslation = () => setCurrentTranslation(nextTranslation);

    return (
        <div style={textBoxStyle}>
            <p style={textStyle}>
                {getTranslation()?.text || message?.source?.state?.body || message?.source?.body}
            </p>
            {!message.isFromMe && (message?.source?.state || message?.source?.body) && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        marginTop: '5px',
                    }}
                >
                    <button className="showTranslation__button" onClick={toggleTranslation}>
                        {currentTranslation === 'en' ? 'Show Original' : `Show Translation`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TranslationBubbleBody;
