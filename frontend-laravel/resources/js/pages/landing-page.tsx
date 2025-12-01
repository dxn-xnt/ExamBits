import {Button} from "@/components/ui/button";
import {Download, FileUp, Icon, Sliders, WandSparkles} from "lucide-react";
import GenerateExamForm from "@/pages/form/generate-exam-form";
import {useState} from "react";
import AppLayout from "@/layouts/app-layout";

const features = [
    {
        icon: FileUp,
        title: 'Upload Any Document',
        description: 'Support for PDF, Word, PowerPoint, and text files'
    },
    {
        icon: WandSparkles,
        title: 'AI-Powered Generation',
        description: 'Smart algorithms create relevant questions from your content'
    },
    {
        icon: Sliders,
        title: 'Customizable Options',
        description: 'Choose question types, difficulty levels, and exam length'
    },
    {
        icon: Download,
        title: 'Export & Share',
        description: 'Download exams as PDF or share them instantly'
    }
]
export default function LandingPage() {
    const [showForm, setShowForm] = useState(false);
    return (
        <AppLayout>
            <div className="flex flex-col h-full w-full py-6">
                <section id="generate-exam" className="flex h-screen flex-col items-center justify-center gap-4 text-center">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="54" height="54" rx="27" stroke="black" stroke-width="2"/>
                        <path d="M18.8334 31.6665C15.7958 31.6665 13.3334 34.1289 13.3334 37.1665C13.3334 40.2041 15.7958 42.6665 18.8334 42.6665C19.4762 42.6665 20.0933 42.5562 20.6667 42.3535" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.8167 34.6087C11.3607 33.4236 9.66627 30.9098 9.66627 28.0002C9.66627 25.7789 10.654 23.7882 12.2141 22.4434" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.2705 22.2949C11.7835 21.5668 11.4995 20.6915 11.4995 19.7498C11.4995 17.2185 13.5516 15.1665 16.0829 15.1665C17.1149 15.1665 18.0672 15.5076 18.8333 16.0832" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.2691 16.2029C18.9896 15.6104 18.8333 14.9484 18.8333 14.2498C18.8333 11.7185 20.8854 9.6665 23.4167 9.6665C25.948 9.6665 28 11.7185 28 14.2498V42.6665" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.6667 42.6665C20.6667 44.6915 22.3083 46.3332 24.3333 46.3332C26.3584 46.3332 28 44.6915 28 42.6665" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M28.0001 18.8335C28.0001 21.8711 30.4625 24.3335 33.5001 24.3335" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M43.7839 22.4434C45.344 23.7882 46.3317 25.7789 46.3317 28.0002C46.3317 29.2892 45.9992 30.5006 45.4151 31.5531" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M43.7291 22.2949C44.2161 21.5668 44.5 20.6915 44.5 19.7498C44.5 17.2185 42.448 15.1665 39.9167 15.1665C38.8847 15.1665 37.9324 15.5076 37.1663 16.0832" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M28.0001 14.2498C28.0001 11.7185 30.0521 9.6665 32.5834 9.6665C35.1147 9.6665 37.1667 11.7185 37.1667 14.2498C37.1667 14.9484 37.0105 15.6104 36.731 16.2029" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M31.6667 46.3332C29.6417 46.3332 28.0001 44.6915 28.0001 42.6665" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M40.2222 35.3335L37.1667 40.8335H44.5L41.4445 46.3335" stroke="#131927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <h1 className="text-4xl font-semibold text-gray-900">AI-Powered Exam Generator</h1>
                    <p>Generate smarter and effortless exams instantly</p>
                    <Button
                        variant="outline"
                        size="lg"
                        className="my-6"
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        Generate exam
                    </Button>

                    {showForm && <GenerateExamForm />
                    }
                    {showForm && (
                        <div
                            className="fixed inset-0 bg-black/50 z-2"
                            onClick={() => setShowForm(false)} // close form when overlay clicked
                        />
                    )}
                </section>
                <section id="features" data-name="features" className="flex flex-1 h-screen w-screen flex-col items-center justify-center gap-4 px-20 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Everything you need to create perfect practice exams
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card text-center hover:shadow-lg transition-shadow px-4 py-12 border-3 border-foreground rounded-3xl">
                                <div className="w-16 h-16 bg-[var(--secondary-color)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="h-10 w-10"/>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-[var(--text-secondary)]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
