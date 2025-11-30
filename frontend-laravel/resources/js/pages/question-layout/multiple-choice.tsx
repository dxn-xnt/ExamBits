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
    const letters = ["A", "B", "C", "D", "E", "F"]

    // Helper function to strip existing letters from choices and answer
    const stripLeadingLetter = (text: string): string => {
        if (!text) return text;
        // Remove patterns like "A)", "A.", "A ", "a)", "a.", "a " etc. from the beginning
        return text.replace(/^[A-F][.)]\s*/i, '').trim();
    }

    // Clean the choices - remove any existing letter prefixes
    const cleanedChoices = data.choices.map(choice => stripLeadingLetter(choice));

    // Clean the answer and find its index
    const cleanedAnswer = stripLeadingLetter(data.answer);

    // Find which choice matches the answer (case-insensitive comparison)
    const answerIndex = cleanedChoices.findIndex(choice =>
        choice.toLowerCase().trim() === cleanedAnswer.toLowerCase().trim()
    );

    // Get the correct letter for the answer
    const correctLetter = answerIndex !== -1 ? letters[answerIndex] : "?";

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
            <p className="font-medium text-lg">{index + 1}. {data.question}</p>

            {/* Choices */}
            <div className="flex flex-col gap-1 text-md text-foreground">
                {cleanedChoices.map((choice, idx) => {
                    const letter = letters[idx]

                    return (
                        <p key={idx}>
                            <span className="font-semibold">{letter}.</span> {choice}
                        </p>
                    )
                })}
            </div>

            {/* Answer */}
            <p className="text-md font-medium">
                Answer: <span className="font-semibold">{correctLetter}. {cleanedAnswer}</span>
            </p>
        </div>
    )
}
