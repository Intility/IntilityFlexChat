import { FormAttributes } from '@twilio/flex-webchat-ui';
import { generateLanguages, languageNameFromCode } from '../../assets/translationLanguages';

const preEngagementConfig = (
    enableTranslation: boolean,
    message: string,
    preferredLanguage: string,
): FormAttributes => ({
    description: 'Velkommen til Intility Chat',
    message,
    submitLabel: 'Start Chat',
    fields: [
        enableTranslation && !preferredLanguage.includes('-NO')
            ? {
                label: `We will translate your chat to english. Please select what language we will translate from. Your registred language is: ${languageNameFromCode(
                    preferredLanguage,
                )}`,
                type: 'SelectItem',
                attributes: {
                    name: 'chosenLanguage',
                    required: true,
                    readOnly: false,
                },
                options: generateLanguages(preferredLanguage),
            }
            : {
                label: 'Please describe your issue',
                type: 'InputItem',
                attributes: {
                    name: 'question',
                    type: 'text',
                    placeholder: 'Type your issue here',
                    required: false,
                },
            },
    ],
});

export default preEngagementConfig;
