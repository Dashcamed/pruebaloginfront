"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Page() {
    const { logout, user } = useAuth();
    const router = useRouter();
    const { handleSubmit } = useForm();
    const onSubmit = async () => {
        try {
            await logout();
            router.push("/user");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section className="min-h-screen flex flex-col items-center justify-center">
            <h2>Bienvenido {user?.email} a tu perfil</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button className="btn btn-neutral mt-4">Logout</button>
            </form>
        </section>
    );
};