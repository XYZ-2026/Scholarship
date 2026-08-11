"use client";

import React, { useState } from "react";
import { useAuth, UserData } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import {
  IconX,
  IconMail,
  IconLock,
  IconUser,
  IconChevronRight,
  IconAlertCircle,
  IconChecks,
} from "@tabler/icons-react";

export default function AuthModal() {
  const {
    showAuthModal,
    setShowAuthModal,
    authModalView,
    setAuthModalView,
    resetPassword,
    loginWithGoogle,
    setUserData,
  } = useAuth();

  // Common loading / error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Legal Checkboxes States
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  if (!showAuthModal) return null;

  const handleClose = () => {
    setShowAuthModal(false);
    setError("");
    setSuccess("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Successfully signed in!");
      setTimeout(() => {
        handleClose();
      }, 800);
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password credentials.");
      } else {
        setError(err.message || "Failed to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      setLoading(false);
      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      setError("You must accept the Terms & Conditions and Privacy Policy to sign up.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Set profile name in Firebase Auth
      await updateProfile(user, { displayName: fullName.trim() });

      // 3. Build profile record
      const profileData: UserData = {
        uid: user.uid,
        email: user.email || "",
        fullName: fullName.trim(),
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified,
      };

      // 4. Save to Firestore
      try {
        await setDoc(doc(db, "users", user.uid), profileData);
      } catch (firestoreErr) {
        console.error("Firestore save failed:", firestoreErr);
      }

      setUserData(profileData);

      setSuccess("Account successfully created!");
      setTimeout(() => {
        handleClose();
      }, 800);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await resetPassword(email);
      setSuccess("A password reset link has been sent to your inbox.");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await loginWithGoogle();
      setSuccess("Successfully signed in with Google!");
      setTimeout(() => {
        handleClose();
      }, 800);
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Popup closed by user before finishing authentication.");
      } else if (err.code === "auth/blocked-by-client") {
        setError("Popup was blocked by your browser. Please enable popups in your address bar.");
      } else {
        setError(err.message || "Failed to authenticate via Google popup.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-[Poppins]">
      {/* Glass backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-[#1A1817]/40 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-[440px] bg-white border border-[#E7E2DE] rounded-[24px] overflow-hidden shadow-2xl z-10 transition-all duration-300 transform scale-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EBE6E2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#690B1B]" />
            <h2 className="text-[15px] font-bold text-[#111] uppercase tracking-wider">
              {authModalView === "login"
                ? "Sign In to Your Account"
                : authModalView === "register"
                ? "Create an Account"
                : "Reset Password"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#F6F4F2] hover:bg-[#690B1B]/10 hover:text-[#690B1B] text-[#888] flex items-center justify-center transition-all cursor-pointer"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-5">
          {/* Status alerts */}
          {error && (
            <div className="bg-[#FDF2F2] border border-[#FCD4D4] rounded-xl px-4 py-3 flex items-start gap-2.5 text-[12.5px] text-[#C23B3B] leading-relaxed">
              <IconAlertCircle className="shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-[#EAFDF1] border border-[#BFF6CD] rounded-xl px-4 py-3 flex items-start gap-2.5 text-[12.5px] text-[#0F8A43] leading-relaxed">
              <IconChecks className="shrink-0 mt-0.5" size={18} />
              <span>{success}</span>
            </div>
          )}

          {/* VIEW: LOGIN */}
          {authModalView === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-bold text-[#555] tracking-wide uppercase">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A5A5A5] pointer-events-none">
                    <IconMail size={17} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-[46px] rounded-xl bg-[#FAFAF9] border border-[#E7E2DE] focus:border-[#690B1B] pl-10 pr-4 text-[13.5px] text-[#111] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11.5px] font-bold text-[#555] tracking-wide uppercase">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalView("forgot");
                      setError("");
                      setSuccess("");
                    }}
                    className="text-[11.5px] font-semibold text-[#690B1B] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A5A5A5] pointer-events-none">
                    <IconLock size={17} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[46px] rounded-xl bg-[#FAFAF9] border border-[#E7E2DE] focus:border-[#690B1B] pl-10 pr-4 text-[13.5px] text-[#111] outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] rounded-xl bg-[#690B1B] text-white text-[14px] font-bold shadow-md hover:bg-[#7A1022] active:scale-[0.99] flex items-center justify-center gap-1 transition-all cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <IconChevronRight size={16} />
                  </>
                )}
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#ECE6E2]"></div>
                <span className="flex-shrink mx-4 text-[#A5A5A5] text-[10px] font-bold tracking-wider uppercase">Or Continue With</span>
                <div className="flex-grow border-t border-[#ECE6E2]"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-[48px] rounded-xl border border-[#E7E2DE] hover:border-[#690B1B]/40 hover:bg-[#FAFAF9] text-[#333] text-[13.5px] font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="text-center pt-2">
                <span className="text-[13px] text-[#888]">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("register");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[13px] font-bold text-[#690B1B] hover:underline"
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* VIEW: REGISTER */}
          {authModalView === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-bold text-[#555] tracking-wide uppercase">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A5A5A5] pointer-events-none">
                    <IconUser size={17} />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-[46px] rounded-xl bg-[#FAFAF9] border border-[#E7E2DE] focus:border-[#690B1B] pl-10 pr-4 text-[13.5px] text-[#111] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-bold text-[#555] tracking-wide uppercase">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A5A5A5] pointer-events-none">
                    <IconMail size={17} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-[46px] rounded-xl bg-[#FAFAF9] border border-[#E7E2DE] focus:border-[#690B1B] pl-10 pr-4 text-[13.5px] text-[#111] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-bold text-[#555] tracking-wide uppercase">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A5A5A5] pointer-events-none">
                    <IconLock size={17} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full h-[46px] rounded-xl bg-[#FAFAF9] border border-[#E7E2DE] focus:border-[#690B1B] pl-10 pr-4 text-[13.5px] text-[#111] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Legal Checkboxes */}
              <div className="space-y-2.5 pt-2 text-left">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#E7E2DE] text-[#690B1B] focus:ring-[#690B1B]"
                  />
                  <span className="text-[12px] text-[#555] leading-snug">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-[#690B1B] font-bold hover:underline">
                      Terms and Conditions
                    </Link>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#E7E2DE] text-[#690B1B] focus:ring-[#690B1B]"
                  />
                  <span className="text-[12px] text-[#555] leading-snug">
                    I agree to the{" "}
                    <Link href="/privacy" target="_blank" className="text-[#690B1B] font-bold hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] rounded-xl bg-[#690B1B] text-white text-[14px] font-bold shadow-md hover:bg-[#7A1022] active:scale-[0.99] flex items-center justify-center gap-1 transition-all cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <IconChevronRight size={16} />
                  </>
                )}
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#ECE6E2]"></div>
                <span className="flex-shrink mx-4 text-[#A5A5A5] text-[10px] font-bold tracking-wider uppercase">Or Continue With</span>
                <div className="flex-grow border-t border-[#ECE6E2]"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-[48px] rounded-xl border border-[#E7E2DE] hover:border-[#690B1B]/40 hover:bg-[#FAFAF9] text-[#333] text-[13.5px] font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="text-center pt-1.5">
                <span className="text-[13px] text-[#888]">Already registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("login");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[13px] font-bold text-[#690B1B] hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {authModalView === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-bold text-[#555] tracking-wide uppercase">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A5A5A5] pointer-events-none">
                    <IconMail size={17} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-[46px] rounded-xl bg-[#FAFAF9] border border-[#E7E2DE] focus:border-[#690B1B] pl-10 pr-4 text-[13.5px] text-[#111] outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] rounded-xl bg-[#690B1B] text-white text-[14px] font-bold shadow-md hover:bg-[#7A1022] active:scale-[0.99] flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Password Reset Link <IconChevronRight size={16} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalView("login");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[13px] font-bold text-[#690B1B] hover:underline"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
