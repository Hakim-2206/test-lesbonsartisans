import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';

const ConfirmDialog = ({open, title, content, onCancel, onConfirm, confirmColor = 'error'}) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} color={confirmColor} variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
