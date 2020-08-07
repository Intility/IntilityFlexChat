import { FormAttributes } from '@twilio/flex-webchat-ui';

const preEngagementConfig: FormAttributes = {
    description: 'Velkommen til Intility Chat',
    message:
        'Vennligst beskriv problemet du opplever, slik at vi kan sette deg i kontakt med den rette agenten med best erfaring i emnet.',
    submitLabel: 'Submit',
    fields: [
        {
            label: 'Please describe your issue',
            type: 'TextareaItem',
            attributes: {
                name: 'question',
                type: 'text',
                placeholder: 'Type your question here',
                required: true,
                rows: 5,
            },
        },
    ],
};

export default preEngagementConfig;
