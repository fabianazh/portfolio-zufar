import instance from '@/libs/axios/instance'

const contactServices = {
    getAllContacts: () => instance.get('/api/contact'),
    updateContact: (id: string, data: any) =>
        instance.put('/api/contact', { id, data }),
}

export default contactServices
