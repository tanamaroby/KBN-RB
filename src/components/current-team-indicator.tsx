"use client";

import { cn } from "@/lib/utils";
import { usePlantation } from "@/stores/plantation-store";
import { ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { Skeleton } from "./ui/skeleton";

interface CurrentTeamIndicatorProps {}

const CurrentTeamIndicator: React.FC<CurrentTeamIndicatorProps> = (props) => {
  const { plantation, loading } = usePlantation();

  if (loading) return <Skeleton className="h-6 w-2xl" />;
  if (!plantation)
    return <p className="text-sm">Tidak ada kebun yang terpilih!</p>;

  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        Kebun yang terpilih
      </div>
      <ChevronRightIcon className="h-4 w-4" />
      <div
        className={cn(
          "font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap"
        )}
      >
        {plantation.name}
      </div>
    </div>
  );
};

export default CurrentTeamIndicator;
