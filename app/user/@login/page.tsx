"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../context/configApi';

type LoginProps = {
    email: string;
    password: string;
};

export default function Page() {
    const {
        register, handleSubmit, formState: { errors } } = useForm<LoginProps>()
    const { login } = useAuth()
    const router = useRouter()
    const onSubmit = async (data: LoginProps) => {
        try {
            await login(data.email, data.password);
            router.push('/user')
        } catch (error) {
            console.error(error);
        }
    }

    return <section className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} action={`${API_URL}/api/session/login`} method="post">

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email"{...register('email')} />
                {errors.email && <p className="text-error">{errors.email.message}</p>}

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" {...register('password')} />
                {errors.password && <p className="text-error">{errors.password.message}</p>}

                <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </form>
    </section>
};

