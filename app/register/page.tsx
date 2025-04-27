"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { API_URL } from "../context/configApi";

type RegisterProps = {
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    password: string;
}

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterProps>()
    const router = useRouter()
    const onSubmit = async (data: RegisterProps) => {
        try {
            const res = await fetch(`${API_URL}/api/session/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log(data)
            if (res.ok) {
                router.push('/user')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return <section className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} action={`${API_URL}/api/session/register`} method="post">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register</legend>

                <label className="label">First Name</label>
                <input type="text" className="input" placeholder="name"  {...register('first_name')} />
                {errors.first_name && <p className="text-error">{errors.first_name.message}</p>}
                <label className="label">Last Name</label>
                <input type="text" className="input" placeholder="last name" {...register('last_name')} />
                {errors.last_name && <p className="text-error">{errors.last_name.message}</p>}
                <label className="label">Age</label>
                <input type="number" className="input" placeholder="age" {...register('age')} />
                {errors.age && <p className="text-error">{errors.age.message}</p>}
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-error">{errors.email.message}</p>}
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" {...register('password')} />
                {errors.password && <p className="text-error">{errors.password.message}</p>}
                <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
        </form>
    </section>
};