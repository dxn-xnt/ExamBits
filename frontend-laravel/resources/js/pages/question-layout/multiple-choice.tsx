import * as React from "react"
import { cn } from "@/lib/utils"

interface MultipleChoiceData {
    question: string
    choices: string[]
    answer: string
}

interface MultipleChoiceProps extends React.ComponentProps<"div"> {
    data: MultipleChoiceData
    index: number
}

export function MultipleChoice({ data, className, index, ...props }: MultipleChoiceProps) {
    const letters = ["A", "B", "C", "D"]
    const correctLetter = letters[data.choices.indexOf(data.answer)];

    return (
        <div
            data-slot="multiple-choice-layout"
            className={cn(
                "flex w-full flex-col border-2 border-card-foreground rounded-lg gap-2 px-4 py-3 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            {/* Question */}
            <p className="font-medium text-lg">{index+1}. {data.question}</p>

            {/* Choices */}
            <div className="flex flex-col gap-1 text-md text-foreground">
                {data.choices.map((choice, index) => {
                    const letter = letters[index]

                    return (
                        <p
                        >
                            <span>{letter}.</span> {choice}
                        </p>
                    )
                })}
            </div>

            {/* Answer */}
            <p className="text-md font-medium">
                Answer: <span className="font-semibold">{correctLetter}. {data.answer}</span>
            </p>
        </div>
    )
}
