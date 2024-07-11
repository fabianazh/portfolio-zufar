'use client'

import { loginSchema } from '@/zodSchema/route'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { BackgroundBeams } from '@/components/Other/BackgroundBeams'
import Link from 'next/link'
import { BsGoogle } from 'react-icons/bs'
import AppIcon from '@/components/Icon/AppIcon'
import Loaders from '@/components/Other/Loader'
import PrimaryButton from '@/components/Button/PrimaryButton'
import TextInput from '@/components/Form/TextInput'

type FormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const {
        handleSubmit,
        register,
        reset,
        setError,
        resetField,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    })

    const router = useRouter()

    async function onSubmit(data: FormData) {
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: '/dashboard',
            })

            if (!res?.error) {
                reset()
                router.push('/dashboard')
            } else {
                setError('root', {
                    message: 'Email atau password salah!',
                })
                resetField('password')
            }
        } catch (error) {
            reset()
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col lg:flex-row">
            {/* Background */}
            <div className="z-10 absolute bg-white w-screen h-screen top-0 left-0">
                <BackgroundBeams />
            </div>
            {/* Background */}

            <div className="w-full lg:w-8/12 hidden lg:flex flex-col h-full z-20 bg-transparent p-8 py-4 justify-end">
                <AppIcon size="lg" role={false} />
            </div>

            {/* Form */}
            <div className="w-full lg:w-4/12 flex flex-col h-full items-center z-20 bg-transparent lg:backdrop-blur-sm lg:shadow py-24">
                <div>
                    <h1 className="block font-extrabold text-5xl lg:text-4xl">
                        Welcome Back!
                    </h1>
                </div>
                <form
                    className="w-11/12 lg:w-10/12 mt-16 flex flex-col gap-5"
                    action=""
                    method="POST"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {errors.root && (
                        <>
                            <span className="text-sm lg:text-sm text-red-600">
                                {errors.root.message}
                            </span>
                        </>
                    )}
                    <div className="flex flex-col gap-6">
                        {/* Email Input */}
                        <TextInput
                            {...register('email')}
                            label="Email"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Masukan Email Kontak"
                            required
                        />
                        {/* Email Input */}
                        {/* Password Input */}
                        <TextInput
                            {...register('password')}
                            label="Password"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Masukan Password Kontak"
                            required
                        />
                        {/* Password Input */}
                    </div>

                    {/* Forget Password */}
                    <Link
                        href={'/auth/forget-password'}
                        className="text-black text-sm font-medium inline-block w-fit place-self-end"
                    >
                        Lupa password?
                    </Link>
                    {/* Forget Password */}

                    {/* Submit Button */}
                    <PrimaryButton
                        type="submit"
                        theme="black"
                        disabled={isSubmitting}
                        className="w-full grid place-items-center"
                    >
                        {isSubmitting ? <Loaders /> : 'Login'}
                    </PrimaryButton>
                    {/* Submit Button */}

                    <div className="w-full h-fit flex justify-center relative items-center py-1">
                        <span className="z-10 bg-white px-3 text-sm">Atau</span>
                        <div className="absolute w-full bg-stone-400 h-0.5" />
                    </div>

                    <PrimaryButton
                        onClick={() => signIn('google')}
                        theme="white"
                        className="flex justify-center items-center gap-2 w-full"
                    >
                        <BsGoogle className="text-xs" /> Login dengan Google
                    </PrimaryButton>
                </form>
            </div>
            {/* Form */}
        </section>
    )
}
