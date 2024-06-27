import { getProjectById } from "@/utils/getAllProjects"

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const response = await getProjectById(params.id)
        return
    } catch (error) {}
}

export default function HomePage({ params }: { params: { id: string } }) {
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen">
                <div className="w-full h-fit flex">
                    <span className="block text-3xl font-semibold">
                        Hai 👋, <span className="inline-">{params.id}</span>
                    </span>
                </div>
            </section>
        </>
    )
}
