import { faExclamationCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text, { translateText } from '../assets/texts';

interface Props {
    isNorwegian: boolean;
}

const NotificationButton: React.FC<Props> = ({ isNorwegian }) => {
    const [text, setText] = useState('');
    const [classes, setClasses] = useState('notificationsRequestDiv');
    const [icon, setIcon] = useState(faBell);

    const update = () => {
        if (Notification.permission === 'denied') {
            setText(translateText(Text.notificationBlocked, isNorwegian));
            setClasses('notificationsRequestDiv');
            setIcon(faExclamationCircle);
        } else if (Notification.permission === 'granted') {
            setText(translateText(Text.notificationAllowed, isNorwegian));
            setClasses('notificationsRequestDiv');
            setIcon(faBell);
        } else {
            setText(translateText(Text.notificationToggle, isNorwegian));
            setClasses('notificationsRequestDiv clickable');
            setIcon(faBell);
        }
    };

    useEffect(() => {
        navigator.permissions.query({ name: 'notifications' }).then((permissionStatus) => {
            update();

            permissionStatus.onchange = function () {
                update();
            };
        });
    }, []);

    return (
        <div
            title={
                Notification.permission === 'default'
                    ? undefined
                    : translateText(Text.notificationSettings, isNorwegian)
            }
            className={classes}
            onClick={() => {
                if (Notification.permission === 'default') {
                    Notification.requestPermission();
                }
            }}
        >
            <p className="notificationsRequestText">{text}</p>
            <FontAwesomeIcon className={'notificationIcon'} icon={icon} />
        </div>
    );
};

export default NotificationButton;
