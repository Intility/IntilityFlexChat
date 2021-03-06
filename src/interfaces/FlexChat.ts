import { Manager, CSSProps } from '@twilio/flex-webchat-ui';
import { ReactNode } from 'react';

export type FlexChatProps = {
    children?: ReactNode;
    config: ConfigProps;
    isDev?: boolean;
    isDarkMode?: boolean;
    isDisabled?: boolean;
    enableTranslation?: boolean;
};

export type MultiLangText = {
    en: string;
    no: string;
};

export type ConfigProps = {
    flexFlowSid?: string;
    flexAccountSid?: string;
    translatorKey?: string;
    closeInInit?: boolean;
    loglevel?: 'debug' | 'superDebug';
    closeOnInit?: boolean;
    theme?: ThemeConfig;
    preEngagementFormMessage?: MultiLangText;
    user: ChatContext;
};

export type ThemeConfig = {
    MainContainer?: CSSProps;
    EntryPoint?: CSSProps;
    CloseButton?: CSSProps;
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
    | boolean[]
    | Record<string, any>;

export type ManagerState = {
    loading: boolean;
    manager?: Manager;
    error?: string;
};
