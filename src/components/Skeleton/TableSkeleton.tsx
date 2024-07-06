import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TableSkeleton() {
    return (
        <>
            <section className="w-full h-fit flex flex-col gap-3 border p-3 rounded-md bg-white">
                <div className="w-full h-fit flex items-center gap-4 justify-between">
                    <Skeleton height={'1.5rem'} containerClassName="w-1/12" />
                    <Skeleton height={'1.5rem'} containerClassName="w-3/12" />
                    <Skeleton height={'1.5rem'} containerClassName="w-2/12" />
                    <Skeleton height={'1.5rem'} containerClassName="w-4/12" />
                    <Skeleton height={'1.5rem'} containerClassName="w-2/12" />
                </div>
                <div className="h-0.5 bg-stone-200 w-full rounded-2xl block my-1"></div>
                <div className="w-full h-fit gap-2 flex flex-col">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div
                            key={index}
                            className="w-full h-fit flex items-center gap-4 justify-between"
                        >
                            <Skeleton
                                height={'1.2rem'}
                                containerClassName="w-1/12"
                            />
                            <Skeleton
                                height={'1.2rem'}
                                containerClassName="w-3/12"
                            />
                            <Skeleton
                                height={'1.2rem'}
                                containerClassName="w-2/12"
                            />
                            <Skeleton
                                height={'1.2rem'}
                                containerClassName="w-4/12"
                            />
                            <Skeleton
                                height={'1.2rem'}
                                containerClassName="w-2/12"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
