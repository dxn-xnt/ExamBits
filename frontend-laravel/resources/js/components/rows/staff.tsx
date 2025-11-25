import * as React from "react"
import { cn } from "@/lib/utils"

interface StaffRowProps extends React.ComponentProps<"div"> {
    data?: any,
    category?: string,
}

export function StaffRow({
    data,
    className,
    category,
    ...props
}: StaffRowProps) {
    const getInitials = (name: string) => {
        const names = name.split(" ").filter(n => n.length > 0);
        const initials = names.map((n) => n.charAt(0).toUpperCase());

        // Take only first 2 letters maximum
        if (initials.length > 2) {
            return initials[0] + initials[initials.length - 1];
        }

        // Take up to 2 initials
        return initials.slice(0, 2).join("");
    };

    const getRoleName = (user: any) => {
        if (user.is_admin) return 'Admin';
        if (user.is_loan_officer) return 'Loan Officer';
        if (user.is_teller) return 'Teller';
        return 'Staff';
    };

    return (
        <div
            data-slot="staff-row"
            className={cn(
                "flex flex-row justify-between items-center border-b px-4 py-3 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            <div className="flex flex-row gap-4 items-center">
                {/* Staff initials */}
                <div className="rounded-full bg-muted w-10 h-10 flex aspect-square items-center justify-center">
                    <p className="font-semibold text-sm">
                        {getInitials(data?.name ?? "U")}
                    </p>
                </div>

                {/* Staff info */}
                <div className="flex-1 min-w-[200px]">
                    <p className="font-semibold text-sm">
                        {data?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {data?.email}
                    </p>
                </div>
            </div>

            {/* Role/Type */}
            <div className="text-right text-xs text-foreground min-w-[100px]">
                <p>{getRoleName(data) ?? '—'}</p>
            </div>
        </div>
    );
}
