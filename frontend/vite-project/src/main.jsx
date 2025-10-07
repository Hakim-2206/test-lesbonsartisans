import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.js";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </AuthProvider>
    </Provider>,
)
