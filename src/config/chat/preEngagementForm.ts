import { FormAttributes } from '@twilio/flex-webchat-ui';

// @ts-expect-error
const languageNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'language' });

const preEngagementConfig = (
    enableTranslation: boolean,
    message: string,
    preferredLanguage: string,
): FormAttributes => ({
    description: 'Velkommen til Intility Chat',
    message: enableTranslation 
        ? `Your registred language is: ${languageNamesInEnglish.of(preferredLanguage)}. We will translate your messages to English, and the agents message will be translated to your language.` 
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
