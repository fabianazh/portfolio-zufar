import instance from '@/libs/axios/instance'

const toolServices = {
    getAllTools: () => instance.get('/api/tool'),
    getToolById: (id: string) => instance.get(`/api/tool/${id}`),
    updateTool: (id: string, data: any) =>
        instance.put('/api/tool', { id, data }),
}

export default toolServices
