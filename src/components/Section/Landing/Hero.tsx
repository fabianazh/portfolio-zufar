'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const contents = [
    { path: '/img/bg/bg1.avif' },
    { path: '/img/z/z7.png' },
    { path: '/img/z/z7.png' },
    { path: '/img/bg/bg1.avif' },
    { text: 'Lorem ipsum doler sit amet, anjay mabar bosku!' },
    { path: '/img/bg/bg1.avif' },
    { path: '/img/bg/bg1.avif' },
]

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (window.innerWidth >= 1024 && heroRef.current) {
                heroRef.current.scrollLeft += event.deltaY
                event.preventDefault() // Prevent default scroll behavior for horizontal scroll
            }
        }

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                window.addEventListener('wheel', handleScroll, {
                    passive: false,
                })
            } else {
                window.removeEventListener('wheel', handleScroll)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('wheel', handleScroll)
        }
    }, [])

    return (
        <>
            <section
                ref={heroRef}
                className="fixed top-0 px-5 lg:px-8 pt-24 pb-10 lg:pb-14 lg:pt-14 left-0 w-screen h-screen lg:w-auto lg:h-screen overflow-y-auto lg:overflow-x-scroll flex flex-col lg:flex-row"
            >
                <div className="flex flex-col lg:flex-row w-full h-full gap-5">
                    {contents.map((content, index) => (
                        <div key={index} className="flex-shrink-0">
                            {content.path && (
                                <Image
                                    src={content.path}
                                    alt="Zufar"
                                    width={900}
                                    height={700}
                                    className="w-full h-auto lg:h-full lg:w-auto object-cover"
                                />
                            )}
                            {content.text && (
                                <div className="w-full h-auto lg:h-full lg:w-auto px-5 lg:pl-10 lg:pr-32 flex items-center">
                                    <span className="text-base italic">
                                        {'"'}
                                        {content.text}
                                        {'"'}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
