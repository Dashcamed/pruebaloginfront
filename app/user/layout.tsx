"use client"
import { useAuth } from "../context/AuthContext";

export default function Layout({ children, login }: { children: React.ReactNode, login: React.ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    if (!user) return login;
    if (!isAuthenticated) return login;
    return <div>{children}</div>
}

