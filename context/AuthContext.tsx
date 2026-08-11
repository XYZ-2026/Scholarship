"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface UserData {
  uid: string;
  email: string;
  fullName: string;
  createdAt: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalView: "login" | "register" | "forgot";
  setAuthModalView: (view: "login" | "register" | "forgot") => void;
  updateUserProfile: (fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth modal global states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register" | "forgot">("login");

  // Sign out helper
  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // Password reset helper
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Google Sign-In with Popup (stays on the same page)
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      const name = currentUser.displayName || currentUser.email?.split("@")[0] || "User";

      const profileData: UserData = {
        uid: currentUser.uid,
        email: currentUser.email || "",
        fullName: name,
        createdAt: new Date().toISOString(),
        emailVerified: currentUser.emailVerified,
      };

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, { fullName: name, email: currentUser.email }, { merge: true });
      } catch (e) {
        console.warn("Firestore save on Google login:", e);
      }

      setUserData(profileData);
      setShowAuthModal(false);
    } catch (e) {
      console.error("Google Sign-In Popup failed:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Update profile helper
  const updateUserProfile = async (fullName: string) => {
    if (!user) return;

    const updatedFields = {
      ...userData,
      fullName,
    } as UserData;

    setUserData(updatedFields);

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { fullName }, { merge: true });
    } catch (e) {
      console.warn("Firestore profile update failed:", e);
    }

    try {
      await updateProfile(user, { displayName: fullName });
    } catch (e) {
      console.error("Firebase auth updateProfile failed:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        let profileData: UserData | null = null;

        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            const name = data.fullName || currentUser.displayName || currentUser.email?.split("@")[0] || "User";
            profileData = {
              uid: currentUser.uid,
              email: currentUser.email || "",
              fullName: name,
              createdAt: data.createdAt || new Date().toISOString(),
              emailVerified: currentUser.emailVerified,
            };
          }
        } catch (e) {
          console.warn("Firestore fetch failed:", e);
        }

        if (!profileData) {
          profileData = {
            uid: currentUser.uid,
            email: currentUser.email || "",
            fullName: currentUser.displayName || currentUser.email?.split("@")[0] || "User",
            createdAt: new Date().toISOString(),
            emailVerified: currentUser.emailVerified,
          };
        }

        setUserData(profileData);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        logout,
        resetPassword,
        showAuthModal,
        setShowAuthModal,
        authModalView,
        setAuthModalView,
        updateUserProfile,
        loginWithGoogle,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
