import { FormAttributes } from '@twilio/flex-webchat-ui';

const preEngagementConfig = (message: string): FormAttributes => ({
    description: 'Velkommen til Intility Chat',
    message,
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
        },
    ],
});

export default preEngagementConfig;
