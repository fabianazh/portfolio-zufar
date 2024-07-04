import instance from '@/libs/axios/instance'

const projectServices = {
    getAllProjects: () => instance.get('/api/project'),
    updateProject: (id: string, data: any) =>
        instance.put('/api/project', { id, data }),
}

export default projectServices
