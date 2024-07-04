

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
    tools: {
        name: string
        url: string
    }[]
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
