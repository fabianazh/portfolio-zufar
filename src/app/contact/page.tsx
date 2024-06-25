import Link from "next/link"
import Heading from "@/components/Typography/Heading"

export default function ContactPage() {
    return (
        <>
            <section className="w-full flex flex-col px-0 lg:px-24 items-center min-h-screen gap-10">
                <div className="flex flex-col items-start gap-3 z-0">
                    <Heading>Kontak Saya</Heading>
                    <span>
                        Saya sangat tertarik untuk mendiskusikan peluang karir
                        lebih lanjut dan bagaimana saya dapat berkontribusi pada
                        proyek-proyek Anda. Jangan ragu untuk menghubungi saya
                        melalui kontak atau formulir di bawah ini.
                    </span>
                    <div className="flex gap-2">
                        <Link
                            target={"_blank"}
                            href={`mailto:zufarsyabana@gmail.com?subject=${encodeURIComponent(
                                "Subject Anda"
                            )}&body=${encodeURIComponent(
                                "Halo, saya tertarik untuk mendiskusikan lebih lanjut..."
                            )}`}
                        >
                            zufarsyabana@gmail.com
                        </Link>
                        <span> | </span>
                        <Link
                            target={"_blank"}
                            href={`https://wa.me/62895395253663?text=${encodeURIComponent(
                                "Halo, saya tertarik untuk mendiskusikan lebih lanjut..."
                            )}`}
                        >
                            +62 895-3952-53663
                        </Link>
                    </div>
                </div>
                <form
                    action=""
                    className="w-full h-fit flex flex-col gap-4 z-0"
                >
                    <div className="w-full h-fit flex flex-col">
                        <div className="w-full grid grid-flow-row lg:grid-flow-col h-fit">
                            <div className="w-full border border-b-0 lg:border-b lg:border-r-0 border-black h-fit flex-grow">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                    required
                                    autoComplete="false"
                                    placeholder="Nama"
                                />
                            </div>
                            <div className="w-full border border-black h-fit flex-grow">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                    required
                                    autoComplete="false"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="w-full h-fit border border-t-0 border-black">
                            <textarea
                                name="message"
                                id="message"
                                rows={6}
                                className="w-full h-fit resize-none py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                required
                                placeholder="Pesan"
                                autoComplete="false"
                            ></textarea>
                        </div>
                    </div>
                    <div className="border border-black w-fit py-2 px-8">
                        <button type="submit">Kirim</button>
                    </div>
                </form>
            </section>
        </>
    )
}
