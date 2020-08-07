import { FormAttributes } from '@twilio/flex-webchat-ui';

const preEngagementConfig: FormAttributes = {
    description: 'Velkommen til Intility Chat',
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
