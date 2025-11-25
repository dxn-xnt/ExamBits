import { useState } from "react";
import { Button } from "@/components/ui/button"
export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative border-2 border-card-foreground rounded-lg p-6 text-center transition-colors">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <Button
                        variant="fit" size="xs"
                    >
                        Upload
                    </Button>
                    <p className="text-xs text-gray-500">Drag & drop file here</p>
                    {file && <p className="text-sm mt-2 text-gray-700">{file.name}</p>}
                </div>
            </div>
        </div>
    );
}
