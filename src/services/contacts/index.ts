import instance from '@/libs/axios/instance'

const contactServices = {
    getAllContacts: () => instance.get('/api/contact'),
    getContactDetail: (id: string) => instance.get(`/api/contact/${id}`),
    updateContact: (id: string, data: any) =>
        instance.put('/api/contact', { id, data }),
}

export default contactServices
