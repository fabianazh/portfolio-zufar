import Heading from "@/components/Typography/Heading"

export default function ContactPage() {
    return (
        <>
            <section className="w-full flex flex-col px-24 items-center min-h-screen gap-10">
                <div className="flex flex-col items-start gap-3">
                    <Heading>Contact Me</Heading>
                    <span>
                        Saya sangat tertarik untuk mendiskusikan peluang karir
                        lebih lanjut dan bagaimana saya dapat berkontribusi pada
                        proyek-proyek Anda. Jangan ragu untuk menghubungi saya
                        melalui kontak atau formulir di bawah ini.
                    </span>
                    <div className="flex gap-2">
                        <span>zufarsyabana@gmail.com</span>
                        <span>|</span>
                        <span>+62 895-3952-53663</span>
                    </div>
                </div>
                <form action="" className="w-full h-fit flex flex-col gap-4">
                    <div className="w-full h-fit flex flex-col">
                        <div className="w-full grid grid-cols-2 h-fit">
                            <div className="w-full border border-r-0 border-black h-fit flex-grow">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500"
                                    required
                                    placeholder="Nama"
                                />
                            </div>
                            <div className="w-full border border-black h-fit flex-grow">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500"
                                    required
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="w-full h-fit border border-t-0 border-black">
                            <textarea
                                name="message"
                                id="message"
                                rows={6}
                                className="w-full h-fit resize-none py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500"
                                placeholder="Pesan"
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
