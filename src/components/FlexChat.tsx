import React, { useState, useEffect } from 'react';
import {
    Manager,
    EntryPoint,
    MainHeader,
    MessagingCanvas,
    ContextProvider,
    RootContainer,
    MessageBubble,
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

const defaultManagerState = {
    loading: false,
    manager: undefined,
    error: undefined,
};

const FlexChat: React.FC<FlexChatProps> = ({
    config,
    isDarkMode,
    loadingCompoment,
    isDisabled = false,
}) => {
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
            if (manager) {
                manager.updateConfig(chatConfigBase(config, isDarkMode, isDisabled));
                return;
            }

            setManagerState({
                ...defaultManagerState,
                loading: true,
            });

            console.info(`Intility FlexChat: Initializing Intility Chat - v${version}`);

            const chatConfig = chatConfigBase(config, isDarkMode, isDisabled);

            EntryPoint.defaultProps.tagline = isNorwegian ? 'Snakk med oss' : 'Chat with us';
            MainHeader.defaultProps.imageUrl = logo;
            MainHeader.defaultProps.titleText = 'Support';

            if (config.theme?.EntryPoint?.display?.includes('none')) {
                MainHeader.Content.remove('close-button');
            }

            if ('Notification' in window && navigator.permissions) {
                MainHeader.Content.add(
                    <NotificationButton isNorwegian={isNorwegian} key="notificationButton" />,
                );
            }

            MessageBubble.Content.remove('header');
            MessageBubble.Content.add(<MessageBubbleHeader key="newHeader" />, { sortOrder: 0 });

            MessagingCanvas.defaultProps.predefinedMessage = {
                body: isNorwegian
                    ? `Velkommen til Intility Chat. 
For å starte chaten, vennligst skriv **hei**.`
                    : `Welcome to Intility Chat. 
To start the chat, please say **hi**`,
                authorName: 'Intility Support',
                isFromMe: false,
            };

            Manager.create(chatConfig)
                .then((manager) => {
                    if (isNorwegian) {
                        manager.strings = {
                            ...manager.strings,
                            MessageCanvasTrayContent: `
                            <h6>Takk for at du snakket med oss!</h6>
                            <p>Hvis du har noen flere spørsmål. Vennligst ta kontakt med oss igjen.</p>`,
                            MessageCanvasTrayButton: `Start en ny chat`,
                            InputPlaceHolder: `Skriv melding`,
                            Today: `I dag`,
                            Yesterday: `I går`,
                            WelcomeMessage: `Velkommen til kundesupport`,
                            SendMessageTooltip: `Send melding`,
                            AttachFileImageTooltip: `Legg til fil`,
                            Read: `Lest`,
                        };
                    }
                    console.info(`Intility FlexChat: Chat Manager successfully initialized.`);

                    setManagerState({
                        ...defaultManagerState,
                        manager,
                    });
                    initActions(manager);

                    if (!manager.store.getState().flex.session.isEntryPointExpanded) {
                        toggleChatVisibility();
                    }
                })
                .catch((error) => {
                    setManagerState({
                        ...defaultManagerState,
                        error: error.message,
                    });
                    console.error(`Intility FlexChat: Flex chat error: ${error.message}`);
                });
        }
    }, [config, flexAccountSid, flexFlowSid, isDarkMode, manager, user]);

    return (
        <>
            {error && (
                <FlexChatLoading>
                    <p>Error Initializing Chat</p>
                    <FontAwesomeIcon
                        className={'flexChatError'}
                        icon={faExclamationCircle}
                        color="#D96E8B"
                    />
                </FlexChatLoading>
            )}
            {loading && (
                <FlexChatLoading>
                    {isNorwegian ? <p>Laster inn Chat</p> : <p>Loading Chat</p>}
                    {loadingCompoment || (
                        <img
                            style={{ height: '24px', width: '24px' }}
                            src={Loader}
                            alt="Loading spinner"
                        />
                    )}
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
