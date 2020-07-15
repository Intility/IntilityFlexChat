import './styles/FlexChatLoading.css';
import './styles/root.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FlexChat from './components/FlexChat';
import { ConfigProps } from './interfaces/FlexChat';
import useChatActions from './useChatActions';

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
        hasUserReadLastMessage,
    } = useChatActions();

    const config: ConfigProps = {
        flexAccountSid: process.env.REACT_APP_ACCOUNT_SID,
        flexFlowSid: process.env.REACT_APP_FLOW_SID,
        theme: {
            MainContainer: {
                width: '50vw',
                height: '92vh',
                maxHeight: '100vh',
                minWidth: '350px',
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
            <button onClick={flipDarkMode}>Toggle Darkmode</button>
            <button onClick={toggleChatVisibility}>Toggle Chat</button>
            <button onClick={() => setInputFieldContent('Hello')}>SetInputFieldContent</button>
            <button onClick={() => setAndSendInputFieldContent('Hello1234')}>
                SetAndSendInputFieldContent
            </button>
            <FlexChat config={config} isDarkMode={isDarkMode} isDisabled={false} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
