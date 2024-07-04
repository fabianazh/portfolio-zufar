'use client'

import { loginSchema } from '@/zodSchema/route'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { BackgroundBeams } from '../../Other/BackgroundBeams'
import Link from 'next/link'
import { BsGoogle } from 'react-icons/bs'
import AppIcon from '../../Other/AppIcon'
import Loaders from '../../Other/Loader'

type FormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const {
        handleSubmit,
        register,
        reset,
        setError,
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
            }
        } catch (error) {
            console.log(error)
            reset()
        }
    }

    return (
        <section className="fixed top-0 left-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row">
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
                    <h1 className="block font-extrabold text-4xl">
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
                        <div className="relative h-fit flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="block text-sm text-gray-600 px-1"
                            >
                                Email
                            </label>
                            <input
                                {...register('email', {
                                    required: true,
                                })}
                                id="email"
                                type="email"
                                name="email"
                                className="peer h-fit w-full bg-stone-50 shadow-sm px-4 py-2.5 rounded text-gray-900 text-sm focus:border-gary-500 focus:outline-none"
                                placeholder="Masukan Email"
                                autoComplete="off"
                            />
                        </div>
                        {/* Email Input */}
                        {/* Password Input */}
                        <div className="relative h-fit flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="block text-sm text-gray-600 px-1"
                            >
                                Password
                            </label>
                            <input
                                {...register('password', {
                                    required: true,
                                })}
                                id="password"
                                type="password"
                                name="password"
                                className="peer h-fit w-full bg-stone-50 shadow-sm px-4 py-2.5 rounded text-gray-900 text-sm focus:border-gary-500 focus:outline-none"
                                placeholder="Masukan Password"
                                autoComplete="off"
                            />
                        </div>
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
                    <button
                        type="submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                        className="flex justify-center text-center items-center w-full cursor-pointer text-sm rounded bg-black text-white py-2"
                    >
                        {isSubmitting ? <Loaders /> : 'Login'}
                    </button>
                    {/* Submit Button */}

                    <div className="w-full h-fit flex justify-center relative items-center py-1">
                        <span className="z-10 bg-white px-3 text-sm">Atau</span>
                        <div className="absolute w-full bg-stone-400 h-0.5" />
                    </div>

                    <Link
                        href={'/'}
                        className="flex justify-center items-center gap-2 w-full cursor-pointer text-sm rounded bg-transparent border-2 py-2 font-medium"
                    >
                        <BsGoogle className="text-xs" /> Login dengan Google
                    </Link>
                </form>
            </div>
            {/* Form */}
        </section>
    )
}
