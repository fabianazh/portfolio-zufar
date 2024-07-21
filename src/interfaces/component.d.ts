import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    labelClassName?: string
    descClassName?: string
    inputClassName?: string
    label: string
    desc?: string
    error?: string
}

export interface SelectProps extends InputProps {
    options: {
        value: string
        label: string
    }[]
}

export interface ReactSelectProps extends SelectProps {
    isMulti: boolean
}

export interface FileInputProps extends InputProps {
    accept?: string
    multiple?: boolean
}

export interface DateInputProps extends InputProps {
    min?: string
    max?: string
}