import instance from '@/libs/axios/instance'

const contactServices = {
    getAllContacts: () => instance.get('/api/contacts'),
    getContactById: (id: string) => instance.get(`/api/contacts/${id}`),
    updateContact: (id: string, data: any) =>
        instance.put(`/api/contacts/${id}`, { data }),
}

export default contactServices
