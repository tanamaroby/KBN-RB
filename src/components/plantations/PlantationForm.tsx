"use client";

import {
  createPlantation,
  updatePlantationById,
} from "@/app/plantations/new/actions";
import { useUser } from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Plantation } from "../../../generated/prisma";
import { Button } from "../ui/button";
import DatePicker from "../ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface PlantationFormProps {
  plantation?: Plantation | null;
}

const formSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(1),
  location: z.string().min(3),
  areaTotalHa: z.string().min(1),
  ownerCompany: z.string().optional(),
  managerName: z.string().optional(),
  contactNumber: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
});

const PlantationForm: React.FC<PlantationFormProps> = (props) => {
  const { plantation: injectedPlantations } = props;
  const router = useRouter();
  const { email } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: injectedPlantations
      ? {
          ...injectedPlantations,
          location: injectedPlantations.location ?? "",
          ownerCompany: injectedPlantations.ownerCompany ?? "",
          managerName: injectedPlantations.managerName ?? "",
          contactNumber: injectedPlantations.contactNumber ?? "",
          notes: injectedPlantations.notes ?? "",
          areaTotalHa: injectedPlantations.areaTotalHa?.toString(),
          latitude: injectedPlantations.latitude?.toString(),
          longitude: injectedPlantations.longitude?.toString(),
        }
      : {
          name: "",
          code: "",
          location: "",
          areaTotalHa: "0",
          ownerCompany: "",
          managerName: "",
          contactNumber: "",
          latitude: "0",
          longitude: "0",
          notes: "",
          createdAt: dayjs().toDate(),
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedValues: Omit<Plantation, "id" | "updatedAt"> = {
      ...values,
      areaTotalHa: parseFloat(values.areaTotalHa),
      ownerCompany: values.ownerCompany ?? null,
      managerName: values.managerName ?? null,
      contactNumber: values.contactNumber ?? null,
      latitude: values.latitude ? parseFloat(values.latitude) : null,
      longitude: values.longitude ? parseFloat(values.longitude) : null,
      notes: values.notes ?? null,
    };
    try {
      await toast.promise(
        injectedPlantations
          ? updatePlantationById(parsedValues, injectedPlantations.id, email)
          : createPlantation(parsedValues, email),
        {
          loading: "Saving...",
          success: "Kebun berhasil di buat / edit!",
          error: "Kebun tidak berhasil di buat / edit!",
        }
      );
      router.refresh();
      router.push("/plantations");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1">
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Ketik nama..." {...field} />
                </FormControl>
                <FormDescription>
                  Nama kebun dengan minimum 3 huruf
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1">
                <FormLabel>Kode *</FormLabel>
                <FormControl>
                  <Input placeholder="Ketik kode..." {...field} />
                </FormControl>
                <FormDescription>
                  Kode khusus untuk identifikasikan kebun ini
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="areaTotalHa"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1">
                <FormLabel>Total Area (HA) *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukan luas..."
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Total luas kebun dalam unit Hectare (HA)
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1 xl:col-span-2">
                <FormLabel>Lokasi</FormLabel>
                <FormControl>
                  <Input placeholder="Ketik lokasi..." {...field} />
                </FormControl>
                <FormDescription>Alamat / Lokasi kebun ini</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="ownerCompany"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1 lg:col-span-2 xl:col-span-1">
                <FormLabel>Nama Pemilik</FormLabel>
                <FormControl>
                  <Input placeholder="Ketik nama..." {...field} />
                </FormControl>
                <FormDescription>
                  Nama pemilik / yang punya kebun ini
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="managerName"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1 lg:col-span-2 xl:col-span-3">
                <FormLabel>Nama Manager</FormLabel>
                <FormControl>
                  <Input placeholder="Ketik nama..." {...field} />
                </FormControl>
                <FormDescription>
                  Nama manager / yang urus kebun ini
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1 lg:col-span-2 xl:col-span-1">
                <FormLabel>Nomor HP / Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Ketik nomor..." {...field} />
                </FormControl>
                <FormDescription>
                  Nomor HP atau contact yang bisa dihubungi
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1">
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ketik lokasi..."
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Angka latitude kebun ini, contoh: 0.507068
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1">
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ketik lokasi..."
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Angka longitude kebun ini, contoh: 101.447777
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1 lg:col-span-2 xl:col-span-3">
                <FormLabel>Nota Keterangan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Apapun keterangan yang diperlukan..."
                    className="min-h-42"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tulis segala informasi extra yang terkait dengan kebun ini
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => {
            return (
              <FormItem className="col-span-1 lg:col-span-2 xl:col-span-3">
                <FormLabel>Tanggal Mulai</FormLabel>
                <DatePicker field={field} />
                <FormDescription>Tanggal lahir kebun ini</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          className="col-span-1 lg:col-span-2 xl:col-span-3"
          type="submit"
          disabled={!form.formState.isDirty}
        >
          Selesai
        </Button>
      </form>
      <Link href="/plantations">
        <Button className="w-full" variant="outline">
          Cancel
        </Button>
      </Link>
    </Form>
  );
};

export default PlantationForm;
