import React from 'react';


export const StatusData = ({ status }) => {
    let statusMessage = '';

    switch (status) {
        case 'fetching':
            statusMessage = 'Fetching weather data';
            break;
        case 'unable':
            statusMessage = 'Unable to retrieve location';
            break;
        case 'unsupported':
            statusMessage = 'Location tracking not supported or blocked';
            break;
        default:
            statusMessage = '';
            break;
    }

    return (
        <h3 className="status-message">{statusMessage}</h3>
    );
}