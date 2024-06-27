import Image from "next/image"

export default function HomePage() {
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen">
                <div className="w-full h-fit flex">
                    <span className="block text-3xl font-semibold">
                        Hai 👋,{" "}
                        <span className="inline-">
                            Saya Zufar Muhammad Ali Syabana
                        </span>
                    </span>
                </div>
            </section>
        </>
    )
}
