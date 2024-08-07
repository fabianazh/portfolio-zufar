import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PagesCardSkeleton() {
    return (
        <>
            {Array.from({ length: 3 }, (_, index) => (
                <div
                    key={index}
                    className="w-full h-36 flex gap-6 z-0 p-4 border rounded overflow-hidden bg-white"
                >
                    {/* <div className="w-fit flex h-full aspect-square my-auto overflow-hidden rounded group">
                        <Skeleton
                            containerClassName="w-fit h-full"
                            className={`aspect-square h-full`}
                        />
                    </div> */}
                    <div className="w-full flex flex-col h-full justify-between">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-11/12"
                        />
                        <div className="w-full flex flex-col">
                            <Skeleton
                                height={'1rem'}
                                containerClassName="w-full"
                            />
                            <Skeleton
                                height={'1rem'}
                                containerClassName="w-9/12"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
