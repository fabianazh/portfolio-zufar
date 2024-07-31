import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ContactPageSkeleton() {
    return (
        <>
            <Skeleton
                height={'1.5rem'}
                containerClassName="w-72 object-cover"
            />
            <div className="w-full flex flex-col">
                <Skeleton
                    height={'1.2rem'}
                    count={3}
                    containerClassName="w-full object-cover"
                />
                <Skeleton
                    height={'1.2rem'}
                    containerClassName="w-40 object-cover"
                />
            </div>
            <div className="flex gap-2">
                <Skeleton
                    height={'1.2rem'}
                    containerClassName="w-32 object-cover"
                />
                <Skeleton
                    height={'1.2rem'}
                    containerClassName="w-36 object-cover"
                />
            </div>
        </>
    )
}
