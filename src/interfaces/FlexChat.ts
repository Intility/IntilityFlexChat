import { Manager } from '@twilio/flex-webchat-ui';

export type ConfigProps = {
    flexFlowSid?: string;
    flexAccountSid?: string;
    user: ChatContext;
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
