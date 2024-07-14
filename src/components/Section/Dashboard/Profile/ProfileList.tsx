'use client'

import NotFound from '@/components/Other/NotFound'
import Article from '@/components/Typography/Article'
import Link from 'next/link'
import Heading from '@/components/Typography/Heading'
import { RiImageEditLine } from 'react-icons/ri'
import LinkText from '@/components/Typography/LinkText'
import Record from '@/components/Typography/Record'
import profileServices from '@/services/profiles'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProfileList() {
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const { data } = await profileServices.getAllProfiles()
                setProfiles(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProfiles()
    }, [])

    if (error) {
        return <NotFound message="Projek tidak tersedia." />
    }

    const photo = profiles.find((profile) => profile.id === 'photo')

    return (
        <>
            <section className="w-full flex flex-col gap-6 lg:gap-9 min-h-screen">
                <div className="flex flex-col gap-1">
                    <Heading className="normal-case">List Profil</Heading>
                    <span className="w-fit block">
                        Anda dapat mengubah informasi tentang anda yang akan
                        ditampilkan kepada pengguna.
                    </span>
                </div>
                <div className="w-full flex flex-col gap-10 lg:gap-16">
                    <div className="w-full h-auto flex flex-col lg:flex-row gap-10">
                        <Link
                            href={`/dashboard/profiles/${photo?.id}` ?? ''}
                            className="w-full lg:w-3/12 overflow-hidden shrink-0 relative group grid place-items-center h-fit"
                        >
                            <Image
                                src={`/img/z/${photo?.imgPath}`}
                                alt={photo?.alt ?? ''}
                                width={200}
                                height={200}
                                className="w-full h-fit group-hover:brightness-[.8]"
                            />
                            <RiImageEditLine className="text-2xl lg:text-4xl text-white opacity-0 transition-all duration-200 group-hover:opacity-100 absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
                        </Link>
                        <Article className="w-full lg:w-9/12">
                            <Article.Title
                                editButton
                                editHref={`/dashboard/profiles/$`}
                            >
                                Biodata
                            </Article.Title>
                            <Article.Content>
                                <span>
                                    Saya adalah lulusan SMK dengan program
                                    keahlian Desain Pemodelan dan Informasi
                                    Bangunan (DPIB). Selama pendidikan saya,
                                    saya telah mengembangkan pemahaman mendalam
                                    tentang berbagai aspek desain dan pemodelan
                                    bangunan. Setelah lulus, saya mengumpulkan
                                    pengalaman berharga dengan bekerja sebagai
                                    drafter, surveyor, dan drafter lapangan di{' '}
                                    <LinkText href={'https://wyn.co.id'}>
                                        PT. WYN KARYA PERKASA
                                    </LinkText>
                                    . Di sana, saya tidak hanya mengaplikasikan
                                    pengetahuan teknis saya, tetapi juga
                                    memperoleh sertifikasi dengan predikat yang
                                    sangat baik, yang semakin memperkuat
                                    kompetensi saya di bidang ini.
                                </span>
                                <span>
                                    Selama masa Praktik Kerja Lapangan (PKL),
                                    saya mengalami perkembangan pesat baik dalam{' '}
                                    <span className="italic">hard skill </span>
                                    maupun{' '}
                                    <span className="italic">soft skill</span>.
                                    Saya menjadi lebih mahir dalam penggunaan
                                    perangkat lunak desain dan pemodelan, serta
                                    teknik-teknik survei yang tepat dan efisien.
                                    Selain itu, saya juga mengasah kemampuan
                                    manajemen waktu, komunikasi, dan kerja tim,
                                    yang semuanya sangat penting dalam
                                    lingkungan kerja konstruksi yang dinamis.
                                </span>
                                <span>
                                    Saya memiliki minat yang besar untuk
                                    berkarir di bidang konstruksi, karena saya
                                    yakin dengan kemampuan dan berbagai
                                    keterampilan yang saya miliki, saya dapat
                                    memberikan kontribusi yang signifikan. Saya
                                    percaya bahwa kombinasi dari latar belakang
                                    pendidikan, pengalaman praktis, dan
                                    kemampuan manajemen saya membuat saya sangat
                                    cocok untuk posisi yang saya lamar. Saya
                                    berkomitmen untuk terus belajar dan
                                    berkembang, serta berkontribusi secara
                                    positif dalam setiap proyek yang saya
                                    kerjakan. Dengan demikian, saya siap untuk
                                    menghadapi tantangan baru dan membawa
                                    kesuksesan bagi perusahaan yang saya
                                    bergabung.
                                </span>
                            </Article.Content>
                        </Article>
                    </div>
                    <div className="w-full h-auto grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 gap-10">
                        <Article className="w-full">
                            <Article.Title
                                editButton
                                editHref={`/dashboard/profiles/$`}
                            >
                                Keterampilan
                            </Article.Title>
                            <Article.Content>
                                <span>
                                    Saya memiliki berbagai keterampilan teknis
                                    yang relevan di bidang konstruksi, termasuk
                                    keahlian dalam penggunaan perangkat lunak
                                    seperti
                                    <LinkText href="https://www.autodesk.com/products/autocad/overview">
                                        AutoCAD
                                    </LinkText>
                                    ,
                                    <LinkText href="https://www.sketchup.com/">
                                        SketchUp
                                    </LinkText>
                                    , dan
                                    <LinkText href="https://enscape3d.com/">
                                        Enscape
                                    </LinkText>
                                    . Selain itu, saya juga mahir dalam
                                    mengoperasikan
                                    <LinkText href="https://www.microsoft.com/en-us/microsoft-365">
                                        Microsoft Office
                                    </LinkText>
                                    untuk kebutuhan administrasi dan manajemen
                                    proyek.
                                </span>
                                <span>
                                    Di samping kemampuan teknis, saya juga
                                    memiliki berbagai{' '}
                                    <span className="italic">soft skill</span>{' '}
                                    yang penting. Saya mampu beradaptasi dengan
                                    cepat dalam lingkungan kerja yang dinamis
                                    dan memiliki kemampuan untuk bekerja efektif
                                    dalam tim. Selain itu, saya juga memiliki
                                    keterampilan komunikasi yang baik, yang
                                    memungkinkan saya untuk berinteraksi dengan
                                    berbagai pihak secara profesional dan
                                    efisien.
                                </span>
                            </Article.Content>
                        </Article>
                        <Article className="w-full">
                            <Article.Title
                                editButton
                                editHref={`/dashboard/profiles/$`}
                            >
                                Pengalaman
                            </Article.Title>
                            <Article.Content className="gap-4">
                                <Record>
                                    <Record.Description>
                                        <span className="font-semibold">
                                            Visualisasi 3D Model Sekolah - SMKN
                                            1 Sukabumi Kota Sukabumi
                                        </span>
                                        <span>
                                            Melakukan pengukuran dan observasi
                                            lingkungan sekitar untuk mendukung
                                            visualisasi dan detail model 3D yang
                                            akurat.
                                        </span>
                                    </Record.Description>
                                    <Record.Year>
                                        Januari / April 2024
                                    </Record.Year>
                                </Record>
                                <Record>
                                    <Record.Description>
                                        <span className="font-semibold">
                                            Drafter (PKL) - PT. WYN KARYA
                                            PERKASA
                                        </span>
                                        <ul className="flex flex-col gap-1">
                                            <li className="text-base list-disc list-inside">
                                                Membuat desain layout dengan
                                                mengonsep gambar sesuai
                                                permintaan klien dan
                                                memvisualisasikan konsep
                                                tersebut dalam bentuk 3D.
                                            </li>
                                            <li className="text-base list-disc list-inside">
                                                Menggambar as-built drawing
                                                dengan melakukan pengukuran
                                                lokasi pembangunan dan
                                                menyesuaikan gambar dengan
                                                kondisi lokasi.
                                            </li>
                                            <li className="text-base list-disc list-inside">
                                                Melakukan survei lapangan,
                                                termasuk membuat sketsa lahan,
                                                mengukur lahan, dan menyalin
                                                sketsa tersebut ke dalam
                                                software AutoCAD.
                                            </li>
                                        </ul>
                                    </Record.Description>
                                    <Record.Year>
                                        Agustus / November 2023
                                    </Record.Year>
                                </Record>
                            </Article.Content>
                        </Article>
                    </div>
                    <div className="w-full h-auto grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 gap-10">
                        <Article className="w-full">
                            <Article.Title
                                editButton
                                editHref={`/dashboard/profiles/$`}
                            >
                                Pendidikan
                            </Article.Title>
                            <Article.Content className="gap-2.5">
                                <Record>
                                    <Record.Description className="font-semibold">
                                        SMKN 1 Kota Sukabumi
                                    </Record.Description>
                                    <Record.Year>2021 - 2024</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Description className="font-semibold">
                                        SMPN 2 Kota Sukabumi
                                    </Record.Description>
                                    <Record.Year>2018 - 2021</Record.Year>
                                </Record>
                            </Article.Content>
                        </Article>
                        <Article className="w-full">
                            <Article.Title
                                editButton
                                editHref={`/dashboard/profiles/$`}
                            >
                                Sertifikasi
                            </Article.Title>
                            <Article.Content className="gap-2.5">
                                <Record>
                                    <Record.Description className="font-semibold">
                                        KKNI level II - Desain Pemodelan dan
                                        Informasi Bangunan (LSP-P1)
                                    </Record.Description>
                                    <Record.Year>April 2024</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Description className="font-semibold">
                                        Praktik Kerja Lapangan - (PT. WYN KARYA
                                        PERKASA)
                                    </Record.Description>
                                    <Record.Year>Desember 2023</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Description className="font-semibold">
                                        Juru gambar/draftman - Arsitektur -
                                        Kelas III (LPJK)
                                    </Record.Description>
                                    <Record.Year>Desember 2023</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Description className="font-semibold">
                                        Kursus Dasar Autocad 2D dan 3D - (Ketua
                                        Program Keahlian DPIB)
                                    </Record.Description>
                                    <Record.Year>September 2022</Record.Year>
                                </Record>
                            </Article.Content>
                        </Article>
                    </div>
                </div>
            </section>
        </>
    )
}
