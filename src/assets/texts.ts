import { Strings } from '@twilio/flex-webchat-ui';
import { MultiLangText } from '../interfaces/FlexChat';

export const translateText = (text: MultiLangText, isNorwegian: boolean) =>
    isNorwegian ? text.no : text.en;

const preEngagementFormMessage: MultiLangText = {
    en: '',
    no: '',
};

const entryPointLabel: MultiLangText = {
    en: 'Chat with us',
    no: 'Chat med oss',
};

const predefinedMessage: MultiLangText = {
    en: `Welcome to Intility Chat.`,
    no: `Velkommen til Intility Chat.`,
};

const norwegianUiTranslation: Strings = {
    MessageCanvasTrayContent: `
<h6>Takk for at du snakket med oss!</h6>
<p>Hvis du har noen flere spørsmål. Vennligst ta kontakt med oss igjen.</p>`,
    MessageCanvasTrayButton: `Start en ny chat`,
    InputPlaceHolder: `Skriv melding`,
    Today: `I dag`,
    Yesterday: `I går`,
    WelcomeMessage: `Velkommen til kundesupport`,
    SendMessageTooltip: `Send melding`,
    AttachFileImageTooltip: `Legg til fil`,
    Read: `Lest`,
    FieldValidationRequiredField: `Ugyldig innhold`,
    Save: 'Lagre',
    AttachFileInvalidSize: 'Filen er for stor. Maks størrelse: 10MB',
    AttachFileInvalidType: `Ugyldig filtype`,
    Connecting: 'Kobler til',
    Disconnected: 'Kobler fra',
    TypingIndicator: '{{name}} skriver...'
};

const notificationBlocked: MultiLangText = {
    en: 'Notifications are blocked by the browser',
    no: 'Varsler er blokkert i nettleseren',
};

const notificationAllowed: MultiLangText = {
    en: 'Notifications are enabled',
    no: 'Varsler er skrudd på',
};

const notificationToggle: MultiLangText = {
    en: 'Enable notifications',
    no: 'Skru på varsler',
};

const notificationSettings: MultiLangText = {
    en: 'This can be reset by clicking the lock icon next to the URL.',
    no: 'Endre ved å trykke på hengelåsikonet i adresselinjefeltet.',
};

export default {
    entryPointLabel,
    predefinedMessage,
    norwegianUiTranslation,
    notificationBlocked,
    notificationAllowed,
    notificationToggle,
    notificationSettings,
    preEngagementFormMessage,
};
