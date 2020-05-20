import React, { useState, useEffect, ReactNode } from 'react';
import * as FlexWebChat from '@twilio/flex-webchat-ui';
import chatConfigBase from '../config/chat/chatAppConfig';
import logo from '../assets/logo.png';
import FlexChatLoading from './FlexChatLoading';
import { ManagerState, ConfigProps } from '../interfaces/FlexChat';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../assets/loader.svg';

import '../styles/FlexChatError.css';

export type FlexChatProps = {
    children?: React.ReactNode;
    config: ConfigProps;
    isDarkMode: boolean;
    loadingCompoment?: ReactNode;
};

const FlexChat: React.FC<FlexChatProps> = ({ config, isDarkMode, loadingCompoment }) => {
    const [managerState, setManagerState] = useState<ManagerState>({
        loading: false,
        manager: undefined,
        error: undefined,
    });
    const { manager, loading, error } = managerState;
    const { flexFlowSid, flexAccountSid, user } = config;

    const isNorwegian = user.preferredLanguage.includes('-NO');

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
                manager.updateConfig(chatConfigBase(config, isDarkMode));
                return;
            }

            setManagerState({
                loading: true,
                manager: undefined,
                error: undefined,
            });

            const chatConfig = chatConfigBase(config, isDarkMode);

            FlexWebChat.EntryPoint.defaultProps.tagline = isNorwegian
                ? 'Snakk med oss'
                : 'Chat with us';
            FlexWebChat.MainHeader.defaultProps.imageUrl = logo;
            FlexWebChat.MainHeader.defaultProps.titleText = 'Support';

            FlexWebChat.MessagingCanvas.defaultProps.predefinedMessage = {
                body: isNorwegian
                    ? 'Velkommen til Intility Chat Support. Vennligst beskriv ditt problem.'
                    : 'Welcome to Intility Chat Support. Please describe your issue',
                authorName: 'Intility Support',
                isFromMe: false,
            };

            FlexWebChat.Manager.create(chatConfig)
                .then((manager) => {
                    setManagerState({
                        loading: false,
                        error: undefined,
                        manager,
                    });
                    //initActions(manager);
                })
                .catch((error) => {
                    setManagerState({
                        loading: false,
                        manager: undefined,
                        error: error.message,
                    });
                    console.error(`Flex chat error: ${error.message}`);
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
                <FlexWebChat.ContextProvider manager={manager}>
                    <FlexWebChat.RootContainer />
                </FlexWebChat.ContextProvider>
            )}
        </>
    );
};

export default FlexChat;
