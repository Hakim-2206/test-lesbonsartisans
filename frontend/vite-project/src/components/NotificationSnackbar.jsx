import React from 'react';
import {Snackbar, Alert} from '@mui/material';

const NotificationSnackbar = ({open, onClose, severity = 'info', message}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={onClose} severity={severity} elevation={6} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationSnackbar;
