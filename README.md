# Intility Chat

![Build and deploy package to npm](https://github.com/Intility/IntilityFlexChat/workflows/Build%20and%20deploy%20package%20to%20npm/badge.svg)

Intility Chat is a React Component that wraps [Twilio's WebChat UI](https://www.npmjs.com/package/@twilio/flex-webchat-ui) with basic configuration and theme.

## Purpose

<!-- What does the application do and why? What problem does it solve? -->
Intility Chat makes it easy for third parties to implement a customized version of Flex WebChat UI that is tailored to fit our design guidelines and then deliver an consistent user experience to the end user.

## Intended consumers

<!--  Who is the application intended for, and who can utilize its features? -->
This component is intended for customer facing web portals that isn't developed by Intility, but we use in production.

## Main technologies

<!-- What are the main languages and frameworks are used in the project -->
This project utilizes among others the following libraries:

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Babel](https://babeljs.io/)
* [@twilio/flex-webchat-ui](https://www.npmjs.com/package/@twilio/flex-webchat-ui)
* have a look in [package.json](package.json) for complete list of dependencies
  
## Getting Started

### Installation

#### NPM

```bash
npm i @intility/flex-chat
```

### Required Configuration

#### Environment variables

**NOTE:** If you haven't got these keys, please contact your provided Intility Contact.

```env
REACT_APP_ACCOUNT_SID=xxxxx
REACT_APP_FLOW_SID=xxxxx
```

#### Properties

```ts
type ConfigProps = {
    flexFlowSid?: string;
    flexAccountSid?: string;
    loglevel?: 'debug' | 'superDebug';
    closeOnInit?: boolean;
    theme?: ThemeConfig;
    preEngagementFormMessage?: MultiLangText;
    user: ChatContext;
};

type FlexChatProps = {
    config: ConfigProps;
    isDarkMode: boolean;
    isDisabled?: boolean;
};
```

**NOTE:** The properties marked with `?` is optional.

#### Authentication

Since this package initializes an chat session with an Intility Support Agent there is a requirement to provide a authenticated users details in the config object.

**NOTE:** This components does not give other requirements to authentication implementations but to provide the components with these values.

```ts
type AllowedValues = string | number | boolean | undefined | null | string[] | number[] | boolean[] | object;

type UserConfigProps = {
    userPrincipalName: string;
    mail: string;
    mobilePhone: string;
    preferredLanguage: string;
    [key: string]: AllowedValues;
};
```

### Example Configuration

```ts
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FlexChat, ConfigProps } from '@intility/flex-chat/dist/index';

const App: React.FC = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const config: ConfigProps = {
        flexAccountSid: process.env.REACT_APP_ACCOUNT_SID,
        flexFlowSid: process.env.REACT_APP_FLOW_SID,
        user: {
            userPrincipalName: 'ola.normann@intility.no',
            mail: 'ola.normann@intility.no',
            mobilePhone: '815-493-00',
            preferredLanguage: 'nb-NO'
        },
    };

    return (
        <FlexChat config={config} isDarkMode={isDarkMode} isDisabled={false} /> 
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### Optional Configuration

#### Keep the chat closed on page load

If you want to have the Chat component closed on initialization you can set the property named `closeOnInit` to `true` in the config object. 
Default behavior is for the chat component to expand on page load.

**NOTE:** If there is an ongoing chat session the chat window will always expand on page load. 

```ts
const config: ConfigProps = {
    // ...required config
    closeOnInit: true
};
```

#### PreEngagementFormMessage

If you want to add a message to the start page you can add a property named `preEngagementFormMessage` to the config object.

This object is of type `MultiLangText` and consists of an English (en) and Norwegian (no).

```ts
const config: ConfigProps = {
    // ...required config
    preEngagementFormMessage: {
        en: 'Du kan nå teknikere på ansvarlig avdeling innenfor tidspunktene 08:00 - 16:00 (CET/CEST)',
        no: 'You can reach technicians in the responsible department within the hours 08:00 - 16:00 (CET / CEST)';
    },
};
```

#### Theming

You can change CSS properties on the `MainContainer`, `EntryPoint` and `CloseButton` components to make them fit your experience, e.g. hide the `EntryPoint` button or change the height, width or render properties like position.

* MainContainer: The expanded chat box.
* EntryPont: Toggle button in the bottom right corner.
* CloseButton: Toggle button on the top bar in the `MainContainer`

**NOTE:** some properties will be default from Twilio or overwritten by Intility's setup of the chat component.

```ts
type ThemeConfig = {
    MainContainer?: CSSProps;
    EntryPoint?: CSSProps;
    CloseButton?: CSSProps;
};
```

```ts
const config: ConfigProps = {
    // ...required config
    theme: {
        MainContainer: {
            width: '800px',
            height: '87vh',
            '@media only screen and (min-width: 1415px)': {
                width: `1080px`,
            },
        },
        // Display EntryPoint for small devices (i.e. Smart phones)
        EntryPoint: {
            '@media only screen and (min-width: 767px)': {
                display: 'none !important',
            },
        },
        // Display CloseButton for small devices (i.e. Smart phones)
        CloseButton: {
            '@media only screen and (min-width: 767px)': {
                display: 'none',
            },
        },
    },
};
```

## Usage

### Hooks

This component can be interacted with using integrated `useChatActions` hook.

```ts
type UseChatActionsFuncs = {
    setInputFieldContent: (body: string) => Promise<unknown>;
    setAndSendInputFieldContent: (body: string) => Promise<unknown>;
    toggleChatVisibility: () => Promise<unknown>;
    hasUserReadLastMessage: () => Promise<boolean>;
    isChatOpen: () => Promise<boolean>;
};
```

## Illustration

![Successful chat setup](https://i.imgur.com/pMNk5mL.png)
