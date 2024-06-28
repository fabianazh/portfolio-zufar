import HighlightedProjects from "@/components/Section/HighlightedProjects"
import Image from "next/image"

export default function HomePage() {
    return (
        <>
            <section className="w-full flex flex-col gap-3 lg:gap-5 h-fit mb-10">
                <div className="relative w-full h-72 lg:h-[28rem] flex gap-3 mb-2 lg:mb-5">
                    <div className="w-3/12 shrink-0 h-full relative">
                        <Image
                            src="/img/z/z2.jpeg"
                            alt="Zufar"
                            width={300}
                            height={800}
                            className="w-full top-0 left-0 absolute h-full object-cover"
                        />
                    </div>
                    <div className="w-9/12 h-full relative">
                        <Image
                            src="/img/bg/bg1.avif"
                            alt="Zufar"
                            layout="fill"
                            className="absolute top-0 left-0 object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="block text-2xl lg:text-3xl font-extrabold">
                        Zufar Muhammad Ali Syabana,
                    </span>
                    <span className="block text-lg lg:text-2xl font-semibold">
                        Seorang Drafter Berpengalaman di Bidang Desain dan
                        Pemodelan Bangunan.
                    </span>
                </div>

                <div className="w-full flex gap-4 h-fit">
                    <div className="w-full lg:w-full flex h-fit">
                        <span className="text-base font-medium">
                            Saya lulusan SMK DPIB dengan pengalaman sebagai
                            drafter dan surveyor, serta tersertifikasi dengan
                            berpredikat sangat baik. Mahir dalam perangkat lunak
                            desain, teknik survei, manajemen waktu, komunikasi,
                            dan kerja tim. Siap terus belajar dan berkontribusi
                            di bidang konstruksi.
                        </span>
                    </div>
                    {/* <div className="w-3/12 flex-grow flex place-items-center"></div> */}
                </div>
            </section>
            <HighlightedProjects />
        </>
    )
}
