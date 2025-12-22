// firebase.config.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  UserCredential,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Firebase Configuration Type
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Authentication Response Types
interface AuthSuccessResponse {
  success: true;
  user: User;
}

interface AuthErrorResponse {
  success: false;
  error: unknown;
}

type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

interface LogoutSuccessResponse {
  success: true;
}

interface LogoutErrorResponse {
  success: false;
  error: unknown;
}

type LogoutResponse = LogoutSuccessResponse | LogoutErrorResponse;

// Firebase Configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Authentication
const auth: Auth = getAuth(app);

// Initialize Providers
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
const facebookProvider: FacebookAuthProvider = new FacebookAuthProvider();
const githubProvider: GithubAuthProvider = new GithubAuthProvider();

// Configure provider scopes
googleProvider.addScope("profile");
googleProvider.addScope("email");
facebookProvider.addScope("email");
facebookProvider.addScope("public_profile");
githubProvider.addScope("user");

// Authentication Functions
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error({
      message: "Google Sign-In Error",
      error: error,
      context: {
        provider: "google",
        timestamp: new Date().toISOString(),
      },
    });
    return { success: false, error };
  }
};

export const signInWithFacebook = async (): Promise<AuthResponse> => {
  try {
    const result: UserCredential = await signInWithPopup(
      auth,
      facebookProvider
    );
    return { success: true, user: result.user };
  } catch (error) {
    console.error({
      message: "Facebook Sign-In Error",
      error: error,
      context: {
        provider: "facebook",
        timestamp: new Date().toISOString(),
      },
    });
    return { success: false, error };
  }
};

export const signInWithGithub = async (): Promise<AuthResponse> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, githubProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error({
      message: "GitHub Sign-In Error",
      error: error,
      context: {
        provider: "github",
        timestamp: new Date().toISOString(),
      },
    });
    return { success: false, error };
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error({
      message: "Sign-Out Error",
      error: error,
      context: {
        timestamp: new Date().toISOString(),
      },
    });
    return { success: false, error };
  }
};

export {
  app,
  auth,
  analytics,
  googleProvider,
  facebookProvider,
  githubProvider,
  onAuthStateChanged,
};

export type { User, AuthResponse, LogoutResponse };
export default app;
