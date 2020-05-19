import './styles/FlexChatLoading.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FlexChat from './components/FlexChat';
import { ConfigProps } from './interfaces/FlexChat';

export * from './interfaces/FlexChat';
export { default as FlexChat } from './components/FlexChat';

const App: React.FC = (props) => {
    const [isDarkMode, setIsDakrMode] = useState(false);

    const config: ConfigProps = {
        flexAccountSid: process.env.REACT_APP_ACCOUNT_SID,
        flexFlowSid: process.env.REACT_APP_FLOW_SID,
        user: {
            userPrincipalName: 'Anonymous Hippopotamus',
            mail: 'Anonymous.Hippopotamus@intility.no',
            mobilePhone: '46836822',
            preferredLanguage: 'nb-NO',
        },
    };

    const flipDarkMode = () => {
        setIsDakrMode(!isDarkMode);
    };

    return (
        <>
            <button onClick={flipDarkMode}>
                The Dark Side of the Chat is a pathway to many abilities some consider to be
                unnatural.
            </button>
            <FlexChat config={config} isDarkMode={isDarkMode} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
