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
    created_at: string
    isUnread: boolean
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
