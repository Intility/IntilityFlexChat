import React, { useState, useEffect } from 'react';
import {
    Manager,
    EntryPoint,
    MainHeader,
    MessagingCanvas,
    ContextProvider,
    RootContainer,
    MessageBubble,
    Actions,
} from '@twilio/flex-webchat-ui';
import chatConfigBase from '../config/chat/chatAppConfig';
import logo from '../assets/logo.png';
import FlexChatLoading from './FlexChatLoading';
import { ManagerState, FlexChatProps } from '../interfaces/FlexChat';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../assets/loader.svg';
import { version } from '../../package.json';

import '../styles/FlexChatError.css';
import '../styles/header.css';
import MessageBubbleHeader from './MessageBubbleHeader';
import initActions from '../config/chat/customActions';
import useChatActions from '../useChatActions';
import NotificationButton from './NotificationButton';
import Texts, { translateText } from '../assets/texts';

const defaultManagerState = {
    loading: false,
    manager: undefined,
    error: undefined,
};

const FlexChat: React.FC<FlexChatProps> = ({ config, isDarkMode, isDisabled = false }) => {
    const [managerState, setManagerState] = useState<ManagerState>(defaultManagerState);
    const { manager, loading, error } = managerState;
    const { flexFlowSid, flexAccountSid, user } = config;
    const isNorwegian = user.preferredLanguage?.includes('-NO');
    const { toggleChatVisibility } = useChatActions();

    useEffect(() => {
        if (!flexFlowSid) {
            throw new Error('Missing required flexFlowSid in config object');
        } else if (!flexAccountSid) {
            throw new Error('Missing required flexAccountSid in config object');
        }
    }, [flexFlowSid, flexAccountSid]);

    useEffect(() => {
        if (flexFlowSid && flexAccountSid && user) {
            // If Twilio Chat Manager is initialized update config
            if (manager) {
                manager.updateConfig(chatConfigBase(config, isDarkMode, isDisabled));
                return;
            }

            setManagerState({
                ...defaultManagerState,
                loading: true,
            });

            console.info(`Intility FlexChat: Initializing Intility Chat - v${version}`);

            // Build chat config
            const chatConfig = chatConfigBase(config, isDarkMode, isDisabled);

            EntryPoint.defaultProps.tagline = translateText(Texts.entryPointLabel, isNorwegian);
            MainHeader.defaultProps.imageUrl = logo;
            MainHeader.defaultProps.titleText = 'Support';

            // If Entrypoint button is hidden, the Cloe button in the chat header should be hidden as well
            if (config.theme?.EntryPoint?.display?.includes('none')) {
                MainHeader.Content.remove('close-button');
            }

            // If In-Browser notifications is supported. Add the custom Notification button to the chat header
            if ('Notification' in window && navigator.permissions) {
                MainHeader.Content.add(
                    <NotificationButton isNorwegian={isNorwegian} key="notificationButton" />,
                );
            }

            // Since the messages in the chat header is a bit difficult with formatting of timestamps, we are enforcing 24h clock in chat message
            MessageBubble.Content.remove('header');
            MessageBubble.Content.add(<MessageBubbleHeader key="newHeader" />, { sortOrder: 0 });

            // Customize the content of the first welcome message sent in the chat
            MessagingCanvas.defaultProps.predefinedMessage = {
                body: translateText(Texts.predefinedMessage, isNorwegian),
                authorName: 'Intility Support',
                isFromMe: false,
            };

            // Start init of the Twilio Chat Manager with cusom chatConfig
            Manager.create(chatConfig)
                .then((manager) => {
                    // Translate default string values.
                    if (isNorwegian) {
                        manager.strings = {
                            ...manager.strings,
                            ...Texts.norwegianUiTranslation,
                        };
                    }

                    setManagerState({
                        ...defaultManagerState,
                        manager,
                    });

                    // If preEngagementConfig then send as first message
                    if (chatConfig.preEngagementConfig) {
                        Actions.on('afterStartEngagement', (payload) => {
                            const { question } = payload.formData;
                            if (!question) return;

                            const { channelSid } = manager.store.getState().flex.session;
                            manager.chatClient
                                .getChannelBySid(channelSid)
                                .then((channel) => channel.sendMessage(question));
                        });
                    }

                    // Initialize the custom actions
                    initActions(manager);

                    // Allways open the chat on init
                    if (!manager.store.getState().flex.session.isEntryPointExpanded) {
                        toggleChatVisibility();
                    }

                    console.info(`Intility FlexChat: Chat Manager successfully initialized.`);
                })
                .catch((error) => {
                    setManagerState({
                        ...defaultManagerState,
                        error: error.message,
                    });
                    console.error(`Intility FlexChat: Flex chat error`, error);
                });
        }
    }, [config, flexAccountSid, flexFlowSid, isDarkMode, manager, user]);

    return (
        <>
            {error && (
                <FlexChatLoading>
                    <p>Error Initializing Chat</p>
                    <FontAwesomeIcon
                        className="flexChatError"
                        icon={faExclamationCircle}
                        color="#D96E8B"
                    />
                </FlexChatLoading>
            )}
            {loading && (
                <FlexChatLoading>
                    {isNorwegian ? <p>Laster inn Chat</p> : <p>Loading Chat</p>}
                    <img
                        style={{ height: '24px', width: '24px' }}
                        src={Loader}
                        alt="Loading spinner"
                    />
                </FlexChatLoading>
            )}
            {manager && (
                <ContextProvider manager={manager}>
                    <RootContainer />
                </ContextProvider>
            )}
        </>
    );
};

export default FlexChat;
