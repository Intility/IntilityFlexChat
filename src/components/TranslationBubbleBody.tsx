import React, { useEffect, useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { TranslateResponse } from '../interfaces/Translate';
import '../styles/TranslationBubbleBody.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface TranslationBubbleBodyProps {
    key: string;
    message?: any;
    perferredLanguage: string;
}

const TranslationBubbleBody: React.FC<TranslationBubbleBodyProps> = ({
    message,
    perferredLanguage,
}) => {
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
        const shortenedLangugeCode = perferredLanguage.split('-')[0];
        if (!message.isFromMe) {
            if (message?.source?.state?.body) {
                translateText(message.source.state.body, [shortenedLangugeCode, 'en'])
                    .then((respose) => setTranslatedText(respose.data[0]))
                    .catch((err) => console.error('Translation error:', err));
            }
        }
    }, [message, perferredLanguage]);

    // Get translated text from response object
    const getTranslation = () =>
        translatedText?.translations.find((t) => t.to === currentTranslation);

    /*
        Orger by translation
        1. Users perferred language
        2. English
        3. Original message
    */
    const toggleTranslation = () => {
        switch (currentTranslation) {
            case 'en':
                return setCurrentTranslation('original');
            case 'original':
                return setCurrentTranslation(perferredLanguage.split('-')[0]);
            default:
                return setCurrentTranslation('en');
        }
    };

    return (
        <div style={textBoxStyle}>
            <p style={textStyle}>
                {getTranslation()?.text || message?.source?.state?.body || message?.source?.body}
            </p>
            {!message.isFromMe && message?.source?.state && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '5px',
                    }}
                >
                    <button className="showTranslation__button" onClick={toggleTranslation}>
                        {currentTranslation === 'en' ? 'Show Original' : 'Show Translation'}
                    </button>
                    <FontAwesomeIcon
                        id="icon"
                        aria-describedby="icon"
                        icon={faInfoCircle}
                        color="#969696"
                        title="Oversettelse skjer automatisk, feil kan forekomme"
                    />
                </div>
            )}
        </div>
    );
};

export default TranslationBubbleBody;
