import instance from '@/libs/axios/instance'

const projectServices = {
    getAllProjects: () => instance.get('/api/project'),
    getProjectById: (id: string) => instance.get(`/api/project/${id}`),
    createProject: (data: any) => instance.post('/api/project', { data }),
    updateProject: (id: string, data: any) =>
        instance.put('/api/project', { id, data }),
}

export default projectServices
