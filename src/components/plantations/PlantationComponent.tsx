"use client";
import { usePlantation } from "@/stores/plantation-store";
import { map } from "lodash";
import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import PlantationCard from "./PlantationCard";

interface PlantationComponentProps {}

const PlantationComponent: React.FC<PlantationComponentProps> = (props) => {
  const { plantations, loading } = usePlantation();
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {map(plantations, (plantation) => {
        return <PlantationCard key={plantation.id} {...plantation} />;
      })}
    </div>
  );
};

export default PlantationComponent;
