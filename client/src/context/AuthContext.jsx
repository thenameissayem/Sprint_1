import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const getUserFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(getUserFromStorage());


    const updateUser = (data) =>{
        setCurrentUser(data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
