"use client"

import { useForm } from "react-hook-form"

export default function ContactForm() {
    const { register, handleSubmit } = useForm<FormData>()

    function sendEmail(data: FormData) {
        const apiEndpoint = "/api/email"

        fetch(apiEndpoint, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((response) => {
                alert(response.message)
            })
            .catch((err) => {
                alert(err)
            })
    }

    function onSubmit(data: FormData) {
        sendEmail(data)
    }
    return <></>
}
