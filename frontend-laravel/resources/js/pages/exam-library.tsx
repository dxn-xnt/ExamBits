import AppLayout from "@/layouts/app-layout";
import {AppFooter} from "@/components/app-footer";
import {ExamCard} from "@/components/ui/exam-card";

const data = [
    {
        title: "Exam",
        questionCount: 3,
        topic: "Math"
    },
    {
        title: "Exam",
        questionCount: 3,
        topic: "Math"
    },
    {
        title: "Exam",
        questionCount: 3,
        topic: "Math"
    },
]
export default function ExamLibrary() {
    return (
        <AppLayout>
            <div className="flex flex-col min-h-screen lg:min-h-[700px] w-screen p-6 gap-3 pt-20">
                <div className="flex flex-row w-full justify-between">
                   <h1 className="text-xl font-semibold">My Exambits</h1>
                </div>

                <div className="w-full gap-4 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {data.map((exam, index) => (
                        <ExamCard data={exam} index={index}></ExamCard>
                    ))}
                </div>
            </div>
            <AppFooter/>
        </AppLayout>
    );
}
