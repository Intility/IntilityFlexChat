import './styles/FlexChatLoading.css';
import './styles/root.css';

/* import App from './devSetup';
import React from 'react';
import ReactDOM from 'react-dom'; */

export * from './interfaces/FlexChat';
export { Manager } from '@twilio/flex-webchat-ui';
export { default as FlexChat } from './components/FlexChat';
export { default as useChatActions } from './hooks/useChatActions';
export { default as UseChatActionsFuncs } from './hooks/useChatActions';

export type { CSSProps, FormAttributes } from '@twilio/flex-webchat-ui';

// ReactDOM.render(<App />, document.getElementById('root'));
