import * as React from "react"
import { cn } from "@/lib/utils"
import {useState} from "react";
import {Badge} from "@/components/ui/badge";

interface LoanRowProps extends React.ComponentProps<"div"> {
    isMember? : boolean
    data? : any
}

export function LoanRow({
  isMember,
  data,
  className,
  ...props
}: LoanRowProps) {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase());
    return initials.join("");
  };

  return (
    <div
      data-slot="loan-row"
      className={cn(
        "flex flex-row justify-between items-center border-b px-4 py-3 gap-4 hover:bg-muted/40 transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {/* Member initials */}
        <div className="rounded-full bg-muted w-10 h-10 aspect-square flex items-center justify-center">
          <p className="font-semibold text-sm">
            {getInitials(
              (data?.member?.first_name ?? "") +
                " " +
                (data?.member?.last_name ?? "")
            )}
          </p>
        </div>

        {/* Member info */}
        <div className="flex flex-col min-w-[200px]">
          <p className="font-semibold text-sm">
            {data?.member?.first_name} {data?.member?.middle_name ?? ""}{" "}
            {data?.member?.last_name} {data?.member?.suffix ?? ""}
          </p>
          <p className="text-xs text-muted-foreground">
            {data?.purpose?.name}
          </p>
        </div>

        {/* Member-only initial */}
        {isMember && (
          <div className="flex rounded-full bg-muted w-10 h-10 items-center justify-center">
            <p className="font-semibold text-sm">
              {getInitials(
                (data?.member?.first_name ?? "") +
                  " " +
                  (data?.member?.last_name ?? "")
              )}
            </p>
          </div>
        )}
      </div>
        {/* Status & type */}
        <div className="flex min-w-[200px] ml-30  text-center">
            {data?.status && <Badge variant="secondary">{data?.status}</Badge>}
        </div>

      {/* Amount */}
      <div className="flex text-right justify-end pr-3 font-semibold text-sm min-w-[100px]">
        ₱ {Number(data?.amount ?? 0).toLocaleString("en-US")}
      </div>
    </div>
  );
}
