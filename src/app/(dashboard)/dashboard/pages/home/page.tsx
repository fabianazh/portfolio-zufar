import HomeDetail from '@/components/Section/Dashboard/Page/Home/HomeDetail'

export function generateMetadata() {
    return {
        title: 'Detail Halaman Beranda',
    }
}

export default function DetailHomePage() {
    return (
        <>
            <HomeDetail />
        </>
    )
}
