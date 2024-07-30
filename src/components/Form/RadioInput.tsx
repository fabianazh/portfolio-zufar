'use client'

import { forwardRef } from 'react'
import { RadioInputProps } from '@/interfaces/component'

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
    function RadioInput(
        {
            className,
            labelClassName,
            descClassName,
            inputClassName,
            id,
            label,
            desc,
            error,
            children,
            ...rest
        },
        ref
    ) {
        return (
            <fieldset
                className={`relative w-full lg:w-6/12 h-auto flex flex-col gap-3.5 ${className}`}
            >
                <label
                    className={`inline-block w-fit text-sm text-gray-700 font-medium px-1 ${labelClassName}`}
                >
                    {label}
                </label>
                {desc && (
                    <div className={`w-full h-fit text-xs ${descClassName}`}>
                        {desc}
                    </div>
                )}
                <div className="flex flex-wrap gap-4 h-auto">{children}</div>
                {error && <span className="text-red-600 text-sm">{error}</span>}
            </fieldset>
        )
    }
)

export default RadioInput
