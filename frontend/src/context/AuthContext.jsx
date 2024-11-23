import {
    useState,
    createContext,
    useContext,
    useEffect,
    useCallback,
} from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    // login by google
    const loginWithGoogle = async () => {
        setisLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user);
            console.log("Google login success: ", result);
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed: ", user);
            setCurrentUser(user);
            setisLoading(false);
            console.log("Auth isLoading changed: ", isLoading);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isLoading,
        loginWithGoogle,
        logout,
    };
    console.log("Auth value: ", value);
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
