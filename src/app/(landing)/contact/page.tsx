import ContactForm from '@/components/Section/Landing/ContactForm'
import ContactInfo from '@/components/Section/Landing/ContactInfo'

export function generateMetadata() {
    return {
        title: 'Kontak',
        description:
            'Hubungi saya untuk kolaborasi atau informasi lebih lanjut mengenai pengalaman dan keterampilan saya sebagai drafter. Saya siap menjawab semua pertanyaan Anda.',
    }
}

export default function ContactPage() {
    return (
        <>
            <ContactInfo />
            <ContactForm />
        </>
    )
}
