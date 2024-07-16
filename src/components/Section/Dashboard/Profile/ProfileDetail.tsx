'use client'

import Article from '@/components/Typography/Article'
import LinkText from '@/components/Typography/LinkText'
import Record from '@/components/Typography/Record'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import profileServices from '@/services/profiles'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import ActionLayout from '@/components/Layout/ActionLayout'
import BackButton from '@/components/Button/BackButton'

export default function ProfileDetail({ profileId }: { profileId: string }) {
    const [profile, setProfile] = useState<Profile | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const router = useRouter()
    const { showToast } = useToast()

    useEffect(() => {
        async function getProfileDetail() {
            try {
                const { data } = await profileServices.getProfileById(profileId)
                setProfile(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getProfileDetail()
    }, [profileId])

    if (error) {
        return <></>
    }

    return (
        <ActionLayout className="w-full flex flex-col gap-6">
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/profiles'} />

                <Dropdown>
                    <Dropdown.Trigger>
                        <RxDotsVertical />
                    </Dropdown.Trigger>
                    <Dropdown.Items>
                        {!profile?.isUsed && (
                            <Dropdown.Item
                                href={`/dashboard/profiles/${profile?.id}/use`}
                            >
                                Gunakan
                            </Dropdown.Item>
                        )}
                        <Dropdown.Item
                            href={`/dashboard/profiles/${profile?.id}/edit`}
                        >
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="delete">Hapus</Dropdown.Item>
                    </Dropdown.Items>
                </Dropdown>
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Detail Profil ${profile?.versionName}`}
                desc="Anda dapat menggunakan, mengubah dan menghapus informasi profil yang akan ditampilkan kepada pengguna."
            />
            <ActionLayout.Content>
                <div></div>
                <div className="w-full flex flex-col gap-10 lg:gap-16 min-h-screen">
                    <div className="w-full h-auto flex flex-col lg:flex-row gap-10">
                        <div className="w-full lg:w-3/12 shrink-0">
                            <Image
                                src={`/img/z/${profile?.photo.path}`}
                                alt={profile?.photo.alt ?? ''}
                                width={200}
                                height={200}
                                className="w-full h-fit"
                            />
                        </div>
                        <Article className="w-full lg:w-9/12">
                            <Article.Title>Biodata</Article.Title>
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
                            <Article.Title>Keterampilan</Article.Title>
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
                            <Article.Title>Pengalaman</Article.Title>
                            <Article.Content className="gap-4">
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            Visualisasi 3D Model Sekolah - SMKN
                                            1 Sukabumi Kota Sukabumi
                                        </Record.Title>
                                        <Record.Description>
                                            Melakukan pengukuran dan observasi
                                            lingkungan sekitar untuk mendukung
                                            visualisasi dan detail model 3D yang
                                            akurat.
                                        </Record.Description>
                                    </Record.Content>
                                    <Record.Year>
                                        Januari / April 2024
                                    </Record.Year>
                                </Record>
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            Drafter (PKL) - PT. WYN KARYA
                                            PERKASA
                                        </Record.Title>
                                        <Record.List>
                                            <Record.ListItem>
                                                Membuat desain layout dengan
                                                mengonsep gambar sesuai
                                                permintaan klien dan
                                                memvisualisasikan konsep
                                                tersebut dalam bentuk 3D.
                                            </Record.ListItem>
                                            <Record.ListItem>
                                                Menggambar as-built drawing
                                                dengan melakukan pengukuran
                                                lokasi pembangunan dan
                                                menyesuaikan gambar dengan
                                                kondisi lokasi.
                                            </Record.ListItem>
                                            <Record.ListItem>
                                                Melakukan survei lapangan,
                                                termasuk membuat sketsa lahan,
                                                mengukur lahan, dan menyalin
                                                sketsa tersebut ke dalam
                                                software AutoCAD.
                                            </Record.ListItem>
                                        </Record.List>
                                    </Record.Content>
                                    <Record.Year>
                                        Agustus / November 2023
                                    </Record.Year>
                                </Record>
                            </Article.Content>
                        </Article>
                    </div>
                    <div className="w-full h-auto grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 gap-10">
                        <Article className="w-full">
                            <Article.Title>Pendidikan</Article.Title>
                            <Article.Content className="gap-2.5">
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            SMKN 1 Kota Sukabumi
                                        </Record.Title>

                                        <Record.Description>
                                            Bidang Desain Pemodelan dan
                                            Informasi Bangunan (DPIB).
                                        </Record.Description>
                                    </Record.Content>
                                    <Record.Year>2021 - 2024</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            SMPN 2 Kota Sukabumi
                                        </Record.Title>
                                    </Record.Content>
                                    <Record.Year>2018 - 2021</Record.Year>
                                </Record>
                            </Article.Content>
                        </Article>
                        <Article className="w-full">
                            <Article.Title>Sertifikasi</Article.Title>
                            <Article.Content className="gap-2.5">
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            KKNI level II - Desain Pemodelan dan
                                            Informasi Bangunan (LSP-P1)
                                        </Record.Title>
                                    </Record.Content>
                                    <Record.Year>April 2024</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            Praktik Kerja Lapangan - (PT. WYN
                                            KARYA PERKASA)
                                        </Record.Title>
                                    </Record.Content>
                                    <Record.Year>Desember 2023</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            Juru gambar/draftman - Arsitektur -
                                            Kelas III (LPJK)
                                        </Record.Title>
                                    </Record.Content>
                                    <Record.Year>Desember 2023</Record.Year>
                                </Record>
                                <Record>
                                    <Record.Content>
                                        <Record.Title>
                                            Kursus Dasar Autocad 2D dan 3D -
                                            (Ketua Program Keahlian DPIB)
                                        </Record.Title>
                                    </Record.Content>
                                    <Record.Year>September 2022</Record.Year>
                                </Record>
                            </Article.Content>
                        </Article>
                    </div>
                </div>
            </ActionLayout.Content>
        </ActionLayout>
    )
}
