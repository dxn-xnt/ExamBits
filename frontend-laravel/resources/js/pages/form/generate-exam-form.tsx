import { Button } from "@/components/ui/button"
import {
    Field, FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldHeader,
    FieldSet, FieldFooter, FieldLegend,
} from "@/components/ui/field"
import {X} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import FileUpload from "@/components/file-upload";
import ToggleRadioGroup from "@/components/ui/radio-group";

type Option = {
    id: string;
    label: string;
    color?: "blue" | "green" | "red" | "violet" | "yellow";
};

export default function GenerateExamForm() {
    const options: Option[] = [
        { id: "hard", label: "Hard" , color: "blue" },
        { id: "moderate", label: "Moderate",  color: "green"},
        { id: "easy", label: "Easy",  color: "red"},
    ];
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card w-full max-w-md h-fit border-2 border-card-foreground rounded-3xl shadow-lg z-10">
            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldHeader>
                            <FieldLegend>Generate Exam</FieldLegend>
                            <Button variant="ghost" size="sm">
                                <X ></X>
                            </Button>
                        </FieldHeader>
                        <FieldContent>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Difficulty
                                </FieldLabel>
                                <ToggleRadioGroup options={options}></ToggleRadioGroup>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                    Question type
                                </FieldLabel>
                                <ToggleGroup type="multiple" variant="outline">
                                    <ToggleGroupItem value="multipleChoice" color="blue">
                                        Multiple Choice
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="trueOrFalse" color="green">
                                        True or False
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="identification" color="red">
                                        Identification
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                    Upload material
                                </FieldLabel>
                                <FileUpload></FileUpload>
                            </Field>
                        </FieldContent>
                    </FieldSet>
                    <FieldFooter>
                        <Button variant="fit" size="xs" type="submit">Generate</Button>
                    </FieldFooter>
                </FieldGroup>
            </form>
        </div>
    )
}
