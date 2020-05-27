import React from 'react';
import { ChatChannelState } from '@twilio/flex-webchat-ui';

interface MessageBubbleHeaderProps {
    key: string;
    message?: ChatChannelState.MessageState;
    member?: ChatChannelState.MemberState;
}

// Bascially the same as the one from Twilio, except for the timestamp.
const MessageBubbleHeader: React.FC<MessageBubbleHeaderProps> = ({ member, message }) => (
    <div style={{ display: 'flex', flexWrap: 'nowrap', flexGrow: 1, padding: '5px 12px 0 12px' }}>
        <span
            style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flexGrow: 1,
                fontSize: '10px',
                fontWeight: 'bold',
                marginRight: '8px',
                marginBottom: '0px',
            }}
        >
            {member?.friendlyName}
        </span>
        <span style={{ fontSize: '10px', marginBottom: '0px' }}>
            {message?.source.timestamp.toTimeString().slice(0, 5)}
        </span>
    </div>
);

export default MessageBubbleHeader;
