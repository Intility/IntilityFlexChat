import * as Flex from '@twilio/flex-webchat-ui';

const useChatActions = () => {
    const setInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSetInputText', { body });
    const setAndSendInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSendMessage', { body });
    const minimizeChat = () => Flex.Actions.invokeAction('MinimizeChat');
    const toggleChatVisibility = () => Flex.Actions.invokeAction('ToggleChatVisibility');

    return {
        setInputFieldContent,
        setAndSendInputFieldContent,
        minimizeChat,
        toggleChatVisibility,
    };
};

export default useChatActions;
