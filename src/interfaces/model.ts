interface User {
    password: string
    email: string
    username: string
    fullname: string
    phone: string
}

interface Project {
    id: string
    thumbnail: {
        photo: string
        desc: string
    }
    month: string
    year: string
    name: string
    desc: string
    category: string
    tools: string[]
    photos: {
        photo: string
        desc: string
    }[]
    created_at: string
    isHighlighted: boolean
}

interface FormData {
    name: string
    email: string
    message: string
}
