'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    labelClassName?: string
    descClassName?: string
    inputClassName?: string
    label: string
    desc?: string
    error?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput(
        {
            className,
            labelClassName,
            descClassName,
            inputClassName,
            id,
            label,
            desc,
            error,
            ...rest
        },
        ref
    ) {
        return (
            <fieldset
                className={`relative h-fit flex flex-col gap-1.5 ${className}`}
            >
                <label
                    htmlFor={id}
                    className={`block text-sm lg:text-base text-gray-700 font-medium px-1 ${labelClassName}`}
                >
                    {label}
                </label>
                {desc && (
                    <div className={`w-full h-fit text-xs ${descClassName}`}>
                        {desc}
                    </div>
                )}
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    className={`peer h-fit w-full px-4 py-2.5 rounded text-sm focus:border-gray-400 focus:outline-none border text-gray-900 bg-white disabled:bg-stone-100/80 ${inputClassName}`}
                    autoComplete="off"
                    {...rest}
                />
                {error && <span className="text-red-600 text-sm">{error}</span>}
            </fieldset>
        )
    }
)

export default TextInput
