import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {Container, TextField, Button, Typography, Box, Alert, CircularProgress} from '@mui/material';
import * as authService from '../services/authService';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!username || !password || !confirm) {
            setError('Tous les champs sont obligatoires.');
            return;
        }
        if (password !== confirm) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        setLoading(true);
        try {
            await authService.register(username, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 1500); // Redirige après succès
        } catch (err) {
            setError(err.response?.data?.message || 'Inscription échouée');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant="h5" align="center">Inscription</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Inscription réussie! Redirection...</Alert>}
                <TextField label="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)}
                           fullWidth/>
                <TextField label="Mot de passe" type="password" value={password}
                           onChange={e => setPassword(e.target.value)} fullWidth/>
                <TextField label="Confirmez le mot de passe" type="password" value={confirm}
                           onChange={e => setConfirm(e.target.value)} fullWidth/>
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={20}/> : "S'inscrire"}
                </Button>
                <Button variant="text" onClick={() => navigate('/login')}>Déjà inscrit ? Se connecter</Button>
            </Box>
        </Container>
    );
};

export default Register;
