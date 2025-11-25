import * as React from "react"
import { cn } from "@/lib/utils"

interface AuditLogRowProps extends React.ComponentProps<"div"> {
    data? : any
}

export function AuditLogRow({
                                   data,
                                   className,
                                   ...props
                               }: AuditLogRowProps) {
    return (
        <div
            data-slot="audit-log-row"
            className={cn(
                "flex flex-row justify-between items-center border-b px-4 py-3 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-sm">{data.description}</p>
                <p className="text-xs text-muted-foreground">{data.type}, ID: {data.id}</p>
            </div>

            <div className="flex-1 min-w-[200px] mt-2 md:mt-0 ml-auto text-right">
                <p className="text-xs text-muted-foreground">{data.time}</p>
                <p className="text-xs text-muted-foreground">{data.date}</p>
            </div>

        </div>
    )
}
