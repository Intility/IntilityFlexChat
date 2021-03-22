import { generateTheme } from './chatTheme';
import { Config } from '@twilio/flex-webchat-ui/src/state/AppConfig';
import { ConfigProps } from '../../interfaces/FlexChat';
import preEngagementConfig from './preEngagementForm';
import texts, { translateText } from '../../assets/texts';

const config = (
    config: ConfigProps,
    isDarkMode: boolean,
    enableTranslation: boolean,
    isDisabled = false,
): Config => ({
    available: !isDisabled,
    accountSid: config.flexAccountSid,
    flexFlowSid: config.flexFlowSid,
    colorTheme: {
        overrides: generateTheme(isDarkMode, config.theme),
    },
    context: {
        locationOrigin: window.location.href,
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
    preEngagementConfig: preEngagementConfig(
        enableTranslation,
        translateText(
            config.preEngagementFormMessage || texts.preEngagementFormMessage,
            config.user.preferredLanguage?.includes('-NO'),
        ),
        config.user.preferredLanguage,
    ),
    sdkOptions: {
        chat: {
            logLevel: config.loglevel === 'superDebug' ? 'debug' : undefined,
        },
    },
});

export default config;
