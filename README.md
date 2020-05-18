<!-- template available at https://gitlab.intility.no/Intility/readme-template -->

<!-- Badges -->
<!-- While not required, badges are recommended; and in particular pipeline status -->
<!-- Uncomment the below line and replace `project` with the path to your project (e.g. -->
<!-- `group[s]/project`). If you want the status for a different branch than `master`, change -->
<!-- the branch too.-->
<!-- [![pipeline status](https://gitlab.intility.no/<project>/master/pipeline.svg)](https://gitlab.intility.no/<project>/pipelines)   -->

<!------------------------------------------------------------------------------------>
<!-- REQUIRED -->
<!------------------------------------------------------------------------------------>

# Intility Chat
![Build and deploy package to npm](https://github.com/Intility/IntilityFlexChat/workflows/Build%20and%20deploy%20package%20to%20npm/badge.svg)

<!-- Describe the project briefly here. -->
<!-- Also, unless it's clear: specify what type of project it is; API, library, application, collection of scripts, etc -->
Intility Chat is a React Component that wraps [Twilio's WebChat UI](https://www.npmjs.com/package/@twilio/flex-webchat-ui) with basic configuartion and theme. 

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

<!--
Provide step by step instructions that will allow a new contributor to get a copy of the project up and running on their local machine.
Installation of common development tools such as `git`, `docker` and IDEs can be covered here, but is not necessary.

The granularity and extent of these instructions will depend on the size and type of the project,
but may extend to things such as platform specific steps, etc.
-->

### Required Configuration

#### Environment variables

**NOTE:** If you haven't got these keys, please contact your provided Intility Contact.

```bash
REACT_APP_ACCOUNT_SID=xxxxx
REACT_APP_FLOW_SID=xxxxx
```

#### Authentication

Since this package initializes an chat session with an Intility Support Agent there is a requirement to provide a authenticated users details in the config object.

**NOTE:** This components does not give other requirements to authentication implementations but to provide the components with these values.

```typescript
type UserConfigProps = {
    userPrincipalName: string;
    mail: string;
    mobilePhone: string;
};
```

### Example configuration

```typescript
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
        },
    };

    return (
        <div>
            <FlexChat
                config={chatConfig}
                isDarkMode={isDarkMode}
                loadingCompoment={<FlexChatLoading />}
            />
        <div/>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
```
