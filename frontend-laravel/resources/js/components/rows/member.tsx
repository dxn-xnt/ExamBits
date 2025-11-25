import * as React from "react"
import { cn } from "@/lib/utils"

interface MemberRowProps extends React.ComponentProps<"div"> {
    data? : any,
    category? : string,
}

export function MemberRow({
  data,
  className,
  category,
  ...props
}: MemberRowProps) {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase());
    return initials.join("");
  };
  return (
    <div
      data-slot="member-row"
      className={cn(
        "flex flex-row justify-between items-center border-b px-4 py-3 hover:bg-muted/40 transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex flex-row gap-4 items-center">
        {/* Member initials */}
        <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center">
          <p className="font-semibold text-sm">
            {getInitials(
              (data?.first_name ?? "") +
                " " +
                (data?.last_name ?? "")
            )}
          </p>
        </div>

        {/* Member info */}
        <div className="flex-1 min-w-[200px]">
          { (['date','type','fname'].includes(category ?? '')) ? (
            <p className="font-semibold text-sm">
              {data?.first_name} {data?.middle_name ?? ""}{" "}
              {data?.last_name} {data?.suffix ?? ""}
            </p>
          ) : (
            <p className="font-semibold text-sm">
              {data?.last_name}, {data?.first_name} {data?.middle_name ?? ""}{" "}
              {data?.suffix ?? ""}
            </p>
          )
          }
          <p className="text-xs text-muted-foreground">
            Join Date: {data?.join_date?.split(" ")[0] + " "+ new Date(data?.join_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLocaleUpperCase()}
          </p>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right font-semibold text-sm min-w-[100px]">
        <p>₱ {(data.accounts ?? []).reduce((sum : number, acc: any) => sum + Number(acc.balance ?? 0),0).toLocaleString('en-US')}</p>
      </div>
    </div>
  );
}
