'use client'

import { forwardRef } from 'react'
import { TextareaInputProps } from '@/interfaces/component'

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
    function TextareaInput(
        {
            className,
            labelClassName,
            descClassName,
            inputClassName,
            id,
            label,
            desc,
            error,
            rows,
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
                    className={`inline-block w-fit text-sm text-gray-700 font-medium px-1 ${labelClassName}`}
                >
                    {label}
                </label>
                {desc && (
                    <div className={`w-full h-fit text-xs ${descClassName}`}>
                        {desc}
                    </div>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    name={id}
                    rows={rows ? rows : 4}
                    className={`peer h-fit w-full px-4 py-2.5 rounded text-sm focus:border-gray-400 focus:outline-none border text-gray-900 bg-white disabled:bg-stone-100/80 read-only:cursor-auto ${inputClassName}`}
                    autoComplete="off"
                    {...rest}
                />
                {error && <span className="text-red-600 text-sm">{error}</span>}
            </fieldset>
        )
    }
)

export default TextareaInput
