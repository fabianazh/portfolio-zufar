interface Contact {
    id: string
    name: string
    displayName: string
    link: string
}

interface Mail {
    id: string
    name: string
    email: string
    message: string
    created_at: {
        seconds: number
        nanoseconds: number
    }
    isUnread: boolean
}

interface Tool {
    id: string
    name: string
    link: string
}

interface Profile {
    id: string
    versionName: string
    language: string
    photo: {
        path: string
        alt: string
    }
    isUsed: boolean
    created_at: {
        seconds: number
        nanoseconds: number
    }
    updated_at: {
        seconds: number
        nanoseconds: number
    }
    education: {
        title: string
        desc?: string
        yearStart: string
        yearEnd: string
    }[]
    certifications: {
        title: string
        month: string
        year: string
    }[]
    experience: {
        title: string
        desc: string[]
        monthStart: string
        monthEnd: string
        yearStart?: string
        yearEnd: string
    }[]
    // [key: string]: any
}

interface Project {
    id: string
    thumbnail: {
        photo: string
        desc: string
    }
    date: string
    name: string
    desc: string
    category: string
    tools: {
        name: string
        url: string
    }[]
    photos: {
        photo: string
        desc: string
    }[]
    created_at: {
        seconds: number
        nanoseconds: number
    }
    updated_at: {
        seconds: number
        nanoseconds: number
    }
}

interface FormData {
    name: string
    email: string
    message: string
}
