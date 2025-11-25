import * as React from "react"
import { cn } from "@/lib/utils"
import {Badge} from "@/components/ui/badge";
import { getDateString } from "@/pages/admin/loan-view";
interface InstallmentRowProps extends React.ComponentProps<"div"> {
    data? : any
}

export function InstallmentRow({
                                        data,
                                        className,
                                        ...props
                                    }: InstallmentRowProps) {
    const badgeType = data.status == "Paid" ? "outline" : data.status == "Pending" ? "secondary" : "destructive";
    return (
        <div
            data-slot="installment-row"
            className={cn(
                "flex flex-row justify-between items-center border-b px-4 py-3 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-sm">{getDateString(data.due_date)}</p>
                <Badge variant={badgeType}>
                    {data.status}
                </Badge>
            </div>

            <div className="text-right font-semibold text-sm min-w-[100px]">
                {`₱ ${Number(data.amount).toLocaleString("en-US")}`}
            </div>
        </div>
    )
}
