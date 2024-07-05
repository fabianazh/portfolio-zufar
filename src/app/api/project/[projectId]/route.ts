import { getDataById } from '@/libs/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    const id = params.projectId
    const projects = await getDataById<Project>('projects', id)
    return NextResponse.json({
        status: true,
        statusCode: 200,
        message: 'success',
        data: projects,
    })
}
