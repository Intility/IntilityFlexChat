import { theme } from '../theme/theme';
import { DeepPartial, Theme } from '@twilio/flex-webchat-ui';
import { ThemeConfig } from '../../interfaces/FlexChat';

const primaryColors = {
    background: theme.primaryColor,
    color: theme.textLight,
};

const primaryColorsHover = {
    background: theme.primaryColor,
    color: theme.textLight,
};

export const generateTheme = (
    isDarkMode: boolean,
    themeConfig: ThemeConfig = {},
): DeepPartial<Theme> => ({
    MainContainer: {
        ...themeConfig.MainContainer,
        width: themeConfig.MainContainer?.width || '500px',
        height: themeConfig.MainContainer?.height,
    },
    Chat: {
        MessagingCanvas: {
            Container: {
                background: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
            },
        },
        MessageList: {
            DateSeparatorLine: {
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
            TypingIndicator: {
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
            DateSeparatorText: {
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
        },
        WelcomeMessage: {
            Container: {
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '14px !important',
            },
            Icon: {
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '14px !important',
            },
        },
        MessageListItem: {
            FromOthers: {
                Bubble: {
                    background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
                Avatar: {
                    background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
                Header: {
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
            },
            FromMe: {
                Bubble: {
                    ...primaryColors,
                },
                Avatar: {
                    ...primaryColors,
                },
                Header: {
                    ...primaryColors,
                },
            },
            ReadStatus: {
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
        },
        MessageInput: {
            Container: {
                background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '14px !important',
                '::placeholder': {
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
            },
            Button: {
                ...primaryColors,
                '&:hover': {
                    ...primaryColorsHover,
                    backgroundBlendMode: 'color',
                },
            },
        },

        MessageCanvasTray: {
            Button: {
                ...primaryColors,
                borderRadius: '4px',
            },
            Container: {
                background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '1rem',
            },
        },
    },

    MainHeader: {
        Container: {
            background: isDarkMode ? theme.darkBackground : theme.darkGreyBackground,
            color: theme.textLight,
            '&:hover': {
                cursor: 'default',
            },
        },
    },

    EntryPoint: {
        Container: {
            ...themeConfig.EntryPoint,
            ...primaryColors,
            boxShadow: 'none',
            '&:hover': {
                ...primaryColorsHover,
                backgroundBlendMode: 'color',
            },
        },
    },
    FormComponents: {
        TextArea: {
            '& div textarea': {
                borderRadius: '4px',
            },
        },
    },
    PreEngagementCanvas: {
        Container: {
            maxWidth: '80%',
            display: 'flex',
            justifyContent: 'center',
            '& div': {
                flexGrow: 0,
            },
            '& div form div:first-child': {
                fontSize: '18px',
            },
            '& .message': {
                fontSize: '14px',
                lineHeight: '1.5rem',
            },
            '& div form': {
                maxWidth: '100% !important',
                padding: '0 2px 0 2px',
            },
        },
        Form: {
            Label: {
                fontWeight: 600,
            },
            SubmitButton: {
                ...primaryColors,
                borderRadius: '4px',
            },
        },
    },
    PendingEngagementCanvas: {
        Container: {
            backgroundColor: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
        },
    },
});
