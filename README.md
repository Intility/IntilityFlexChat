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

#### CDN

```html
<script src="https://unpkg.com/@intility/flex-chat@1/dist/index.js"></script>
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
type AllowedValues = string | number | boolean | undefined | null | string[] | number[] | boolean[];

type UserConfigProps = {
    userPrincipalName: string;
    mail: string;
    mobilePhone: string;
    preferredLanguage: string;
    [key: string]: AllowedValues;
};
```

### Example configuration

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
        <div>
            <FlexChat
                config={config}
                isDarkMode={isDarkMode}
                isDisabled={false}
            />
        <div/>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Illustration

![Successful chat setup](https://i.imgur.com/pMNk5mL.png)