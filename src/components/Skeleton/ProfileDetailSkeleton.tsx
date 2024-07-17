import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileDetailSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-2.5">
                <Skeleton height={'1.7rem'} containerClassName="w-3/12" />
                <div className="w-full h-fit flex flex-col gap-1.5">
                    <Skeleton height={'1.2rem'} containerClassName="w-full" />
                    <Skeleton height={'1.2rem'} containerClassName="w-5/12" />
                </div>
            </div>
            <div className="w-full flex flex-col gap-10 lg:gap-16 min-h-screen">
                <div className="w-full h-auto flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-3/12 aspect-square shrink-0">
                        <Skeleton
                            height={'1.2rem'}
                            containerClassName="w-full h-full"
                        />
                    </div>
                    <Article className="w-full lg:w-9/12">
                        <Article.Title>Biodata</Article.Title>
                        <Article.Content>
                            <span>
                                Saya adalah lulusan SMK dengan program keahlian
                                Desain Pemodelan dan Informasi Bangunan (DPIB).
                                Selama pendidikan saya, saya telah mengembangkan
                                pemahaman mendalam tentang berbagai aspek desain
                                dan pemodelan bangunan. Setelah lulus, saya
                                mengumpulkan pengalaman berharga dengan bekerja
                                sebagai drafter, surveyor, dan drafter lapangan
                                di{' '}
                                <LinkText href={'https://wyn.co.id'}>
                                    PT. WYN KARYA PERKASA
                                </LinkText>
                                . Di sana, saya tidak hanya mengaplikasikan
                                pengetahuan teknis saya, tetapi juga memperoleh
                                sertifikasi dengan predikat yang sangat baik,
                                yang semakin memperkuat kompetensi saya di
                                bidang ini.
                            </span>
                            <span>
                                Selama masa Praktik Kerja Lapangan (PKL), saya
                                mengalami perkembangan pesat baik dalam{' '}
                                <span className="italic">hard skill </span>
                                maupun{' '}
                                <span className="italic">soft skill</span>. Saya
                                menjadi lebih mahir dalam penggunaan perangkat
                                lunak desain dan pemodelan, serta teknik-teknik
                                survei yang tepat dan efisien. Selain itu, saya
                                juga mengasah kemampuan manajemen waktu,
                                komunikasi, dan kerja tim, yang semuanya sangat
                                penting dalam lingkungan kerja konstruksi yang
                                dinamis.
                            </span>
                            <span>
                                Saya memiliki minat yang besar untuk berkarir di
                                bidang konstruksi, karena saya yakin dengan
                                kemampuan dan berbagai keterampilan yang saya
                                miliki, saya dapat memberikan kontribusi yang
                                signifikan. Saya percaya bahwa kombinasi dari
                                latar belakang pendidikan, pengalaman praktis,
                                dan kemampuan manajemen saya membuat saya sangat
                                cocok untuk posisi yang saya lamar. Saya
                                berkomitmen untuk terus belajar dan berkembang,
                                serta berkontribusi secara positif dalam setiap
                                proyek yang saya kerjakan. Dengan demikian, saya
                                siap untuk menghadapi tantangan baru dan membawa
                                kesuksesan bagi perusahaan yang saya bergabung.
                            </span>
                        </Article.Content>
                    </Article>
                </div>
                <div className="w-full flex gap-6 justify-between">
                    <Skeleton height={'1.9rem'} containerClassName="w-6/12" />
                    <Skeleton height={'1.9rem'} containerClassName="w-6/12" />
                </div>
            </div>
        </>
    )
}
