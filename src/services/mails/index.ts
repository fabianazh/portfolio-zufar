import instance from '@/libs/axios/instance'

const mailServices = {
    getAllMails: () => instance.get('/api/mails'),
    getMailById: (id: string) => instance.get(`/api/mails/${id}`),
    sendMail: (data: any) => instance.post(`/api/mails/`, { data }),
}

export default mailServices
