'use client'

import { forwardRef, useState } from 'react'
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
                            className={`peer h-fit flex flex-col justify-center items-center cursor-pointer w-full px-4 py-4 rounded text-sm focus:border-gray-400 focus:outline-none border text-gray-900 bg-white disabled:bg-stone-100/80 read-only:cursor-auto ${inputClassName}`}
                        >
                            <svg
                                height="150px"
                                width="150px"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 312.60 312.60"
                                xmlSpace="preserve"
                                fill="#858585"
                                stroke="#858585"
                                transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
                                strokeWidth="0.00312602"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        style={{ fill: '#858585' }}
                                        d="M251.52,137.244c-3.966,0-7.889,0.38-11.738,1.134c-1.756-47.268-40.758-85.181-88.448-85.181 c-43.856,0-80.964,32.449-87.474,75.106C28.501,129.167,0,158.201,0,193.764c0,36.106,29.374,65.48,65.48,65.48h54.782 c4.143,0,7.5-3.357,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5H65.48c-27.835,0-50.48-22.645-50.48-50.48c0-27.835,22.646-50.48,50.48-50.48 c1.367,0,2.813,0.067,4.419,0.206l7.6,0.658l0.529-7.61c2.661-38.322,34.861-68.341,73.306-68.341 c40.533,0,73.51,32.977,73.51,73.51c0,1.863-0.089,3.855-0.272,6.088l-0.983,11.968l11.186-4.367 c5.356-2.091,10.99-3.151,16.747-3.151c25.409,0,46.081,20.672,46.081,46.081c0,25.408-20.672,46.08-46.081,46.08 c-0.668,0-20.608-0.04-40.467-0.08c-19.714-0.04-39.347-0.08-39.999-0.08c-4.668,0-7.108-2.248-7.254-6.681v-80.959l8.139,9.667 c2.667,3.17,7.399,3.576,10.567,0.907c3.169-2.667,3.575-7.398,0.907-10.567l-18.037-21.427c-2.272-2.699-5.537-4.247-8.958-4.247 c-3.421,0-6.686,1.548-8.957,4.247l-18.037,21.427c-2.668,3.169-2.262,7.9,0.907,10.567c1.407,1.185,3.121,1.763,4.826,1.763 c2.137,0,4.258-0.908,5.741-2.67l7.901-9.386v80.751c0,8.686,5.927,21.607,22.254,21.607c0.652,0,20.27,0.04,39.968,0.079 c19.874,0.041,39.829,0.081,40.498,0.081c33.681,0,61.081-27.4,61.081-61.08C312.602,164.644,285.201,137.244,251.52,137.244z"
                                    ></path>
                                </g>
                            </svg>
                            <span className="text-base -translate-y-2">
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
