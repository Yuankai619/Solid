import {
    useState,
    createContext,
    useContext,
    useEffect,
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
    const [token, setToken] = useState(null);
    const [googleId, setGoogleId] = useState(null);
    const [gmail, setGmail] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    // login by google
    const loginWithGoogle = async () => {
        setisLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google login success: ", result);
        } catch (error) {
            console.error("Google login error: ", error);
        }
    };

    const logout = async () => {
        try {
            setisLoading(true);
            await signOut(auth);
            setCurrentUser(null);
            setToken(null);
            setGoogleId(null);
            setGmail(null);
            setAvatarUrl(null);

        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    useEffect(() => {
        console.log("AuthProvider mounted");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed: ", user);
            if (user) {
                setCurrentUser(user);
                setGoogleId(user.uid);
                setCurrentUser(user);
                setGmail(user.email);
                setAvatarUrl(user.photoURL);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
            }
            setisLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isLoading,
        token,
        googleId,
        gmail,
        avatarUrl,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
