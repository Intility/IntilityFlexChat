import { FormAttributes } from '@twilio/flex-webchat-ui';
import { generateLanguages, languageNameFromCode } from '../../assets/translationLanguages';

const preEngagementConfig = (
    enableTranslation: boolean,
    message: string,
    preferredLanguage: string,
): FormAttributes => ({
    description: 'Velkommen til Intility Chat',
    message: enableTranslation 
        ? `Your registred language is: ${languageNameFromCode(preferredLanguage)}. We will translate your messages to English, and the agents message will be translated to your language.` 
        : message,
    submitLabel: 'Start Chat',
    fields: [
        {
            label: 'Please describe your issue',
            type: 'InputItem',
            attributes: {
                name: 'question',
                type: 'text',
                placeholder: 'Type your issue here',
                required: false,
            },
        }   
    ],
});

export default preEngagementConfig;
