import React from 'react';
import ProductList from './components/ProductList';
import Login from "./pages/Login.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {BrowserRouter, Routes, Route} from "react-router";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path={"/"} element={<ProductList/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>

    );
}

export default App;