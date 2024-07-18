import ContactList from '@/components/Section/Dashboard/Contact/ContactList'

export function generateMetadata() {
    return {
        title: 'List Kontak',
    }
}

export default function ContactPage() {
    return (
        <>
            <ContactList />
        </>
    )
}
