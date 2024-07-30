import ContactDetail from '@/components/Section/Dashboard/Page/Contact/ContactDetail'

export function generateMetadata() {
    return {
        title: 'Detail Halaman Kontak',
    }
}

export default function DetailContactPage() {
    return (
        <>
            <ContactDetail />
        </>
    )
}
