import './styles/FlexChatLoading.css';
import './styles/root.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FlexChat from './components/FlexChat';
import { ConfigProps } from './interfaces/FlexChat';
import useChatActions from './useChatActions';
import { EventEmitter } from 'events';

export * from './interfaces/FlexChat';
export { default as FlexChat } from './components/FlexChat';
export { default as useChatActions } from './useChatActions';

/**
 * To test this component this needs to be pasted into index.tsx
 */
const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const {
        setInputFieldContent,
        setAndSendInputFieldContent,
        toggleChatVisibility,
    } = useChatActions();

    const config: ConfigProps = {
        flexAccountSid: process.env.REACT_APP_ACCOUNT_SID,
        flexFlowSid: process.env.REACT_APP_FLOW_SID,
        theme: {
            MainContainer: {
                width: '60vw',
                height: '92vh',
                maxHeight: '100vh',
                bottom: '10px',
                right: '10px',
            },
            EntryPoint: {
                display: 'none !important',
            },
        },
        user: {
            userPrincipalName: 'Anonymous Hippopotamus',
            mail: 'Anonymous.Hippopotamus@intility.no',
            mobilePhone: '46836822',
            preferredLanguage: 'nb-NO',
        },
    };

    const flipDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <button onClick={flipDarkMode}>
                The Dark Side of the Chat is a pathway to many abilities some consider to be
                unnatural.
            </button>
            <button onClick={toggleChatVisibility}>toggleChatVisibility</button>
            <button onClick={() => setInputFieldContent('Hello')}>setInputFieldContent</button>
            <button onClick={() => setAndSendInputFieldContent('Hello1234')}>
                setAndSendInputFieldContent
            </button>
            <FlexChat config={config} isDarkMode={isDarkMode} isDisabled={false} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
