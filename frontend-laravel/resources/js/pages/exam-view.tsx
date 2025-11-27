
import {useState} from "react";
import AppLayout from "@/layouts/app-layout";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Edit, Pencil} from "lucide-react";
import {RadioButton} from "@/components/ui/radio-group";
import {MultipleChoice} from "@/pages/question-layout/multiple-choice";
import {TrueOrFalse} from "@/pages/question-layout/true-or-false";
import {Identification} from "@/pages/question-layout/identification";

const Exam = {
    title: "Exam",
    topics: ["Math", "Science"],
    difficulty: "Easy"
}

const Questions = {
    multiple : [
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: "Carbon Dioxide"
        },
        {
            question: "What is the largest ocean on Earth?",
            choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "Which of the following is a prime number?",
            choices: ["15", "21", "29", "39"],
            answer: "29"
        }
    ],

    trueOrFalse : [
        {
            question: "The human heart has four chambers.",
            answer: "True"
        },
        {
            question: "Sound travels faster in air than in water.",
            answer: "False"
        },
        {
            question: "Light travels faster than sound.",
            answer: "True"
        }
    ],

    identification: [
        {
            question: "What do you call the process by which plants make their own food?",
            answer: "Photosynthesis"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answer: "Diamond"
        },
        {
            question: "What is the capital city of Japan?",
            answer: "Tokyo"
        }
    ]
}
type Option = {
    id: string;
    label: string;
    color?: "blue" | "green" | "red" | "violet" | "yellow";
};

export default function LandingPage() {
    const options: Option[] = [
        { id: "multipleChoice", label: "Multiple Choice" , color: "violet" },
        { id: "trueOrFalse", label: "True or False",  color: "yellow"},
        { id: "identification", label: "Identification",  color: "blue"},
    ];
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState<string>(options[0].id);
    return (
        <AppLayout>
            <div className="flex flex-1 min-h-[620px] mt-20 flex-col items-center justify-start gap-3 rounded-xl px-10 pb-10">
                <div className="flex flex-row w-full justify-between">
                    <Button variant="fit" size="xs"><ArrowLeft/></Button>
                    <Button variant="fit" size="xs">Publish</Button>
                </div>
                <div className="flex flex-col w-full border-2 border-card-foreground rounded-md gap-1 px-3 py-2">
                    <div className="flex flex-row w-fit gap-2 items-center group">
                        <input
                            type="text"
                            defaultValue={Exam.title}
                            className="flex text-2xl font-medium w-fit text-foreground outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                        <Pencil size="16" className="hidden group-hover:block " />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row w-fit space-x-1">
                            <p className="text-md text-foreground">Difficulty:</p>
                            <p className="text-md font-semibold text-foreground">{Exam.difficulty}</p>
                        </div>
                        <div className="flex flex-row w-fit space-x-1">
                            <p className="text-md text-foreground">Topics:</p>
                            {Exam.topics.map((topic, index) => (
                                <p className="text-md font-semibold text-foreground" key={index}>
                                    {topic}{index !== Exam.topics.length - 1 && ','}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                    <h2 className="font-medium text-md">Test Types</h2>
                    <div className="flex flex-row w-full gap-4">
                        <div className="flex flex-col w-[24%] gap-2">
                            {options.map((option) => (
                                <RadioButton
                                    key={option.id}
                                    option={option}
                                    isSelected={selected === option.id}
                                    onSelect={setSelected}
                                    className="w-full text-left font-medium"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col w-[50%]">
                            {selected === "multipleChoice" ? (
                                <section id="multipleChoice" className="flex w-full flex-col gap-3">
                                    {Questions.multiple.map((questionProps, index) => (
                                        <MultipleChoice key={index} index={index} data={questionProps} />
                                    ))}
                                </section>
                            ) : selected === "trueOrFalse" ? (
                                <section id="trueOrFalse" className="flex w-full flex-col gap-3">
                                    {Questions.trueOrFalse.map((questionProps, index) => (
                                        <TrueOrFalse key={index} index={index} data={questionProps} />
                                    ))}
                                </section>
                            ) : (
                                <section id="identification" className="flex w-full flex-col gap-3">
                                    {Questions.identification.map((questionProps, index) => (
                                        <Identification key={index} index={index} data={questionProps} />
                                    ))}
                                </section>
                            )}
                        </div>
                    </div>
                </div>





                <div className="flex flex-col">


                </div>
            </div>
        </AppLayout>
    );
}
