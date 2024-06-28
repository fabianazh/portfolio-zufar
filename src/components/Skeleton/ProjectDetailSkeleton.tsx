import Skeleton from "react-loading-skeleton"

export default function ProjectDetailSkeleton() {
    return (
        <>
            <section className="w-full flex flex-col gap-8">
                {/* Thumbnail  */}
                <div className="w-full h-fit flex flex-col gap-2">
                    <Skeleton className={`w-full h-72 shrink-0 mb-2`} />
                    <div className="w-full h-fit flex flex-col lg:flex-row justify-between gap-2 lg:gap-4 mb-2 lg:mb-2">
                        <div className="w-fit flex flex-col">
                            <Skeleton
                                height={"1rem"}
                                containerClassName="w-20"
                            />
                            <Skeleton
                                height={"1rem"}
                                containerClassName="w-80"
                            />
                        </div>

                        <div className="w-fit flex flex-col lg:items-end">
                            <Skeleton
                                height={"1rem"}
                                containerClassName="w-20"
                            />
                            <Skeleton
                                height={"1rem"}
                                containerClassName="w-32"
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-full h-fit flex flex-col">
                        <Skeleton
                            height={"1rem"}
                            containerClassName="w-full"
                            count={3}
                        />
                        <Skeleton height={"1rem"} containerClassName="w-5/12" />
                    </div>
                    {/* End Description */}
                </div>
                {/* End Thumbnail  */}

                {/* Images */}
                <div className="w-full h-auto flex flex-col gap-2">
                    <Skeleton
                        height={"1rem"}
                        containerClassName="w-3/12 lg:w-2/12"
                    />
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 lg:gap-y-4 h-fit">
                        <Skeleton
                            className={`w-full h-48 lg:h-72 shrink-0 mb-2`}
                        />
                        <Skeleton
                            className={`w-full h-48 lg:h-72 shrink-0 mb-2`}
                        />
                        <Skeleton
                            className={`w-full h-48 lg:h-72 shrink-0 mb-2`}
                        />
                        <Skeleton
                            className={`w-full h-48 lg:h-72 shrink-0 mb-2`}
                        />
                    </div>
                </div>
                {/* End Images */}
            </section>
        </>
    )
}
