import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#00695f',
        },
        secondary: {
            main: '#f57c00',
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#37474f',
            secondary: '#607d8b',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            color: '#004d40',
        },
        body1: {
            color: '#455a64',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 20px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#00695f',
                    '&:hover': {
                        backgroundColor: '#004d40',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#00695f',
                    color: '#00695f',
                    '&:hover': {
                        borderColor: '#004d40',
                        backgroundColor: 'rgba(0, 77, 64, 0.04)',
                    },
                },
                outlinedError: {
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    '&:hover': {
                        borderColor: '#9a0007',
                        backgroundColor: 'rgba(154, 0, 7, 0.04)',
                    },
                },
            },
        },
    },
});

export default theme;