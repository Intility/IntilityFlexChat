import * as Flex from '@twilio/flex-webchat-ui';

export type UseChatActionsFuncs = {
    setInputFieldContent: (body: string) => Promise<unknown>;
    setAndSendInputFieldContent: (body: string) => Promise<unknown>;
    toggleChatVisibility: () => Promise<unknown>;
    hasUserReadLastMessage: () => Promise<boolean>;
    isChatOpen: () => Promise<boolean>;
};

const useChatActions = (): UseChatActionsFuncs => {
    /**
     * Sets the value of the input field to the given value.
     *
     * Use `setAndSendInputFieldContent` to automatially send the given message.
     *
     * @param {string} body the text to insert
     */
    const setInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSetInputText', { body });

    /**
     * Sets the value of the input field to the given value and sends the message.
     *
     * @param {string} body the text to send
     */
    const setAndSendInputFieldContent = (body: string) =>
        Flex.Actions.invokeAction('customSendMessage', { body });

    /**
     * Toggle the chat between minified and expanded state
     *
     */
    const toggleChatVisibility = () => Flex.Actions.invokeAction('ToggleChatVisibility');

    /**
     * Retunrs if the user has read last message sent from agent.
     *
     */
    const hasUserReadLastMessage = () => Flex.Actions.invokeAction('hasUserReadLastMessage');

    /**
     * Returns if the chat is in its expanded state
     *
     */
    const isChatOpen = () => Flex.Actions.invokeAction('isChatOpen');

    return {
        setInputFieldContent,
        setAndSendInputFieldContent,
        toggleChatVisibility,
        hasUserReadLastMessage,
        isChatOpen,
    };
};

export default useChatActions;
