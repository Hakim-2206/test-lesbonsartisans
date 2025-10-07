import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, Snackbar, Alert} from '@mui/material';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router';

const Header = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'info'});

    const handleLogout = () => {
        logout();
        setSnackbar({open: true, message: 'Déconnexion réussie', severity: 'success'});
        navigate('/login');
    };

    const handleCloseSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    borderRadius: 3,
                    mx: 2,
                    mt: 1,
                    width: 'auto',
                    maxWidth: '1200px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        CRUD App
                    </Typography>
                    {user ? (
                        <>
                            <Typography color="white" sx={{mr: 2}}>Hello, {user}</Typography>
                            <Button color="inherit" onClick={handleLogout}>Se déconnecter</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>Se connecter</Button>
                    )}
                </Toolbar>
            </AppBar>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Header;
