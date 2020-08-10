interface MultiLangText {
    en: string;
    no: string;
}

export const translateText = (text: MultiLangText, isNorwegian: boolean) =>
    isNorwegian ? text.no : text.en;

const entryPointLabel: MultiLangText = {
    en: 'Chat with us',
    no: 'Snakk med oss',
};

const predefinedMessage: MultiLangText = {
    en: `Welcome to Intility Chat. 
In order for us to be able to help you as quickly as possible, please describe the problem in **one** message.`,
    no: `Velkommen til Intility Chat. 
For at vi raskest mulig skal kunne hjelpe deg, vennligst beskriv problemet i **èn** melding.`,
};

const norwegianUiTranslation: Record<string, string> = {
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
};