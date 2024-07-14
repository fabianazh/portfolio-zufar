import { getDataById, updateData } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { profileId: string } }
) {
    const id = params.profileId
    const profiles = await getDataById<Profile>('profiles', id)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: profiles,
    })
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { profileId: string } }
) {
    const id = params.profileId
    try {
        const data = await req.json()
        await updateData('profiles', id, data.data)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Update info kontak berhasil!',
            data: data,
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Update info kontak gagal!',
        })
    }
}
