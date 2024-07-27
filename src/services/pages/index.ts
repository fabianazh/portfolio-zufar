import instance from '@/libs/axios/instance'

const pageServices = {
    getAllPages: () => instance.get('/api/pages'),
    getPageById: (id: string) => instance.get(`/api/pages/${id}`),
    deletePage: (id: string) => instance.delete(`/api/pages/${id}`),
    updatePage: (id: string, data: any) =>
        instance.put(`/api/pages/${id}`, { data }),
}

export default pageServices
