import { Manager } from '@twilio/flex-webchat-ui';

const initActions = (manager: Manager) => {
    console.log('init actions');
    /* FlexWebChat.Actions.addListener('afterStartEngagement', (props: any) => {
        console.log('props: ', props);
        console.log(manager.store.getState());
    });

    FlexWebChat.Actions.addListener('StartEngagement', (props: unknown) => {
        console.log('props: ', props);
        console.log(manager.store.getState());
    });

    FlexWebChat.Actions.addListener('SendMessage', (props: any) => {
        console.log('props: ', props);
        console.log(manager.store.getState());
    });

    FlexWebChat.Actions.addListener('ToggleChatVisibility', (props: any) => {
        console.log('props: ', props);
    }); */
};

export default initActions;
