import React, { useEffect, useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { TranslateResponse } from '../interfaces/Translate';
import '../styles/TranslationBubbleBody.css';

interface TranslationBubbleBodyProps {
    key: string;
    message?: any;
    perferredLanguage: string;
    ref?: any;
}

const TranslationBubbleBody: React.FC<TranslationBubbleBodyProps> = (props) => {
    const { message, perferredLanguage } = props;
    const { translateTextAsync } = useTranslation();

    const [translatedText, setTranslatedText] = useState<undefined | TranslateResponse>();
    const [currentTranslation, setCurrentTranslation] = useState<string>('en');
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

            setIsLoading(true);

            if (message?.source?.body) {
                translateTextAsync(message.source.body, [shortenedLangugeCode, 'en'])
                    .then((respose) => setTranslatedText(respose.data[0]))
                    .catch((err) => console.error('Translation error:', err))
                    .finally(() => setIsLoading(false));
            } else if (message?.source?.state?.body) {
                translateTextAsync(message.source.state.body, [shortenedLangugeCode, 'en'])
                    .then((respose) => setTranslatedText(respose.data[0]))
                    .catch((err) => console.error('Translation error:', err))
                    .finally(() => setIsLoading(false));
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
                    {isLoading ? (
                        <button
                            disabled
                            className="showTranslation__button"
                            style={{ color: 'black' }}
                            onClick={toggleTranslation}
                        >
                            Loading Translation
                        </button>
                    ) : (
                        <button className="showTranslation__button" onClick={toggleTranslation}>
                            Show{' '}
                            {nextTranslation() === 'en'
                                ? `English`
                                : nextTranslation() === 'original'
                                ? 'Original'
                                : 'Translation'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TranslationBubbleBody;
