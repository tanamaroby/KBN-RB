"use client";
import { cn } from "@/lib/utils";
import { capitalize } from "lodash";
import { ChevronsUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Plantation } from "../../../generated/prisma";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Label } from "../ui/label";
import PlantationDeleteButton from "./PlantationDeleteButton";

interface PlantationCardProps extends Plantation {}

const PlantationItem: React.FC<{
  label: string;
  value: string | null | undefined;
  className?: string;
}> = ({ label, value, className }) => {
  if (!value) return null;
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label className="text-xs text-muted-foreground">
        {capitalize(label)}
      </Label>
      <p className="text-sm text-foreground wrap-normal">{value}</p>
    </div>
  );
};

const PlantationCard: React.FC<PlantationCardProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Card className="hover:shadow-lg transition-shadow pt-0 overflow-hidden">
      <Image
        src={
          props.code === "PAN01"
            ? "/kebun-placeholder-1.jpg"
            : props.code === "SIN01"
            ? "/kebun-placeholder-2.jpg"
            : "/kebun-placeholder-3.jpg"
        }
        alt="Kebun placeholder image"
        width={612}
        height={344}
        className="h-[200px] w-auto object-cover"
      />
      <Collapsible open={open} onOpenChange={setOpen} className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 justify-between">
            <CardTitle className="text-lg truncate">{props.name}</CardTitle>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 cursor-pointer"
              >
                <p className="text-sm">Expand</p>
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CardDescription className="text-xs">
            Code: <span className="font-semibold">{props.code}</span> • Luas:{" "}
            <span className="font-semibold">{props.areaTotalHa} Ha</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <CollapsibleContent className="grid gap-y-6">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              <PlantationItem
                label="Lokasi"
                value={props.location}
                className="sm:col-span-2"
              />
              <PlantationItem
                label="Pemilik Kebun"
                value={props.ownerCompany}
                className="sm:col-span-2"
              />
              <PlantationItem label="Manager Kebun" value={props.managerName} />
              <PlantationItem label="Nomor HP" value={props.contactNumber} />
            </div>

            <hr className="border-muted" />

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              <PlantationItem
                label="Latitude"
                value={props.latitude?.toString()}
              />
              <PlantationItem
                label="Longitude"
                value={props.longitude?.toString()}
              />
              <PlantationItem
                label="Keterangan"
                value={props.notes}
                className="sm:col-span-2 line-clamp-2"
              />
            </div>

            <hr className="border-muted" />

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <PlantationItem
                label="Tanggal Dibuat"
                value={props.createdAt.toDateString()}
              />
              <PlantationItem
                label="Tanggal Update"
                value={props.updatedAt.toDateString()}
              />
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
      <CardFooter className="flex items-center justify-between border-t gap-4">
        <Link href={`/plantations/${props.id}`} className="col-span-3 w-full">
          <Button className="flex w-full items-center gap-2">
            <Search />
            <p>Lihat dan Edit</p>
          </Button>
        </Link>
        <PlantationDeleteButton id={props.id} />
      </CardFooter>
    </Card>
  );
};

export default PlantationCard;
