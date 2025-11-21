import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/features/auth/types/auth.types";

// 1. Export interface
export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (user: User, rememberMe: boolean) => void;
    logout: () => void;
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

    const value: AuthState = {
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        logout,
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
