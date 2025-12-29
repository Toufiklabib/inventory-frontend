import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { createContext, useEffect, useRef, useState } from 'react';
import auth from '../../../src/firebase/firebase.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isSigningUp = useRef(false);

    const createUser = async (email, password) => {
        setLoading(true);
        isSigningUp.current = true;
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Immediately logout after signup
            await signOut(auth);
            isSigningUp.current = false;
            setLoading(false);
            return result;
        } catch (error) {
            isSigningUp.current = false;
            setLoading(false);
            throw error;
        }
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };


    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // Don't update user state during signup process
            if (!isSigningUp.current) {
                setUser(currentUser);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        resetPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};