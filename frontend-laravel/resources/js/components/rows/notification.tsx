import * as React from "react"
import { cn } from "@/lib/utils"

interface NotificationRowProps extends React.ComponentProps<"div"> {
    data? : any
}

export function NotificationRow({
                                data,
                                className,
                                ...props
                               }: NotificationRowProps) {
    return (
        <div
            data-slot="notification-row"
            className={cn(
                "flex flex-col md:flex-row justify-between items-start md:items-center border-b px-4 py-3 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            <div className="flex flex-row gap-4">
                <div
                    className={cn(
                        "flex-1",
                        data.isRead ? "text-muted-foreground" : "text-destructive"
                    )}
                >
                    <p className="font-medium text-sm">{data.title}</p>
                    <p className="text-xs">{data.date}</p>
                </div>

            </div>

        </div>
    )
}
