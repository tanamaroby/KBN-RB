import * as React from "react";
import { Plantation } from "../../../generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

interface PlantationCardProps extends Plantation {}

const PlantationItem: React.FC<{ label: string; value: string | null }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
};

const PlantationCard: React.FC<PlantationCardProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>
          {props.code} - {props.areaTotalHa}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PlantationItem label="location" value={props.location} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantationCard;
