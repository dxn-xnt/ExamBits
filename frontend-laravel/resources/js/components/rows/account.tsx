import * as React from "react"
import { cn } from "@/lib/utils"

interface AccountData {
    id: number;
    type: string;
    balance: number;
    name: string;
}

interface AccountRowProps extends React.ComponentProps<"div"> {
    data?: AccountData
}

export function AccountRow({
    data,
    className,
    ...props
}: AccountRowProps) {
    if (!data) {
        return null;
    }


    return (
        <div
            data-slot="account-row"
            className={cn(
                "flex flex-row justify-between items-center border-b px-4 py-3 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-sm mb-1">{data.name}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="capitalize font-medium">
                        {data.type.toLowerCase()}
                    </span>
                </div>
            </div>

            <div className="text-right font-semibold text-sm min-w-[100px] md:mt-0 mt-2">
              ₱ {Number(data?.balance ?? 0).toLocaleString("en-US")}
            </div>
        </div>
    )
}
