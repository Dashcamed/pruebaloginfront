"use client"

import { useAuth } from "./context/AuthContext"
import Link from "next/link"
export default function Page() {
    const { user } = useAuth()
    return <>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hola!</h1>
                    <p className="py-6">
                        Este es un front para probar un login desde un backend con express.
                    </p>
                    {!user && <Link href="/user/" className="btn btn-primary mx-2">Ir al Login</Link>}

                    {!user && <Link href="/register/" className="btn btn-primary mx-2">Registrarse</Link>}
                    {user && <Link href="/user/" className="btn btn-primary mx-2">Ir a perfil</Link>}
                </div>
            </div>
        </div>
    </>
}