import { Manager, Actions } from '@twilio/flex-webchat-ui';

const initActions = (manager: Manager) => {
    Actions.registerAction('customSetInputText', async ({ body }) => {
        const channelSid = Object.keys(manager.store.getState().flex.chat.channels)[0];

        if (channelSid) {
            await Actions.invokeAction('SetInputText', { channelSid, body });
        }
    });

    Actions.registerAction('customSendMessage', async ({ body }) => {
        const channelSid = Object.keys(manager.store.getState().flex.chat.channels)[0];

        if (channelSid) {
            await Actions.invokeAction('SendMessage', { channelSid, body });
        }
    });

    Actions.registerAction('hasUserReadLastMessage', async () => {
        const channelSid = Object.keys(manager.store.getState().flex.chat.channels)[0];
        const channel = manager.store.getState().flex.chat.channels[channelSid];

        if (channelSid) {
            const lastRecievedMessageIndex = channel.lastConsumedMessageIndex;
            const lastReadMessageIndex = channel.lastConsumedMessageByCurrentUserIndex;
            return lastReadMessageIndex === lastRecievedMessageIndex;
        }
    });

    Actions.addListener('NotificationManager#notificationAdded', (e) => {
        console.log('Notification added -> ', e);
    });
};

export default initActions;
