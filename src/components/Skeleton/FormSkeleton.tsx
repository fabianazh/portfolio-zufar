import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FormSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-2.5">
                <Skeleton height={'1.7rem'} containerClassName="w-3/12" />
                <div className="w-full h-fit flex flex-col gap-1.5">
                    <Skeleton height={'1.2rem'} containerClassName="w-full" />
                    <Skeleton height={'1.2rem'} containerClassName="w-5/12" />
                </div>
            </div>
            <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="w-full flex flex-col gap-1.5">
                        <Skeleton height={'1.3rem'} containerClassName="w-32" />
                        <Skeleton
                            height={'1.2rem'}
                            containerClassName="w-full"
                        />
                        <Skeleton
                            height={'1.6rem'}
                            containerClassName="w-full"
                        />
                    </div>
                ))}
                <div className="w-full flex gap-6 justify-between">
                    <Skeleton height={'1.9rem'} containerClassName="w-6/12" />
                    <Skeleton height={'1.9rem'} containerClassName="w-6/12" />
                </div>
            </div>
        </>
    )
}
