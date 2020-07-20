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
        isChatOpen,
    } = useChatActions();

    const config: ConfigProps = {
        flexAccountSid: process.env.REACT_APP_ACCOUNT_SID,
        flexFlowSid: process.env.REACT_APP_FLOW_SID,
        theme: {
            MainContainer: {
                position: 'absolute',
                top: '45px',
                width: 'calc(100vw - 350px)',
                maxWidth: '1100px',
                height: '87vh',
                maxHeight: '100vh',
                minWidth: '350px',
                bottom: '70px',
                right: '7px',
                boxShadow: 'none',
                '@media only screen and (min-width: 1415px)': {
                    right: `calc((100vw - 1400px)/2)`,
                    width: `1080px`,
                },
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

    const isChatOpenButton = async () => {
        const isOpen = await isChatOpen();
        console.log(isOpen);
    };

    return (
        <>
            <button onClick={flipDarkMode}>Toggle Darkmode</button>
            <button onClick={toggleChatVisibility}>Toggle Chat</button>
            <button onClick={isChatOpenButton}>IsChatOpen</button>
            <button onClick={() => setInputFieldContent('Hello')}>SetInputFieldContent</button>
            <button onClick={() => setAndSendInputFieldContent('Hello1234')}>
                SetAndSendInputFieldContent
            </button>
            <div
                id="container"
                style={{ backgroundColor: '#BBB', maxWidth: '1400px', margin: '0 auto 0 auto' }}
            >
                <div style={{ width: '300px', height: '400px', backgroundColor: '#CCC' }}>
                    <p>test</p>
                </div>
                <div style={{ width: '300px', height: '400px', backgroundColor: '#CCC' }}>
                    <p>test</p>
                </div>
            </div>
            <FlexChat config={config} isDarkMode={isDarkMode} isDisabled={false} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
