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
    MainContainer,
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
import useChatActions from '../hooks/useChatActions';
import NotificationButton from './NotificationButton';
import Texts, { translateText } from '../assets/texts';
import TranslationBubbleBody from './TranslationBubbleBody';
import TranslationInfoHeader from './TranslationInfoHeader';
import useTranslation from '../hooks/useTranslation';
import { v4 as uuidv4 } from 'uuid';

const defaultManagerState = {
    loading: false,
    manager: undefined,
    error: undefined,
};

const FlexChat: React.FC<FlexChatProps> = ({
    config,
    isDarkMode = false,
    isDisabled = false,
    isDev = false,
    enableTranslation = false,
}) => {
    const [managerState, setManagerState] = useState<ManagerState>(defaultManagerState);
    const { manager, loading, error } = managerState;
    const { flexFlowSid, flexAccountSid, user } = config;
    const isNorwegian = user.preferredLanguage?.includes('-NO');

    const { toggleChatVisibility } = useChatActions();
    const { translateTextAsync } = useTranslation();

    const translationRef = React.createRef();

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
                console.info('Intility FlexChat: Updating chat config');
                manager.updateConfig(
                    chatConfigBase(config, isDarkMode, enableTranslation, isDisabled),
                );
                return;
            }

            setManagerState({
                ...defaultManagerState,
                loading: true,
            });

            console.info(`Intility FlexChat: Initializing Intility Chat - v${version}`);

            // Build chat config
            const chatConfig = chatConfigBase(config, isDarkMode, enableTranslation, isDisabled);

            EntryPoint.defaultProps.tagline = translateText(Texts.entryPointLabel, isNorwegian);
            MainHeader.defaultProps.imageUrl = logo;
            MainHeader.defaultProps.titleText = isDev ? 'Support Dev' : 'Support';

            // If In-Browser notifications is supported. Add the custom Notification button to the chat header
            if ('Notification' in window && navigator.permissions) {
                MainHeader.Content.add(
                    <NotificationButton isNorwegian={isNorwegian} key="notificationButton" />,
                );
            }

            // Since the messages in the chat header is a bit difficult with formatting of timestamps, we are enforcing 24h clock in chat message
            //MessageBubble.Content.remove('header');
            MessageBubble.Content.remove('header');
            MessageBubble.Content.add(<MessageBubbleHeader key="newHeader" />, { sortOrder: 0 });

            if (enableTranslation && user.preferredLanguage) {
                console.log('#1');
                MessageBubble.Content.remove('body');

                new Promise((res) => {
                    console.log(MessageBubble.Content.fragments);

                    MessageBubble.Content.fragments
                        //@ts-ignore
                        .map((e) => e.props.children.key)
                        .filter((key: string | string[]) => key.includes('translationBody'))
                        .forEach((f) => MessageBubble.Content.remove(f));

                    MainContainer.Content.fragments
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        .map((e) => e.props.children.key)
                        .filter((key) => key.includes('translationInfoHeader'))
                        .forEach((f) => MainContainer.Content.remove(f));

                    //MainContainer.Content.remove('translationInfoHeader');
                    MessageBubble.Content.remove('body');
                    console.log('Removed');
                    res(true);
                }).then(() => {
                    MessageBubble.Content.add(
                        <TranslationBubbleBody
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            preferredLanguage={user.preferredLanguage}
                            key={`translationBody_${uuidv4()}`}
                        />,
                        {
                            sortOrder: 1,
                        },
                    );

                    MainContainer.Content.add(
                        <TranslationInfoHeader key={`translationInfoHeader_${uuidv4()}`} />,
                        {
                            sortOrder: 0,
                        },
                    );
                    console.log('Added');
                });
            }

            MessagingCanvas.defaultProps.predefinedMessage = {
                body: translateText(Texts.predefinedMessage, isNorwegian),
                authorName: 'Intility Support',
                isFromMe: false,
            }
            //MessagingCanvas.defaultProps.predefinedMessage = false;

            // Start init of the Twilio Chat Manager with custom chatConfig
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

                    if (enableTranslation) {
                        Actions.replaceAction('SendMessage', async (payload, original) => {
                            return translateTextAsync(payload.body, 'en')
                                .then((response) => {
                                    const translatedText = response.data[0].translations.find(
                                        (t) => t.to === 'en',
                                    )?.text;

                                    const replacedPayload = Object.assign({}, payload);
                                    replacedPayload.body = translatedText;

                                    original(replacedPayload);
                                })
                                .catch(() => original(payload));
                        });
                    }

                    // Send the initialize message
                    Actions.addListener('afterStartEngagement', async (value) => {

                        const initMessage = isDev ? 'danitest123' : 'Start Chat';

                        const { channelSid } = manager.store.getState().flex.session;
                        const channel = await manager.chatClient.getChannelBySid(channelSid)

                        await channel.sendMessage(initMessage)
                        if (enableTranslation) {
                            await channel.sendMessage('🌍 This chat is AI translated 🌍')
                        }

                        if (enableTranslation && user.preferredLanguage) {
                            localStorage.setItem('chosenLanguage', user.preferredLanguage);
                            manager.configuration.context.user.chosenLanguage = user.preferredLanguage;

                            new Promise((res) => {
                                MessageBubble.Content.fragments
                                    .map((e) => (e.props.children as any).key)
                                    .filter((key) => key.includes('translationBody'))
                                    .forEach((f) => MessageBubble.Content.remove(f));

                                MainContainer.Content.fragments
                                    .map((e) => (e.props.children as any).key)
                                    .filter((key) => key.includes('translationInfoHeader'))
                                    .forEach((f) => MainContainer.Content.remove(f));

                                //MainContainer.Content.remove('translationInfoHeader');
                                MessageBubble.Content.remove('body');
                                console.log('Removed');
                                res(true);
                            }).then(() => {
                                MessageBubble.Content.add(
                                    <TranslationBubbleBody
                                        preferredLanguage={user.preferredLanguage}
                                        ref={translationRef}
                                        key={`translationBody_${uuidv4()}`}
                                    />,
                                    { sortOrder: 1 }
                                );

                                MainContainer.Content.add(
                                    <TranslationInfoHeader
                                        key={`translationInfoHeader_${uuidv4()}`}
                                    />,
                                    { sortOrder: 0 }
                                );
                                console.log('Added');
                            });
                        }
                    });

                    // Initialize the custom actions
                    initActions(manager);

                    if (!config.closeOnInit) {
                        // Always open the chat on init
                        if (!manager.store.getState().flex.session.isEntryPointExpanded) {
                            toggleChatVisibility();
                        }
                    }

                    console.info(`Intility FlexChat: Chat Manager successfully initialized.`);
                })
                .catch((error) => {
                    console.error(`Intility FlexChat: Flex chat error`, error);
                    setManagerState({
                        ...defaultManagerState,
                        error: error.message,
                    });
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
