import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FormSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-1">
                <Skeleton height={'2.5rem'} containerClassName="w-full" />
                <div className="w-full h-fit flex justify-between gap-6">
                    <Skeleton height={'1.2rem'} containerClassName="w-full" />
                    <Skeleton height={'1.2rem'} containerClassName="w-3/12" />
                </div>
            </div>
            <div className="w-6/12 h-fit flex flex-col gap-6">
                <Skeleton height={'1.5rem'} containerClassName="w-full" />
                <Skeleton height={'1.5rem'} containerClassName="w-full" />
                <Skeleton height={'1.5rem'} containerClassName="w-full" />
                <Skeleton height={'1.5rem'} containerClassName="w-full" />
                <Skeleton height={'1.5rem'} containerClassName="w-full" />
            </div>
        </>
    )
}
