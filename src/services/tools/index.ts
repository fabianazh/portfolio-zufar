import instance from '@/libs/axios/instance'

const toolServices = {
    getAllTools: () => instance.get('/api/tools'),
    getToolById: (id: string) => instance.get(`/api/tools/${id}`),
    createTool: (data: any) => instance.post('/api/tools', { data }),
    updateTool: (id: string, data: any) =>
        instance.put(`/api/tools/${id}`, { data }),
    deleteTool: (id: string) => instance.delete(`/api/tools/${id}`),
}

export default toolServices
