import { theme } from '../theme/theme';
import { DeepPartial, Theme, CSSProps } from '@twilio/flex-webchat-ui';
import { ThemeConfig } from '../../interfaces/FlexChat';

const fontFamily: CSSProps = {
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
};

const primaryColors: CSSProps = {
    background: theme.primaryColor,
    color: theme.textLight,
};

const primaryColorsOutlined: CSSProps = {
    background: 'none',
    color: theme.primaryColor,
    border: `2px solid ${theme.primaryColor}`,
    borderRadius: '3px',
    padding: '5.5px 8px',
    textTransform: 'none',
    letterSpacing: 'normal',
    fontSize: '14px',
    fontWeight: 'bold',
};

const primaryColorsHover: CSSProps = {
    background: theme.primaryColorHover,
    color: theme.textLight,
};

export const generateTheme = (
    isDarkMode: boolean,
    themeConfig: ThemeConfig = {},
): DeepPartial<Theme> => ({
    MainContainer: {
        ...fontFamily,
        ...themeConfig.MainContainer,
        width: themeConfig.MainContainer?.width || '500px',
        height: themeConfig.MainContainer?.height,
    },
    Chat: {
        MessagingCanvas: {
            Container: {
                ...fontFamily,
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
                ...fontFamily,
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
        },
        WelcomeMessage: {
            Container: {
                ...fontFamily,
                fontSize: '14px !important',
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
            Icon: {
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '14px !important',
            },
        },
        MessageListItem: {
            FromOthers: {
                Bubble: {
                    ...fontFamily,
                    background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
                Avatar: {
                    background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
                Header: {
                    ...fontFamily,
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
            },
            FromMe: {
                Bubble: {
                    ...fontFamily,
                    ...primaryColors,
                },
                Avatar: {
                    ...primaryColors,
                },
                Header: {
                    ...fontFamily,
                    ...primaryColors,
                },
            },
            ReadStatus: {
                ...fontFamily,
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
        },
        MessageInput: {
            AttachFileButton: {
                ...primaryColors,
                ...fontFamily,
                '&:hover': {
                    ...primaryColorsHover,
                    backgroundBlendMode: 'color',
                },
            },
            FileBox: {
                background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                border: `1px solid ${isDarkMode ? 'rgb(71,71,72)' : 'rgb(217,217,217)'}`,
                borderRadius: '4px',
            },

            Container: {
                background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                color: isDarkMode ? theme.textLight : theme.textDark,
                ...fontFamily,
                fontSize: '14px !important',
                borderRadius: '4px',
                '::placeholder': {
                    color: isDarkMode ? theme.textLight : theme.textDark,
                },
            },
            Button: {
                ...primaryColors,
                ...fontFamily,
                '&:hover': {
                    ...primaryColorsHover,
                    backgroundBlendMode: 'color',
                },
            },
        },

        MessageCanvasTray: {
            Button: {
                ...fontFamily,
                ...primaryColorsOutlined,
                borderRadius: '4px',
            },
            Container: {
                ...fontFamily,
                background: isDarkMode ? theme.mediumGreyBackground : theme.lightGreyBackground,
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '1rem',
            },
        },
    },

    MainHeader: {
        Container: {
            ...fontFamily,
            background: isDarkMode ? theme.darkBackground : theme.darkGreyBackground,
            color: theme.textLight,
            '& .Twilio-Icon-Close': {
                ...themeConfig.CloseButton,
            },
            '&:hover': {
                cursor: 'default',
            },
        },
    },

    EntryPoint: {
        Container: {
            ...themeConfig.EntryPoint,
            ...primaryColors,
            ...fontFamily,
            boxShadow: 'none',
            '&:hover': {
                ...primaryColorsHover,
                backgroundBlendMode: 'color',
            },
        },
    },
    FormComponents: {
        Input: {
            display: 'none',
        },
        Select: {
            ...fontFamily,
            color: isDarkMode ? theme.textLight : theme.textDark,
        },
        TextArea: {
            ...fontFamily,
            color: isDarkMode ? theme.textLight : theme.textDark,
            '& div textarea': {
                borderRadius: '4px',
                backgroundColor: '#E6E6E6',
                border: '1px solid #808080',
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '14px',
            },
            '& div textarea::placeholder': {
                color: isDarkMode ? theme.textLight : theme.textDark,
            },
            '& div textarea:hover': {
                background: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
            },
            '& div textarea:focus': {
                background: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
            },
        },
    },
    PreEngagementCanvas: {
        Container: {
            ...fontFamily,
            background: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
            color: isDarkMode ? theme.textLight : theme.textDark,
            paddingLeft: '10%',
            paddingRight: '10%',
            display: 'flex',
            justifyContent: 'center',
            '& *': {
                ...fontFamily,
                background: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
            },
            '& div form': {
                maxWidth: '100% !important',
                padding: '0 2px 0 2px',
            },
            '@media only screen and (max-width: 767px)': {
                paddingLeft: '10px',
                paddingRight: '10px',
            },
            // Make form fit content
            '& div': {
                flexGrow: 0,
            },
            // Style Form description
            '& div form > div:first-child': {
                fontSize: '19px',
            },
            // Style form message
            '& .message': {
                fontSize: '14px',
                lineHeight: '1.5rem',
            },
        },
        Form: {
            Label: {
                ...fontFamily,
                color: isDarkMode ? theme.textLight : theme.textDark,
                fontSize: '14px',
            },
            SubmitButton: {
                ...primaryColorsOutlined,
                ...fontFamily,
                marginTop: '8px',
            },
        },
    },
    PendingEngagementCanvas: {
        Container: {
            backgroundColor: isDarkMode ? theme.darkGreyBackground : theme.lightBackground,
        },
    },
});
