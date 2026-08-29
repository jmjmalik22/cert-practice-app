import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    // Send verification email
    try {
      await sendEmailVerification(userCredential.user);
      console.log("Verification email sent successfully to:", email);
    } catch (error) {
      console.error("Error sending verification email:", error.message, error.code);
      // Don't throw - let user continue even if email fails
    }
    return userCredential.user;
  };

  // Sign in with email and password
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Reload to get latest emailVerified status
    await reload(userCredential.user);
    return userCredential.user;
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  // Refresh user data (to check if email is verified)
  const refreshUser = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser);
      setUser(auth.currentUser);
    }
  };

  // Sign out
  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    resendVerificationEmail,
    refreshUser,
    isAuthenticated: !!user && user.emailVerified, // Require email verification for full access
    isEmailVerified: user?.emailVerified ?? false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
