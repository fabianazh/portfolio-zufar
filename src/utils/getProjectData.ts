const projects: Project[] = [
    {
        id: "eksterior-smkn-1-kota-sukabumi",
        thumbnail: "eksterior-smkn-1-kota-sukabumi/halaman-depan-aula.jpg",
        month: "Apr",
        year: "2024",
        name: "Visualisasi Eksterior SMKN 1 Kota Sukabumi",
        desc: "Proyek visualisasi 3D eksterior sekolah merupakan upaya untuk menghasilkan gambaran digital yang realistis dari bagian luar bangunan sekolah yang merujuk kepada beberapa kondisi pada lingkungan sekitar sekolah, penataan ruang teori, ruang praktik jurusan, sarana dan prasarana sekolah. Tujuan utamanya adalah untuk memberikan gambaran yang jelas dan mendalam kepada pihak terkait, seperti pengelola sekolah, siswa, dan masyarakat, mengenai sekolah tersebut.",
        photos: [
            {
                photo: "eksterior-smkn-1-kota-sukabumi/site-smkn-1.jpg",
                alt: "Site SMKN 1",
            },
            {
                photo: "eksterior-smkn-1-kota-sukabumi/tampak-depan-aula.jpg",
                alt: "Tampak Depan Aula",
            },
            {
                photo: "eksterior-smkn-1-kota-sukabumi/taman.jpg",
                alt: "Taman",
            },
            {
                photo: "eksterior-smkn-1-kota-sukabumi/lapangan-utama.jpg",
                alt: "Lapangan Utama",
            },
            {
                photo: "eksterior-smkn-1-kota-sukabumi/ruang-jurusan-dpib.jpg",
                alt: "Ruang Jurusan DPIB",
            },
        ],
        created_at: "2024-06-27T14:34:45.123Z",
    },
]

export function getAllProjects() {
    return projects
}

export function getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id)
}
