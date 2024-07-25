import instance from '@/libs/axios/instance'

const projectServices = {
    getAllProjects: () => instance.get('/api/projects'),
    getProjectById: (id: string) => instance.get(`/api/projects/${id}`),
    createProject: (data: any) => instance.post('/api/projects', { data }),
    updateProject: (id: string, data: any) =>
        instance.put(`/api/projects/${id}`, { id, data }),
}

export default projectServices
