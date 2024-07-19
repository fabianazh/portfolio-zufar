import Welcome from '@/components/Section/Dashboard/Welcome'
import TotalData from '@/components/Section/Dashboard/TotalData'
import UnreadMails from '@/components/Section/Dashboard/UnreadMails'

export function generateMetadata() {
    return {
        title: 'Dashboard',
    }
}

export default async function DashboardPage() {
    return (
        <>
            <Welcome />
            <TotalData />
            <UnreadMails />
        </>
    )
}
