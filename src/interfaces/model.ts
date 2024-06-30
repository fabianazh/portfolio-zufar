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
        alt: string
    }
    month: string
    year: string
    name: string
    desc: string
    photos: {
        photo: string
        alt: string
    }[]
    created_at: string
    isHighlighted: boolean
}

interface FormData {
    name: string
    email: string
    message: string
}
