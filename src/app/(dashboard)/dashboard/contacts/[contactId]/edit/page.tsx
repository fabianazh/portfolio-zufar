import EditContact from '@/components/Section/Dashboard/Contact/EditContact'
import contactServices from '@/services/contacts'

export async function generateMetadata({
    params,
}: {
    params: {
        contactId: string
    }
}) {
    try {
        const { data } = await contactServices.getContactById(params.contactId)

        if (data.data === undefined) {
            return {
                title: 'Kontak tidak ditemukan',
                description: 'Sepertinya kontak yang kamu cari tidak ada.',
                contact: null,
            }
        }
        return {
            title: `Kontak ${data.data.name}`,
            description: data.data.name,
            contact: data.data,
        }
    } catch (error) {
        return {
            title: 'Kontak tidak ditemukan',
            description: 'Sepertinya kontak yang kamu cari tidak ada.',
            contact: null,
        }
    }
}

export default function EditContactPage({
    params,
}: {
    params: { contactId: string }
}) {
    return (
        <>
            <EditContact contactId={params.contactId} />
        </>
    )
}
