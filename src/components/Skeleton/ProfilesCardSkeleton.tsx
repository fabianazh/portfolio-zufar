import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfilesCardSkeleton() {
    return (
        <>
            {Array.from({ length: 6 }, (_, index) => (
                <div
                    key={index}
                    className="w-full h-48 flex gap-6 z-0 p-4 border rounded overflow-hidden bg-white"
                >
                    <div className="w-fit flex h-full aspect-square my-auto overflow-hidden rounded group">
                        <Skeleton
                            containerClassName="w-fit h-full"
                            className={`aspect-square h-full`}
                        />
                    </div>
                    <div className="w-6/12 flex flex-col h-full justify-between">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-full"
                        />
                        <Skeleton
                            height={'1rem'}
                            count={4}
                            containerClassName="w-full"
                        />
                    </div>
                </div>
            ))}
        </>
    )
}
