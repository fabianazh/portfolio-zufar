import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ProjectsGridSkeleton() {
    return (
        <>
            <div className={`w-full h-full columns-1 lg:columns-3 gap-x-8`}>
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-56 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-56 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-56 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-44 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-44 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-44 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-56 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-56 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
                {/* Item */}
                <div className="w-full relative h-auto flex-col flex gap-3 pb-8 mb-8 lg:mb-6 group">
                    <Skeleton className={`w-full h-56 shrink-0`} />
                    <div className="flex w-full text-sm gap-3 text-black font-medium absolute bottom-0 left-0">
                        <Skeleton height={"1rem"} containerClassName="w-3/12" />
                        <Skeleton height={"1rem"} containerClassName="w-9/12" />
                    </div>
                </div>
                {/* End Item */}
            </div>
        </>
    )
}
