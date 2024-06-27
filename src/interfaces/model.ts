interface FormData {
    name: string
    email: string
    message: string
}

interface Project {
    id: string
    thumbnail: string
    month: string
    year: string
    name: string
    desc: string
    photos: {
        photo: string
        alt: string
    }[]
    created_at: string
}
