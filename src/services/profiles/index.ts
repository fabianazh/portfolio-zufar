import instance from '@/libs/axios/instance'

const profileServices = {
    getAllProfiles: () => instance.get('/api/profiles'),
    getProfileById: (id: string) => instance.get(`/api/profiles/${id}`),
    sendProfile: (data: any) => instance.post(`/api/profiles/`, { data }),
    deleteProfile: (id: string) => instance.delete(`/api/profiles/${id}`),
}

export default profileServices
