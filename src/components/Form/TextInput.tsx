'use client'

import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

export default function TextInput({
    className = '',
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div className={`relative h-fit flex flex-col gap-1.5 ${className}`}>
            {children}
        </div>
    )
}

function Label({
    id,
    className,
    children,
}: {
    id: string
    className?: string
    children: React.ReactNode
}) {
    return (
        <label
            htmlFor={id}
            className={`block text-sm text-gray-700 font-medium px-1 ${className}`}
        >
            {children}
        </label>
    )
}

function Desc({
    className = '',
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return <></>
}

function Input({
    id,
    type,
    name,
    placeholder,
    register,
    required = false,
    className = '',
    value,
    onChange,
    ...rest
}: {
    id: string
    type: string
    name: string
    placeholder: string
    register: UseFormRegister<any>
    required?: boolean
    className?: string
    value?: any
    [x: string]: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const [inputValue, setInputValue] = useState(value)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <input
            {...register(name, { required })}
            id={id}
            type={type}
            name={name}
            onChange={handleChange}
            value={inputValue}
            className={`peer h-fit w-full bg-stone-100/80 shadow-sm px-4 py-2.5 rounded text-gray-900 text-sm focus:border-gray-500 focus:outline-none ${className}`}
            placeholder={placeholder}
            autoComplete="off"
            {...rest}
        />
    )
}

TextInput.Label = Label
TextInput.Desc = Desc
TextInput.Input = Input
