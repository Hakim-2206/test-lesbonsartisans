import React, {createContext, useState, useContext} from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(authService.getCurrentUser());

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        setUser(data.username);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
