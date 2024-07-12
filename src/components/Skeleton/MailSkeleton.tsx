import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function MailSkeleton() {
    return (
        <>
            <section className="bg-white rounded-md w-full h-fit shadow-sm px-6 pt-4 pb-8 gap-6 flex flex-col">
                <div className="w-full flex justify-between h-fit">
                    <div className="h-fit w-fit flex gap-2.5 items-center">
                        <Skeleton
                            containerClassName="h-10 aspect-square shrink-0 rounded-full overflow-hidden border p-0"
                            className="w-full h-16 -translate-y-2"
                        />

                        <div className="flex flex-col">
                            <Skeleton
                                height={'1.2rem'}
                                containerClassName="w-40"
                            />
                            <Skeleton
                                height={'1rem'}
                                containerClassName="w-32"
                            />
                        </div>
                    </div>
                    <Skeleton height={'1.3rem'} containerClassName="w-80" />
                </div>
                <div className="w-full flex flex-col">
                    <Skeleton
                        height={'1rem'}
                        count={3}
                        containerClassName="w-full"
                    />
                    <Skeleton height={'1rem'} containerClassName="w-4/12" />
                </div>
            </section>
        </>
    )
}
