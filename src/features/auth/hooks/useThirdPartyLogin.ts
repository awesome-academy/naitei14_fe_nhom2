import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
} from "@/firebase.config";
import { User } from "@/types/user";
import { API_BASE_URL } from "@/constants/common";

export const useThirdPartyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const mapFirebaseUserToAppUser = (firebaseUser: any): User => {
    return {
      id: firebaseUser.uid,
      fullName: firebaseUser.displayName || "Third Party User",
      phone: firebaseUser.phoneNumber || "",
      email: firebaseUser.email || "",
      emailVerified: true,
      role: "user",
      createdAt: new Date().toISOString(),
      active: true,
    };
  };

  const saveThirdPartyUserToDatabase = async (user: User): Promise<User> => {
    try {
      // Check if user already exists in database
      const checkResponse = await fetch(
        `${API_BASE_URL}/users?email=${encodeURIComponent(user.email)}`
      );

      if (!checkResponse.ok) {
        throw new Error(
          `User check failed with status ${checkResponse.status}`
        );
      }

      const existingUsers: User[] = await checkResponse.json();
      const existingUser = existingUsers.find((u) => u.email === user.email);

      if (existingUser) {
        // User already exists, return existing user
        return existingUser;
      }

      // User doesn't exist, create new user
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`User creation failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving third-party user:", error);
      return user;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithGoogle();

      if (result.success && result.user) {
        const appUser = mapFirebaseUserToAppUser(result.user);
        const savedUser = await saveThirdPartyUserToDatabase(appUser);
        authLogin(savedUser, true);
        navigate("/");
      } else {
        setError("Google login failed. Please try again.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithFacebook();

      if (result.success && result.user) {
        const appUser = mapFirebaseUserToAppUser(result.user);
        // Save user to database before login
        const savedUser = await saveThirdPartyUserToDatabase(appUser);
        authLogin(savedUser, true);
        navigate("/");
      } else {
        setError("Facebook login failed. Please try again.");
      }
    } catch (err) {
      console.error("Facebook login error:", err);
      setError("Facebook login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithGithub();

      if (result.success && result.user) {
        const appUser = mapFirebaseUserToAppUser(result.user);
        // Save user to database before login
        const savedUser = await saveThirdPartyUserToDatabase(appUser);
        authLogin(savedUser, true);
        navigate("/");
      } else {
        setError("GitHub login failed. Please try again.");
      }
    } catch (err) {
      console.error("GitHub login error:", err);
      setError("GitHub login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    handleFacebookLogin,
    handleGithubLogin,
    loading,
    error,
  };
};
