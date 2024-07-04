'use client'

import { useForm } from 'react-hook-form'

export default function ContactForm() {
    const { register, handleSubmit, reset } = useForm<FormData>()

    function sendEmail(data: FormData) {
        const apiEndpoint = '/api/email'

        fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((response) => {
                alert(response.message)
                reset()
            })
            .catch((err) => {
                alert(err)
            })
    }

    function onSubmit(data: FormData) {
        sendEmail(data)
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-fit flex flex-col gap-4 z-0"
            >
                <div className="w-full h-fit flex flex-col">
                    <div className="w-full grid grid-flow-row lg:grid-flow-col h-fit">
                        <div className="w-full border border-b-0 lg:border-b lg:border-r-0 border-black h-fit flex-grow">
                            <input
                                type="text"
                                id="name"
                                className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                {...register('name', { required: true })}
                                autoComplete="false"
                                placeholder="Nama"
                            />
                        </div>
                        <div className="w-full border border-black h-fit flex-grow">
                            <input
                                type="text"
                                id="email"
                                className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                {...register('email', { required: true })}
                                autoComplete="false"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="w-full h-fit border border-t-0 border-black">
                        <textarea
                            id="message"
                            rows={6}
                            className="w-full h-fit resize-none py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                            {...register('message', { required: true })}
                            placeholder="Pesan"
                            autoComplete="false"
                        ></textarea>
                    </div>
                </div>
                <div className="border border-black w-fit py-2 px-8">
                    <button type="submit">Kirim</button>
                </div>
            </form>
        </>
    )
}
