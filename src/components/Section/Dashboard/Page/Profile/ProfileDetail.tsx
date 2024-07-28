'use client'

import Article from '@/components/Typography/Article'
import LinkText from '@/components/Typography/LinkText'
import Record from '@/components/Typography/Record'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import pageServices from '@/services/pages'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import ActionLayout from '@/components/Layout/ActionLayout'
import BackButton from '@/components/Button/BackButton'
import ProfileDetailSkeleton from '@/components/Skeleton/ProfileDetailSkeleton'
import TextInput from '@/components/Form/TextInput'
import FileInput from '@/components/Form/FileInput'
import TextareaInput from '@/components/Form/TextareaInput'

export default function ProfileDetail() {
    const [profile, setProfile] = useState<Profile | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const router = useRouter()
    const { showToast } = useToast()

    useEffect(() => {
        async function getProfileDetail() {
            try {
                const { data } = await pageServices.getPageById('about')
                setProfile(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getProfileDetail()
    }, [])

    if (error) {
        return <></>
    }

    return (
        <ActionLayout
            isLoading={loading}
            className="w-full flex flex-col gap-6"
            returnLink="/dashboard/pages"
            isEmpty={!profile}
            emptyMessage="Tidak dapat menemukan data profil."
            loadingSkeleton={<ProfileDetailSkeleton />}
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/pages'} />

                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="w-8 h-8 grid place-items-center rounded-full bg-stone-200/50 transition-all duration-300 bg-stone-100 shadow-sm">
                            <RxDotsVertical />
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Items>
                        <Dropdown.Item
                            href={`/dashboard/pages/${profile?.id}/edit`}
                        >
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="delete">Hapus</Dropdown.Item>
                    </Dropdown.Items>
                </Dropdown>
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Detail Halaman Profil`}
                desc="Anda dapat mengubah informasi halaman profil yang akan ditampilkan kepada pengguna."
            />
            <ActionLayout.Content>
                <div className="w-full flex flex-col gap-10 lg:gap-16 min-h-screen">
                    <div className="w-full h-auto flex flex-col lg:flex-row gap-10">
                        <div className="w-full lg:w-3/12 shrink-0">
                            <Image
                                src={`${profile?.photo}`}
                                alt={'Zufar Syabana'}
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
                                {profile?.experience.map((item, index) => (
                                    <Record key={index}>
                                        <Record.Content>
                                            <Record.Title>
                                                {item.title}
                                            </Record.Title>
                                            {item.desc.length < 2 ? (
                                                <Record.Description>
                                                    {item.desc}
                                                </Record.Description>
                                            ) : (
                                                <>
                                                    {item?.desc.map(
                                                        (desc, index) => (
                                                            <Record.List
                                                                key={index}
                                                            >
                                                                <Record.ListItem>
                                                                    {desc}
                                                                </Record.ListItem>
                                                            </Record.List>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </Record.Content>
                                        <Record.Year>
                                            {item.yearStart === item.yearEnd ? (
                                                <>
                                                    {item.monthStart} /{' '}
                                                    {item.monthEnd}{' '}
                                                    {item.yearEnd}
                                                </>
                                            ) : (
                                                <>
                                                    {item.monthStart} /{' '}
                                                    {item.yearStart}{' '}
                                                    {item.monthEnd}{' '}
                                                    {item.yearEnd}
                                                </>
                                            )}
                                        </Record.Year>
                                    </Record>
                                ))}
                            </Article.Content>
                        </Article>
                    </div>
                    <div className="w-full h-auto grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 gap-10">
                        <Article className="w-full">
                            <Article.Title>Pendidikan</Article.Title>
                            <Article.Content className="gap-2.5">
                                {profile?.education.map((item, index) => (
                                    <Record key={index}>
                                        <Record.Content>
                                            <Record.Title>
                                                {item.title}
                                            </Record.Title>

                                            {item.desc && (
                                                <Record.Description>
                                                    {item.desc}
                                                </Record.Description>
                                            )}
                                        </Record.Content>
                                        <Record.Year>
                                            {item.yearStart} - {item.yearEnd}
                                        </Record.Year>
                                    </Record>
                                ))}
                            </Article.Content>
                        </Article>
                        <Article className="w-full">
                            <Article.Title>Sertifikasi</Article.Title>
                            <Article.Content className="gap-2.5">
                                {profile?.certifications.map(
                                    (certification, index) => (
                                        <Record key={index}>
                                            <Record.Content>
                                                <Record.Title>
                                                    {certification.title}
                                                </Record.Title>
                                            </Record.Content>
                                            <Record.Year>
                                                {certification.month}{' '}
                                                {certification.year}
                                            </Record.Year>
                                        </Record>
                                    )
                                )}
                            </Article.Content>
                        </Article>
                    </div>
                </div>
            </ActionLayout.Content>
        </ActionLayout>
    )
}
