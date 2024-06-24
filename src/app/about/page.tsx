import Article from "@/components/Typography/Article"
import Heading from "@/components/Typography/Heading"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
    return (
        <>
            <section className="w-full flex flex-col gap-16 min-h-screen">
                <div className="w-full h-auto flex gap-10">
                    <div className="w-3/12 shrink-0">
                        <Image
                            src={"/img/z/z1.jpeg"}
                            alt="Zufar"
                            width={200}
                            height={200}
                            className="w-full h-fit"
                        />
                    </div>
                    <Article heading="Biodata" className="w-9/12">
                        <span>
                            Saya adalah lulusan SMK dengan program keahlian
                            Desain Pemodelan dan Informasi Bangunan (DPIB).
                            Selama pendidikan saya, saya telah mengembangkan
                            pemahaman mendalam tentang berbagai aspek desain dan
                            pemodelan bangunan. Setelah lulus, saya mengumpulkan
                            pengalaman berharga dengan bekerja sebagai drafter,
                            surveyor, dan drafter lapangan di PT. WYN KARYA
                            PERKASA. Di sana, saya tidak hanya mengaplikasikan
                            pengetahuan teknis saya, tetapi juga memperoleh
                            sertifikasi dengan predikat yang sangat baik, yang
                            semakin memperkuat kompetensi saya di bidang ini.
                        </span>
                        <span>
                            Selama masa Praktik Kerja Lapangan (PKL), saya
                            mengalami perkembangan pesat baik dalam hard skill
                            maupun soft skill. Saya menjadi lebih mahir dalam
                            penggunaan perangkat lunak desain dan pemodelan,
                            serta teknik-teknik survei yang tepat dan efisien.
                            Selain itu, saya juga mengasah kemampuan manajemen
                            waktu, komunikasi, dan kerja tim, yang semuanya
                            sangat penting dalam lingkungan kerja konstruksi
                            yang dinamis.
                        </span>
                        <span>
                            Saya memiliki minat yang besar untuk berkarir di
                            bidang konstruksi, karena saya yakin dengan
                            kemampuan dan berbagai keterampilan yang saya
                            miliki, saya dapat memberikan kontribusi yang
                            signifikan. Saya percaya bahwa kombinasi dari latar
                            belakang pendidikan, pengalaman praktis, dan
                            kemampuan manajemen saya membuat saya sangat cocok
                            untuk posisi yang saya lamar. Saya berkomitmen untuk
                            terus belajar dan berkembang, serta berkontribusi
                            secara positif dalam setiap proyek yang saya
                            kerjakan. Dengan demikian, saya siap untuk
                            menghadapi tantangan baru dan membawa kesuksesan
                            bagi perusahaan yang saya bergabung.
                        </span>
                    </Article>
                </div>
                <div className="w-full h-auto grid grid-flow-col gap-10">
                    <Article heading="Keterampilan" className="w-full">
                        <span>
                            Saya memiliki berbagai keterampilan teknis yang
                            relevan di bidang konstruksi, termasuk keahlian
                            dalam penggunaan perangkat lunak seperti
                            <Link
                                href="https://www.autodesk.com/products/autocad/overview"
                                className="font-semibold mx-0.5 inline-block"
                            >
                                AutoCAD
                            </Link>
                            ,
                            <Link
                                href="https://www.sketchup.com/"
                                className="font-semibold mx-0.5 inline-block"
                            >
                                SketchUp
                            </Link>
                            , dan{" "}
                            <Link
                                href="https://enscape3d.com/"
                                className="font-semibold mx-0.5 inline-block"
                            >
                                Enscape
                            </Link>
                            . Selain itu, saya juga mahir dalam mengoperasikan
                            <Link
                                href="https://www.microsoft.com/en-us/microsoft-365"
                                className="font-semibold mx-0.5 inline-block"
                            >
                                Microsoft Office
                            </Link>
                            untuk kebutuhan administrasi dan manajemen proyek.
                        </span>
                        <span>
                            Di samping kemampuan teknis, saya juga memiliki
                            berbagai soft skill yang penting. Saya mampu
                            beradaptasi dengan cepat dalam lingkungan kerja yang
                            dinamis dan memiliki kemampuan untuk bekerja efektif
                            dalam tim. Selain itu, saya juga memiliki
                            keterampilan komunikasi yang baik, yang memungkinkan
                            saya untuk berinteraksi dengan berbagai pihak secara
                            profesional dan efisien.
                        </span>
                    </Article>
                    <Article heading="Pengalaman" className="w-full">
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora ipsum labore sunt recusandae
                            veritatis, distinctio delectus quis corrupti
                            sapiente neque sit minima et voluptas commodi nemo
                            dignissimos mollitia quas ullam deserunt, voluptatum
                            numquam. Consequatur temporibus dolores assumenda
                            suscipit deserunt repudiandae, illo eligendi,
                            obcaecati sed fugit deleniti hic mollitia. Maiores
                            rem quisquam architecto tempore nostrum nisi alias
                            provident veritatis vero soluta exercitationem
                            magnam excepturi nobis cupiditate accusantium sequi
                            cumque quia sit quas, illum quibusdam perspiciatis
                            nam? Velit quidem cupiditate delectus nobis
                            laboriosam modi atque fugiat vel? Culpa, sed beatae
                            consectetur laborum numquam blanditiis doloribus
                            minima labore cum est dolore nihil excepturi officia
                            voluptatibus similique aliquam saepe tenetur, rem,
                            ratione magnam. Sint, enim ratione rerum iusto fugit
                            cumque laboriosam qui deleniti est nostrum, autem at
                            provident, expedita reiciendis. Eos, obcaecati vel
                            ratione consequuntur maxime aliquam ducimus,
                            mollitia nostrum, harum autem libero deleniti illo
                            nesciunt itaque ex cum placeat soluta! Totam
                            mollitia sint corrupti impedit accusamus blanditiis
                            eligendi tenetur explicabo, odit qui veritatis
                            veniam voluptatibus deserunt ad consequatur, ab
                            incidunt, pariatur rem numquam et sequi! Vel,
                            repudiandae natus quas non eligendi nihil tempora
                            nobis illum eveniet, id consequuntur et pariatur
                            cupiditate facilis magnam! Id minima itaque labore
                            distinctio ut omnis, sapiente possimus temporibus?
                        </span>
                    </Article>
                </div>
                <div className="w-full h-auto grid grid-flow-col gap-10">
                    <Article heading="Pendidikan" className="w-full">
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora ipsum labore sunt recusandae
                            veritatis, distinctio delectus quis corrupti
                            sapiente neque sit minima et voluptas commodi nemo
                            dignissimos mollitia quas ullam deserunt, voluptatum
                            minima labore cum est dolore nihil excepturi officia
                            voluptatibus similique aliquam saepe tenetur, rem,
                            ratione magnam. Sint, enim ratione rerum iusto fugit
                            cumque laboriosam qui deleniti est nostrum, autem at
                            provident, expedita reiciendis. Eos, obcaecati vel
                            ratione consequuntur maxime aliquam ducimus,
                            mollitia nostrum, harum autem libero deleniti illo
                            nesciunt itaque ex cum placeat soluta! Totam
                            mollitia sint corrupti impedit accusamus blanditiis
                            eligendi tenetur explicabo, odit qui veritatis
                            veniam voluptatibus deserunt ad consequatur, ab
                            incidunt, pariatur rem numquam et sequi! Vel,
                            repudiandae natus quas non eligendi nihil tempora
                            nobis illum eveniet, id consequuntur et pariatur
                            cupiditate facilis magnam! Id minima itaque labore
                            distinctio ut omnis, sapiente possimus temporibus?
                        </span>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora ipsum labore sunt recusandae
                            veritatis, distinctio delectus quis corrupti
                            sapiente neque sit minima et voluptas commodi nemo
                            dignissimos mollitia quas ullam deserunt, voluptatum
                            numquam. Consequatur temporibus dolores assumenda
                            suscipit deserunt repudiandae, illo eligendi,
                            obcaecati sed fugit deleniti hic mollitia. Maiores
                            rem quisquam architecto tempore nostrum nisi alias
                            provident veritatis vero soluta exercitationem
                            magnam excepturi nobis cupiditate accusantium sequi
                            cumque quia sit quas, illum quibusdam perspiciatis
                            nam? Velit quidem cupiditate delectus nobis
                            laboriosam modi atque fugiat vel? Culpa, sed beatae
                            consectetur laborum numquam blanditiis doloribus
                            minima labore cum est dolore nihil excepturi officia
                            voluptatibus similique aliquam saepe tenetur, rem,
                            ratione magnam. Sint, enim ratione rerum iusto fugit
                            cumque laboriosam qui deleniti est nostrum, autem at
                            provident, expedita reiciendis. Eos, obcaecati vel
                            ratione consequuntur maxime aliquam ducimus,
                            mollitia nostrum, harum autem libero deleniti illo
                            nesciunt itaque ex cum placeat soluta! Totam
                            mollitia sint corrupti impedit accusamus blanditiis
                            eligendi tenetur explicabo, odit qui veritatis
                            veniam voluptatibus deserunt ad consequatur, ab
                            incidunt, pariatur rem numquam et sequi! Vel,
                            repudiandae natus quas non eligendi nihil tempora
                            nobis illum eveniet, id consequuntur et pariatur
                            cupiditate facilis magnam! Id minima itaque labore
                            distinctio ut omnis, sapiente possimus temporibus?
                        </span>
                    </Article>
                    <Article heading="Sertifikasi" className="w-full">
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora ipsum labore sunt recusandae
                            veritatis, distinctio delectus quis corrupti
                            sapiente neque sit minima et voluptas commodi nemo
                            dignissimos mollitia quas ullam deserunt, voluptatum
                            numquam. Consequatur temporibus dolores assumenda
                            suscipit deserunt repudiandae, illo eligendi,
                            obcaecati sed fugit deleniti hic mollitia. Maiores
                            rem quisquam architecto tempore nostrum nisi alias
                            provident veritatis vero soluta exercitationem
                            magnam excepturi nobis cupiditate accusantium sequi
                            cumque quia sit quas, illum quibusdam perspiciatis
                            nam? Velit quidem cupiditate delectus nobis
                            laboriosam modi atque fugiat vel? Culpa, sed beatae
                            consectetur laborum numquam blanditiis doloribus
                            minima labore cum est dolore nihil excepturi officia
                            voluptatibus similique aliquam saepe tenetur, rem,
                            ratione magnam. Sint, enim ratione rerum iusto fugit
                            cumque laboriosam qui deleniti est nostrum, autem at
                            provident, expedita reiciendis. Eos, obcaecati vel
                            ratione consequuntur maxime aliquam ducimus,
                            mollitia nostrum, harum autem libero deleniti illo
                            nesciunt itaque ex cum placeat soluta! Totam
                            mollitia sint corrupti impedit accusamus blanditiis
                            eligendi tenetur explicabo, odit qui veritatis
                            veniam voluptatibus deserunt ad consequatur, ab
                            incidunt, pariatur rem numquam et sequi! Vel,
                            repudiandae natus quas non eligendi nihil tempora
                            nobis illum eveniet, id consequuntur et pariatur
                            cupiditate facilis magnam! Id minima itaque labore
                            distinctio ut omnis, sapiente possimus temporibus?
                        </span>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora ipsum labore sunt recusandae
                            veritatis, distinctio delectus quis corrupti
                            sapiente neque sit minima et voluptas commodi nemo
                            dignissimos mollitia quas ullam deserunt, voluptatum
                            numquam. Consequatur temporibus dolores assumenda
                            suscipit deserunt repudiandae, illo eligendi,
                            obcaecati sed fugit deleniti hic mollitia. Maiores
                            rem quisquam architecto tempore nostrum nisi alias
                            provident veritatis vero soluta exercitationem
                            magnam excepturi nobis cupiditate accusantium sequi
                            cumque quia sit quas, illum quibusdam perspiciatis
                            nam? Velit quidem cupiditate delectus nobis
                            laboriosam modi atque fugiat vel? Culpa, sed beatae
                            consectetur laborum numquam blanditiis doloribus
                            minima labore cum est dolore nihil excepturi officia
                            voluptatibus similique aliquam saepe tenetur, rem,
                            ratione magnam. Sint, enim ratione rerum iusto fugit
                            cumque laboriosam qui deleniti est nostrum, autem at
                            provident, expedita reiciendis. Eos, obcaecati vel
                            ratione consequuntur maxime aliquam ducimus,
                            mollitia nostrum, harum autem libero deleniti illo
                            nesciunt itaque ex cum placeat soluta! Totam
                            mollitia sint corrupti impedit accusamus blanditiis
                            eligendi tenetur explicabo, odit qui veritatis
                            veniam voluptatibus deserunt ad consequatur, ab
                            incidunt, pariatur rem numquam et sequi! Vel,
                            repudiandae natus quas non eligendi nihil tempora
                            nobis illum eveniet, id consequuntur et pariatur
                            cupiditate facilis magnam! Id minima itaque labore
                            distinctio ut omnis, sapiente possimus temporibus?
                        </span>
                    </Article>
                </div>
            </section>
        </>
    )
}
