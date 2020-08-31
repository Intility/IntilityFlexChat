import { generateTheme } from './chatTheme';
import { Config } from '@twilio/flex-webchat-ui/src/state/AppConfig';
import { ConfigProps } from '../../interfaces/FlexChat';
import preEngagementConfig from './preEngagementForm';

const config = (config: ConfigProps, isDarkMode: boolean, isDisabled = false): Config => ({
    available: !isDisabled,
    accountSid: config.flexAccountSid,
    flexFlowSid: config.flexFlowSid,
    colorTheme: {
        overrides: generateTheme(isDarkMode, config.theme),
    },
    context: {
        locationOrigin: window.location.origin,
        friendlyName: config.user.userPrincipalName,
        user: config.user,
    },
    markdownSupport: {
        enabled: true,
    },
    logLevel: config.loglevel ? 'debug' : undefined,
    //logLevel: 'debug',
    startEngagementOnInit: false,
    fileAttachment: {
        enabled: true,
        maxFileSize: 10 * 1024 * 1024, //10MB
        acceptedExtensions: ['png', 'gif', 'jpg', 'jpeg', 'pdf'],
    },
    preEngagementConfig: preEngagementConfig(config.preEngagementFormMessage),
    sdkOptions: {
        chat: {
            logLevel: config.loglevel === 'superDebug' ? 'debug' : undefined,
        },
    },
});

export default config;
