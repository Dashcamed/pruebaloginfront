"use client"
import { API_URL } from "./configApi";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import LoadingBar from "../components/loaders/LoadingBar";

type User = {
    email: string;
    role: "user";
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // Session check
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/user/current`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser({ email: data.payload.email, role: data.payload.role });
                    setIsAuthenticated(true);
                    setIsLoading(false);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    setIsLoading(false);

                }
            } catch {
                setUser(null);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/api/session/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            const userRes = await fetch(`${API_URL}/api/user/current`, {
                credentials: "include",
            });
            if (userRes.ok) {
                const data = await userRes.json();
                setUser({ email: data.payload.email, role: data.payload.role });
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
            }
        } else {
            throw new Error("Login failed");
        }
    };

    // Logout function
    const logout = async () => {
        setIsLoading(true);
        await fetch(`${API_URL}/api/session/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    };

    if (isLoading) return <LoadingBar />;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};