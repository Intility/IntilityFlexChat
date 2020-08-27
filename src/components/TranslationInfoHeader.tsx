import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const TranslationInfoHeader: React.FC = () => {
    return (
        <div
            style={{
                backgroundColor: 'rgba(100,100,100,0.2)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px 0 10px',
            }}
        >
            <FontAwesomeIcon icon={faInfoCircle} />
            <p style={{ margin: '2px', paddingLeft: '5px' }}>
                Automatic translation, errors may occur.
            </p>
        </div>
    );
};

export default TranslationInfoHeader;
