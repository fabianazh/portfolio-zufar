const currentYear = new Date().getFullYear()

export const categoryOptions = [
    { value: 'Desain Arsitektur', label: 'Desain Arsitektur' },
    { value: 'Desain Interior', label: 'Desain Interior' },
    { value: 'Struktur Bangunan', label: 'Struktur Bangunan' },
    { value: 'Instalasi Listrik & Air', label: 'Instalasi Listrik & Air' },
]

export const monthOptions = [
    { value: 'Jan', label: 'Januari' },
    { value: 'Feb', label: 'Februari' },
    { value: 'Mar', label: 'Maret' },
    { value: 'Apr', label: 'April' },
    { value: 'Mei', label: 'Mei' },
    { value: 'Jun', label: 'Juni' },
    { value: 'Jul', label: 'Juli' },
    { value: 'Agu', label: 'Agustus' },
    { value: 'Sep', label: 'September' },
    { value: 'Okt', label: 'Oktober' },
    { value: 'Nov', label: 'November' },
    { value: 'Des', label: 'Desember' },
]

export const yearOptions = Array.from(
    { length: currentYear - 2020 },
    (_, i) => ({
        value: `${2021 + i}`,
        label: `${2021 + i}`,
    })
)
