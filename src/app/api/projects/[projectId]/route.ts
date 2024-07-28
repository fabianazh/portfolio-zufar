import {
    getDataById,
    updateData,
    deleteData,
    deleteFile,
} from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { serverTimestamp } from 'firebase/firestore'

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    const { projectId } = params
    const project = await getDataById<Project>('projects', projectId)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: project,
    })
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    const data = await req.json()
    const token = req.headers.get('Authorization')?.split(' ')[1] ?? ''
    const projectId = params.projectId

    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET as string,
                (err, decoded) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(decoded)
                    }
                }
            )
        })

        await updateData('projects', projectId, {
            ...data.data,
            updated_at: serverTimestamp(),
        })

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Projek berhasil diperbarui!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Projek gagal diperbarui!',
            error,
        })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    const { projectId } = params
    const token = req.headers.get('Authorization')?.split(' ')[1] ?? ''

    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET as string,
                (err, decoded) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(decoded)
                    }
                }
            )
        })

        const project = await getDataById<Project>('projects', projectId)

        if (project?.thumbnail) {
            await Promise.all(
                project?.thumbnail.map((fileUrl) => deleteFile(fileUrl))
            )
        }

        if (project?.photos) {
            await Promise.all(
                project?.photos.map((fileUrl) => deleteFile(fileUrl))
            )
        }

        await deleteData('projects', projectId)

        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: 'Projek berhasil dihapus!',
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: 'Projek gagal dihapus!',
            error,
        })
    }
}
