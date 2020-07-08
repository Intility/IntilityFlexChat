import { faExclamationCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    isNorwegian: boolean;
}

const NotificationButton: React.FC<Props> = ({ isNorwegian }) => {
    const [text, setText] = useState('');
    const [classes, setClasses] = useState('notificationsRequestDiv');
    const [icon, setIcon] = useState(faBell);

    const update = () => {
        if (Notification.permission === 'denied') {
            setText(
                isNorwegian
                    ? 'Varsler er blokkert i nettleseren'
                    : 'Notifications are blocked by the browser',
            );
            setClasses('notificationsRequestDiv');
            setIcon(faExclamationCircle);
        } else if (Notification.permission === 'granted') {
            setText(isNorwegian ? 'Varsler er skrudd på' : 'Notifications are enabled');
            setClasses('notificationsRequestDiv');
            setIcon(faBell);
        } else {
            setText(isNorwegian ? 'Skru på varsler' : 'Enable notifications');
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
                    : isNorwegian
                    ? 'Endre ved å trykke på hengelåsikonet i adresselinjefeltet.'
                    : 'This can be reset by clicking the lock icon next to the URL.'
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
