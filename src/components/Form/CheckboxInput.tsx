'use client'

import { forwardRef } from 'react'
import { CheckboxInputProps } from '@/interfaces/component'

const CheckboxInput = forwardRef<HTMLTextAreaElement, CheckboxInputProps>(
    function CheckboxInput(
        {
            className,
            labelClassName,
            descClassName,
            inputClassName,
            id,
            label,
            desc,
            error,
            options,
            register,
            ...rest
        },
        ref
    ) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="font-medium">{label}</label>
                <div className="flex flex-wrap gap-4">
                    {options.map((option, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={option.value.id}
                                {...register}
                                className="form-checkbox"
                                {...rest}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        )
    }
)

export default CheckboxInput
