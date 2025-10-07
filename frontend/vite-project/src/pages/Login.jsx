import React, {useState} from 'react';
import {useNavigate} from 'react-router'
import {Container, TextField, Button, Typography, Box, Alert, CircularProgress, Snackbar} from '@mui/material';
import {useAuth} from '../context/AuthContext';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                navigate('/');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant="h5" align="center">Connexion</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField label="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)}
                           fullWidth/>
                <TextField label="Mot de passe" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} fullWidth/>
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={20}/> : 'Se connecter'}
                </Button>

                <Button variant="text" onClick={() => navigate('/register')}>Créer un compte</Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Box sx={{
                    bgcolor: 'success.main',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: 1,
                    boxShadow: 3
                }}>
                    <Typography>Connexion réussie !</Typography>
                    <CircularProgress size={20} color="inherit"/>
                </Box>
            </Snackbar>
        </Container>
    );
};

export default Login;
