import { FormAttributes } from '@twilio/flex-webchat-ui';

const categories: string[] = ['test', 'test2', 'test3'];

const preEngagementConfig: FormAttributes = {
    description: 'Please provide some information about your request',
    message: 'This is a message',
    submitLabel: 'Submit',
    fields: [
        {
            label: 'Category',
            type: 'SelectItem',
            attributes: {
                name: 'category',
                required: true,
                readOnly: false,
            },
            options: categories.map((cat) => ({
                value: cat,
                label: cat,
                selected: false,
            })),
        },
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
