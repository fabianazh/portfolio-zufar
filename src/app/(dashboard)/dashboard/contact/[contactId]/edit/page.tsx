import ContactEdit from '@/components/Section/Dashboard/Contact/ContactEdit'

export default function ContactEditPage({
    params,
}: {
    params: { contactId: string }
}) {
    return (
        <>
            <ContactEdit contactId={params.contactId} />
        </>
    )
}
