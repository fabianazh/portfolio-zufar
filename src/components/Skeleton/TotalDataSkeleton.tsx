import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TotalDataSkeleton() {
    return (
        <section className="grid w-full h-auto grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
            {Array.from({ length: 4 }, (_, index) => (
                <div
                    key={index}
                    className="w-full h-auto border bg-white p-5 rounded-md flex flex-col gap-1"
                >
                    <Skeleton height={'1.2rem'} containerClassName="w-16" />
                    <div className="w-full flex">
                        <Skeleton
                            height={'1.7rem'}
                            containerClassName="w-11/12"
                        />
                    </div>
                </div>
            ))}
        </section>
    )
}
