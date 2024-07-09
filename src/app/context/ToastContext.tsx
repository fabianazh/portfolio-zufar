import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'
import { toast, ToastOptions } from 'react-toastify'

interface ToastContextType {
    showToast: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const defaultOptions: ToastOptions = {
        type: 'success',
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    }

    const [message, setMessage] = useState<string | null>(null)
    const [options, setOptions] = useState<ToastOptions | undefined>(
        defaultOptions
    )

    const showToast = (message: string, options?: ToastOptions) => {
        setMessage(message)
        setOptions({ ...defaultOptions, ...options })
    }

    useEffect(() => {
        if (message) {
            toast(message, options)
            setMessage(null)
            setOptions(defaultOptions)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, options])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
