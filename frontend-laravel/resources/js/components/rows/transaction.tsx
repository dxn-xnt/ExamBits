import * as React from "react"
import { cn } from "@/lib/utils"

interface Member {
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  full_name: string;
}

interface User {
  name: string;
}

interface TransactionRowData {
  id?: number;
  type: string;
  member?: Member;
  user?: User;
  amount: number;
  created_at: string;
  // For teller variant
  date?: string;
  member_name?: string;
}

interface TransactionRowProps extends React.ComponentProps<"div"> {
  data?: TransactionRowData;
  variant?: 'default' | 'teller';
}

export function TransactionRow({
  data,
  variant = 'default',
  className,
  ...props
}: TransactionRowProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "No date available";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatAmount = (amount: number) => {
    return `₱ ${Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
    } catch {
      return "";
    }
  };

  const formatDateOnly = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleDateString("en-US");
    } catch {
      return "";
    }
  };

  const getMemberDisplayName = (member?: Member) => {
    if (!member) return "No member linked";

    if (member.full_name && member.full_name !== "No member linked") {
      return member.full_name;
    }

    // Build name from individual parts
    const names = [
      member.first_name,
      member.middle_name,
      member.last_name,
      member.suffix
    ].filter(part => part && part.trim() !== '');

    return names.join(' ') || "No member linked";
  };

  if (!data) {
    return (
      <div
        className={cn(
          "flex flex-row justify-between items-start md:items-center border-b px-4 py-3",
          className
        )}
        {...props}
      >
        <div className="text-muted-foreground">No data available</div>
      </div>
    );
  }

  // TELLER VARIANT - Simple layout with member in center
  if (variant === 'teller') {
    return (
      <div
        data-slot="transaction-row"
        className={cn(
            "flex flex-row justify-between items-center border-b px-4 py-3 gap-4 hover:bg-muted/40 transition-colors",
          className
        )}
        {...props}
      >
        {/* Left: Transaction Type and Date */}
        <div className="flex-1 min-w-[200px]">
          <p className="font-semibold text-sm">{data.type}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {data.date || formatDateOnly(data.created_at)}
          </p>
        </div>

        {/* Center: Member Name with Label */}
        <div className="flex-1 min-w-[200px] text-center">
          <p className="text-sm text-muted-foreground">
            Member: {data.member_name || getMemberDisplayName(data.member)}
          </p>
        </div>

        {/* Right: Amount */}
        <div className="flex-1 min-w-[100px] text-right font-semibold text-sm">
          {formatAmount(data.amount || 0)}
        </div>
      </div>
    );
  }

  // DEFAULT VARIANT - Original layout
    return (
        <div
            data-slot="transaction-row"
            className={cn(
                "flex flex-row w-full items-center justify-between border-b px-4 py-3 gap-4 hover:bg-muted/40 transition-colors",
                className
            )}
            {...props}
        >
            <div className="flex flex-col min-w-[200px]">
                <p className="font-semibold text-sm capitalize">
                    {data.type?.toLowerCase() || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDateOnly(data.created_at)} {formatTime(data.created_at)}
                </p>
            </div>

            <div className="flex flex-col min-w-[200px]">
                <p className="text-xs text-muted-foreground">
                    Member: {getMemberDisplayName(data.member)}
                </p>
                <p className="text-xs text-muted-foreground">
                    Processed by: {data.user?.name || "System"}
                </p>
            </div>

            <div className="flex text-right justify-end pr-3 lg:pr-0 font-semibold text-sm min-w-[100px]">
                {formatAmount(data.amount || 0)}
            </div>
        </div>
    )

}
