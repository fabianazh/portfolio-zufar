import About from '@/components/Section/Landing/About'

export function generateMetadata() {
    return {
        title: 'Tentang Saya',
        description:
            'Saya lulusan SMK DPIB dengan pengalaman sebagai drafter dan surveyor, serta tersertifikasi dengan berpredikat sangat baik. Mahir dalam perangkat lunak desain, teknik survei, manajemen waktu, komunikasi, dan kerja tim. Siap terus belajar dan berkontribusi di bidang konstruksi.',
    }
}

export default function AboutPage() {
    return (
        <>
            <About />
        </>
    )
}
