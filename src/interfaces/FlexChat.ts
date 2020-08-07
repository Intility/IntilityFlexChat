import { Manager, CSSProps, FormAttributes } from '@twilio/flex-webchat-ui';
import { ReactNode } from 'react';

export type FlexChatProps = {
    children?: ReactNode;
    config: ConfigProps;
    isDarkMode: boolean;
    isDisabled?: boolean;
};

export type ConfigProps = {
    flexFlowSid?: string;
    flexAccountSid?: string;
    loglevel?: 'debug' | 'superDebug';
    theme?: ThemeConfig;
    preEngagementForm?: FormAttributes;
    user: ChatContext;
};

export type ThemeConfig = {
    MainContainer?: CSSProps;
    EntryPoint?: CSSProps;
};

export type ChatContext = {
    userPrincipalName: string;
    mail: string;
    mobilePhone: string;
    preferredLanguage: string;
    [key: string]: AllowedValues;
};

export type AllowedValues =
    | string
    | number
    | boolean
    | undefined
    | null
    | string[]
    | number[]
    | boolean[];

export type ManagerState = {
    loading: boolean;
    manager?: Manager;
    error?: string;
};
