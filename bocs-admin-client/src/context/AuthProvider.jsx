
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
    });
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;