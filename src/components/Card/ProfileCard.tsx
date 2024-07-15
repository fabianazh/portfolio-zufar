import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import { FormatDate } from '@/libs/utils/formatDate'

export default function ProfileCard({
    href,
    profile,
}: {
    href: string
    profile: Profile
}) {
    const { simpleFormatDate } = FormatDate()
    return (
        <div className="w-full relative">
            <Link
                href={href}
                key={profile.id}
                className="w-full h-48 flex gap-6 z-0 p-4 border hover:bg-stone-100 rounded overflow-hidden transition-all duration-300 bg-white"
            >
                <div className="w-fit flex h-full aspect-square my-auto overflow-hidden rounded group">
                    <Image
                        src={`/img/z/${profile.photo.path}`}
                        alt={`${profile.photo.alt}`}
                        width={300}
                        height={400}
                        layout="responsive"
                        draggable={false}
                        className={`aspect-square h-full group-hover:brightness-80 transition-all`}
                    />
                </div>
                <div className="w-6/12 flex flex-col h-full justify-between">
                    <div className="w-full flex flex-col">
                        <span className="text-xl font-semibold">
                            {profile.versionName}
                        </span>
                        <span className="text-stone-700 font-medium">
                            {profile.language}
                        </span>
                    </div>
                    <div className="w-full flex flex-col">
                        <span className="font-medium text-xs">
                            Terakhir diubah
                        </span>
                        <span className="font-medium text-sm">
                            {simpleFormatDate(profile.updated_at.seconds)}
                        </span>
                    </div>
                    <div className="w-full flex flex-col">
                        <span className="font-medium text-xs">Status </span>
                        <span className="font-medium text-sm">
                            {profile.isShowed
                                ? 'Sedang Digunakan'
                                : 'Tidak Digunakan'}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="absolute right-4 top-4 hover:bg-stone-200/50 transition-all h-7 aspect-square grid place-items-center rounded-full z-50">
                <Dropdown>
                    <Dropdown.Trigger>
                        <RxDotsVertical />
                    </Dropdown.Trigger>
                    <Dropdown.Items>
                        <Dropdown.Item
                            href={`/dashboard/profiles/${profile.id}/use`}
                        >
                            Gunakan
                        </Dropdown.Item>
                        <Dropdown.Item
                            href={`/dashboard/profiles/${profile.id}`}
                        >
                            Detail
                        </Dropdown.Item>
                        <Dropdown.Item
                            href={`/dashboard/profiles/${profile.id}/edit`}
                        >
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="delete">Hapus</Dropdown.Item>
                    </Dropdown.Items>
                </Dropdown>
            </div>
        </div>
    )
}
