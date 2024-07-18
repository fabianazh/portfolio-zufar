import MailBox from '@/components/Section/Dashboard/Mail/MailBox'

export function generateMetadata() {
    return {
        title: 'Kotak Pesan',
    }
}

export default function ContactPage() {
    return (
        <>
            <MailBox />
        </>
    )
}
