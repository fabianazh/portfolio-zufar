import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeSkeleton() {
    return (
        <>
            <section className="w-full flex flex-col gap-3 lg:gap-5 h-fit mb-10">
                <div className="relative w-full h-72 lg:h-[28rem] flex gap-3 mb-2 lg:mb-5">
                    <div className="w-3/12 shrink-0 h-full relative">
                        <Skeleton
                            height={'100%'}
                            containerClassName="w-full object-cover"
                        />
                    </div>
                    <div className="w-9/12 h-full relative">
                        <Skeleton
                            height={'100%'}
                            containerClassName="w-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton
                        height={'1.5rem'}
                        containerClassName="w-80 object-cover"
                    />
                    <div className="w-full flex flex-col">
                        <Skeleton
                            height={'1.2rem'}
                            containerClassName="w-full object-cover"
                        />
                        <Skeleton
                            height={'1.2rem'}
                            containerClassName="w-56 object-cover"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-full flex flex-col h-fit">
                    <Skeleton
                        height={'1.2rem'}
                        count={4}
                        containerClassName="w-full object-cover"
                    />
                    <Skeleton
                        height={'1.2rem'}
                        containerClassName="w-72 object-cover"
                    />
                </div>
            </section>
        </>
    )
}
