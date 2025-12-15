import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/user";

// 1. Export interface
export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (user: User, rememberMe: boolean) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = "user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const sessionUser = sessionStorage.getItem(STORAGE_KEY);
                const localUser = localStorage.getItem(STORAGE_KEY);
                const storedUser = sessionUser || localUser;

                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser) as User;
                    if (parsedUser && parsedUser.id && parsedUser.email) {
                        setUser(parsedUser);
                    } else {
                        localStorage.removeItem(STORAGE_KEY);
                        sessionStorage.removeItem(STORAGE_KEY);
                    }
                }
            } catch (error) {
                console.error("Failed to restore user data:", error);
                localStorage.removeItem(STORAGE_KEY);
                sessionStorage.removeItem(STORAGE_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        restoreUser();
    }, []);

    const login = (userData: User, rememberMe: boolean) => {
        setUser(userData);
        try {
            const userString = JSON.stringify(userData);
            if (rememberMe) {
                localStorage.setItem(STORAGE_KEY, userString);
                sessionStorage.removeItem(STORAGE_KEY);
            } else {
                sessionStorage.setItem(STORAGE_KEY, userString);
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error("Failed to store user data:", error);
        }
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Failed to remove user data:", error);
        }
    };

    const updateUser = (userData: User) => {
        setUser(userData);
        try {
            const userString = JSON.stringify(userData);
            const sessionUser = sessionStorage.getItem(STORAGE_KEY);
            const localUser = localStorage.getItem(STORAGE_KEY);
            if (sessionUser) {
                sessionStorage.setItem(STORAGE_KEY, userString);
            } else if (localUser) {
                localStorage.setItem(STORAGE_KEY, userString);
            }
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    };

    const value: AuthState = {
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        logout,
        updateUser,
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
