import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileDetailSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-2.5">
                <Skeleton height={'1.7rem'} containerClassName="w-3/12" />
                <div className="w-full h-fit flex flex-col gap-1.5">
                    <Skeleton height={'1.2rem'} containerClassName="w-full" />
                    <Skeleton height={'1.2rem'} containerClassName="w-5/12" />
                </div>
            </div>
            <div className="w-full flex flex-col gap-10 lg:gap-16 min-h-screen">
                <div className="w-full h-auto flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-3/12 shrink-0">
                        <Skeleton
                            containerClassName="w-full"
                            className="h-56 w-full"
                        />
                    </div>
                    <div className="w-full h-fit flex flex-col gap-2 lg:w-9/12">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-3/12"
                        />
                        <div className="w-full bg-stone-200/50 h-0.5 my-1"></div>
                        <div className="w-full h-fit flex flex-col gap-4">
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={5}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-7/12"
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={3}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-4/12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 gap-10">
                    <div className="w-full h-fit flex flex-col gap-2">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-6/12"
                        />
                        <div className="w-full bg-stone-200/50 h-0.5 my-1"></div>
                        <div className="w-full h-fit flex flex-col gap-4">
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={5}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-7/12"
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={3}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-4/12"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col gap-2">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-6/12"
                        />
                        <div className="w-full bg-stone-200/50 h-0.5 my-1"></div>
                        <div className="w-full h-fit flex flex-col gap-4">
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={5}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-7/12"
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={3}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-4/12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto grid grid-flow-row lg:grid-flow-col lg:grid-cols-2 gap-10">
                    <div className="w-full h-fit flex flex-col gap-2">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-6/12"
                        />
                        <div className="w-full bg-stone-200/50 h-0.5 my-1"></div>
                        <div className="w-full h-fit flex flex-col gap-4">
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={5}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-7/12"
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={3}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-4/12"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col gap-2">
                        <Skeleton
                            height={'1.5rem'}
                            containerClassName="w-6/12"
                        />
                        <div className="w-full bg-stone-200/50 h-0.5 my-1"></div>
                        <div className="w-full h-fit flex flex-col gap-4">
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={5}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-7/12"
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-full"
                                    count={3}
                                />
                                <Skeleton
                                    height={'1.2rem'}
                                    containerClassName="w-4/12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
