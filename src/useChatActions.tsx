import * as Flex from '@twilio/flex-webchat-ui';
import { Notifications, NotificationIds, StateHelper, ChatChannelHelper } from '@twilio/flex-ui';

const useChatActions = () => {
    const setInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSetInputText', { body });
    const setAndSendInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSendMessage', { body });
    const toggleChatVisibility = () => Flex.Actions.invokeAction('ToggleChatVisibility');

    const getChatNotificationStatus = (task) => {
        const channelState = StateHelper.getChatChannelStateForTask(task);
        const chatChannelHelper = new ChatChannelHelper(channelState);

        Notifications.showNotification(NotificationIds.NewChatMessage, {
            lastMessage: chatChannelHelper.lastMessage,
        });
    };

    return {
        setInputFieldContent,
        setAndSendInputFieldContent,
        toggleChatVisibility,
    };
};

export default useChatActions;
