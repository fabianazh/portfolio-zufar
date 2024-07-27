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
    children: React.ReactNode
}

export interface ReactSelectProps extends SelectProps {
    isMulti: boolean
}

export interface FileInputHandle {
    resetPreview: () => void
    getFiles: () => FileList | null
}

export interface FileInputProps extends InputProps {
    accept?: string
    multiple?: boolean
}

export interface DateInputProps extends InputProps {
    min?: string
    max?: string
}

export interface CheckboxInputProps extends InputProps {
    children: React.ReactNode
}

export interface TextareaInputProps
    extends InputHTMLAttributes<HTMLTextAreaElement> {
    className?: string
    labelClassName?: string
    descClassName?: string
    inputClassName?: string
    label: string
    desc?: string
    error?: string
    rows?: number
}
