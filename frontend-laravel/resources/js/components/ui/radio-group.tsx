import { useState } from "react";


type Option = {
    id: string;
    label: string;
    color?: "blue" | "green" | "red" | "violet" | "yellow";
};


interface ToggleRadioGroupProps {
    options: Option[];
}

interface RadioButtonProps {
    option: {
        id: string;
        label: string;
        color?: string;
    };
    isSelected: boolean;
    onSelect: (id: string) => void;
    className?: string;
    href?: string;
}

function RadioButton({ option, isSelected, onSelect, className  }: RadioButtonProps) {
    const baseClasses =
        "px-4 py-1.5 text-md rounded-md border-2 border-card-foreground text-foreground transition-colors";

    const colorClass = option.color === "blue"
        ? "bg-accent-blue hover:bg-accent-blue "
        : option.color === "green"
            ? "bg-accent-green hover:bg-accent-green"
            : option.color === "red"
                ? "bg-accent-red hover:bg-accent-red"
                : option.color === "violet"
                    ? "bg-accent-violet hover:bg-accent-violet"
                    : option.color === "yellow"
                        ? "bg-accent-yellow hover:bg-accent-yellow"
                        : "";

    const unselectedClasses =
        "bg-transparent";

    return (
        <button
            type="button"
            onClick={() => onSelect(option.id)}
            className={[
                baseClasses,
                isSelected ? colorClass : unselectedClasses,
                className
            ].join(" ")}
        >
            {option.label}
        </button>
    );
}

export default function ToggleRadioGroup({ options }: ToggleRadioGroupProps) {
    const [selected, setSelected] = useState<string>(options[0].id);

    return (
        <div className="flex gap-2">
            {options.map((option) => (
                <RadioButton
                    key={option.id}
                    option={option}
                    isSelected={selected === option.id}
                    onSelect={setSelected}              />
            ))}
        </div>
    );
}
export { RadioButton, ToggleRadioGroup };
