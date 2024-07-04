import Link from 'next/link'
import Heading from '@/components/Typography/Heading'
import ContactForm from '@/components/Section/Landing/ContactForm'

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
                            target={'_blank'}
                            href={`mailto:zufarsyabana@gmail.com?subject=${encodeURIComponent(
                                'Subject Anda'
                            )}&body=${encodeURIComponent(
                                'Halo, saya tertarik untuk mendiskusikan lebih lanjut...'
                            )}`}
                        >
                            zufarsyabana@gmail.com
                        </Link>
                        <span> | </span>
                        <Link
                            target={'_blank'}
                            href={`https://wa.me/62895395253663?text=${encodeURIComponent(
                                'Halo, saya tertarik untuk mendiskusikan lebih lanjut...'
                            )}`}
                        >
                            +62 895-3952-53663
                        </Link>
                    </div>
                </div>
                <ContactForm />
            </section>
        </>
    )
}
