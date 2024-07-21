'use client'

import { forwardRef } from 'react'
import { SelectProps } from '@/interfaces/component'

const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
    function SelectInput(
        {
            id,
            error,
            label,
            defaultValue,
            options,
            className,
            labelClassName,
            desc,
            descClassName,
            inputClassName,
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
                    className={`inline-block w-fit text-sm lg:text-base text-gray-700 font-medium px-1 ${labelClassName}`}
                >
                    {label}
                </label>
                {desc && (
                    <div className={`w-full h-fit text-xs ${descClassName}`}>
                        {desc}
                    </div>
                )}
                <select
                    ref={ref}
                    id={id}
                    name={id}
                    className={`peer h-fit w-full px-4 py-2.5 rounded text-sm focus:border-gray-400 focus:outline-none border text-gray-900 bg-white disabled:bg-stone-100/80 read-only:cursor-auto ${inputClassName}`}
                    {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
                >
                    <option value="">{defaultValue}</option>
                    {options.map((item, index) => (
                        <option value={item.value} key={index}>
                            {item.label}
                        </option>
                    ))}
                </select>
                {error && <span className="text-red-600 text-sm">{error}</span>}
            </fieldset>
        )
    }
)

export default SelectInput
