import MailDetail from '@/components/Section/Dashboard/Mail/MailDetail'
import mailServices from '@/services/mails'

export async function generateMetadata({
    params,
}: {
    params: {
        mailId: string
    }
}) {
    try {
        const { data } = await mailServices.getMailById(params.mailId)

        if (data.data === undefined) {
            return {
                title: 'Pesan tidak ditemukan',
                description: 'Sepertinya pesan yang kamu cari tidak ada.',
            }
        }
        return {
            title: `Pesan dari ${data.data.name}`,
            description: data.data.name,
        }
    } catch (error) {
        return {
            title: 'Pesan tidak ditemukan',
            description: 'Sepertinya pesan yang kamu cari tidak ada.',
        }
    }
}

export default function MailDetailPage({
    params,
}: {
    params: { mailId: string }
}) {
    return (
        <>
            <MailDetail mailId={params.mailId} />
        </>
    )
}
