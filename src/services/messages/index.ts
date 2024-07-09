import instance from '@/libs/axios/instance'

const messageServices = {
    getAllMessages: () => instance.get('/api/messages'),
    getMessageById: (id: string) => instance.get(`/api/messages/${id}`),
    sendMessage: (data: any) =>
        instance.post(`/api/messages/`, { data }),
}

export default messageServices
