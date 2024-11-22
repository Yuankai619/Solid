import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
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
            await signInWithPopup(auth, provider);
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
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log('user = ', user);
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);
    const value = {
        currentUser,
        loginWithGoogle,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
