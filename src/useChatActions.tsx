import * as Flex from '@twilio/flex-webchat-ui';

const useChatActions = () => {
    const setInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSetInputText', { body });
    const setAndSendInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSendMessage', { body });
    const toggleChatVisibility = () => Flex.Actions.invokeAction('ToggleChatVisibility');
    const hasUserReadLastMessage = () => Flex.Actions.invokeAction('hasUserReadLastMessage');

    return {
        setInputFieldContent,
        setAndSendInputFieldContent,
        toggleChatVisibility,
        hasUserReadLastMessage,
    };
};

export default useChatActions;
