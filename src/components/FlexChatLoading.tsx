import React from 'react';
import '../styles/FlexChatLoading.css';

const FlexChatLoading: React.FC<unknown> = (props) => {
    return <div className="flexLoader">{props.children}</div>;
};

export default FlexChatLoading;
