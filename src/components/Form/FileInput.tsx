'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import { FileInputProps } from '@/interfaces/component'
import Image from 'next/image'

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    function FileInput(
        {
            className,
            labelClassName,
            descClassName,
            inputClassName,
            id,
            label,
            desc,
            error,
            accept,
            multiple,
            onChange,
            ...rest
        },
        ref
    ) {
        const [preview, setPreview] = useState<string[]>([])

        useImperativeHandle(ref, () => ({
            reset: () => {
                setPreview([])
            },
        }))

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files
            if (files) {
                const filePreviews = Array.from(files).map((file) => {
                    return URL.createObjectURL(file)
                })
                setPreview(filePreviews)
            }
            if (onChange) onChange(e)
        }

        const handleRemovePreview = (index: number) => {
            setPreview((prev) => prev.filter((_, i) => i !== index))
        }

        return (
            <fieldset
                className={`w-full relative h-fit flex flex-col gap-1.5 ${className}`}
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
                {preview.length > 0 ? (
                    <div
                        className={`${
                            multiple
                                ? 'w-full grid gap-6 grid-cols-2 lg:grid-cols-3'
                                : 'w-full lg:w-8/12'
                        }`}
                    >
                        {preview.map((src, index) => (
                            <div key={index} className="relative">
                                <Image
                                    src={src}
                                    alt="Photos preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-fit object-cover border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemovePreview(index)}
                                    className="absolute h-5 lg:h-7 w-5 lg:w-7 text-xs lg:text-sm aspect-square top-2 right-2 bg-stone-200 opacity-90 text-black rounded-full font-semibold"
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <label
                            htmlFor={id}
                            className={`peer h-fit flex flex-col gap-1 justify-center items-center cursor-pointer w-full px-4 py-4 rounded text-sm focus:border-gray-400 focus:outline-none border text-gray-900 bg-white disabled:bg-stone-100/80 read-only:cursor-auto ${inputClassName}`}
                        >
                            <svg
                                viewBox="0 -2 20 20"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                fill="#000000"
                                className="w-28 lg:w-32"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>image_picture [#973]</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs> </defs>
                                    <g
                                        id="Page-1"
                                        stroke="none"
                                        strokeWidth="1"
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g
                                            id="Dribbble-Light-Preview"
                                            transform="translate(-340.000000, -3881.000000)"
                                            fill="#c2c2c2"
                                        >
                                            <g
                                                id="icons"
                                                transform="translate(56.000000, 160.000000)"
                                            >
                                                <path
                                                    d="M296,3725.5 C296,3724.948 296.448,3724.5 297,3724.5 C297.552,3724.5 298,3724.948 298,3725.5 C298,3726.052 297.552,3726.5 297,3726.5 C296.448,3726.5 296,3726.052 296,3725.5 L296,3725.5 Z M296.75,3728.75 L300,3733 L288,3733 L292.518,3726.812 L295.354,3730.625 L296.75,3728.75 Z M302,3734 C302,3734.552 301.552,3735 301,3735 L287,3735 C286.448,3735 286,3734.552 286,3734 L286,3724 C286,3723.448 286.448,3723 287,3723 L301,3723 C301.552,3723 302,3723.448 302,3724 L302,3734 Z M302,3721 L286,3721 C284.896,3721 284,3721.895 284,3723 L284,3735 C284,3736.104 284.896,3737 286,3737 L302,3737 C303.105,3737 304,3736.104 304,3735 L304,3723 C304,3721.895 303.105,3721 302,3721 L302,3721 Z"
                                                    id="image_picture-[#973]"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="text-base lg:font-medium text-stone-600 -translate-y-2">
                                Klik untuk upload file
                            </span>
                        </label>
                    </>
                )}
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="sr-only"
                    onChange={handleFileChange}
                    {...rest}
                />
                {error && <span className="text-red-600 text-sm">{error}</span>}
            </fieldset>
        )
    }
)

export default FileInput
