import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isloading, setIsLoading] = useState(true);

    // login by google
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user);
        } catch (error) {
            console.error("Google login error: ", error);
        }
    };

    const logout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);
    const value = {
        currentUser,
        loginWithGoogle,
        logout,
    };

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
        } else {
            setCurrentUser(null);
        }
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
