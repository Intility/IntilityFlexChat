import React, { useState, useEffect, ReactNode } from 'react';
import * as FlexWebChat from '@twilio/flex-webchat-ui';
import chatConfigBase from '../config/chat/chatAppConfig';
import logo from '../assets/logo.png';
import FlexChatLoading from './FlexChatLoading';
import { ManagerState, ConfigProps } from '../interfaces/FlexChat';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/FlexChatError.css';

export type FlexChatProps = {
    children?: React.ReactNode;
    config: ConfigProps;
    isDarkMode: boolean;
    loadingCompoment?: ReactNode;
};

const FlexChat: React.FC<FlexChatProps> = ({ children, config, isDarkMode, loadingCompoment }) => {
    const [managerState, setManagerState] = useState<ManagerState>({
        loading: false,
        manager: undefined,
        error: undefined,
    });
    const { manager, loading, error } = managerState;
    const { flexFlowSid, flexAccountSid, user } = config;

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

            FlexWebChat.EntryPoint.defaultProps.tagline = 'Chat with us!';
            FlexWebChat.MainHeader.defaultProps.imageUrl = logo;
            FlexWebChat.MainHeader.defaultProps.titleText = 'Support';

            // FlexWebChat.MessagingCanvas.defaultProps.predefinedMessage = undefined;
            // FlexWebChat.MessagingCanvas.defaultProps.autoInitChannel = true;

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
                    <FontAwesomeIcon className={'flexChatError'} icon={faTimes} color="#FF1A2D" />
                </FlexChatLoading>
            )}
            {loading && (
                <FlexChatLoading>
                    <p>Loading</p>
                    {loadingCompoment}
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
