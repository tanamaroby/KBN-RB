"use client";

import { deletePlantationFromId } from "@/app/plantations/[id]/actions";
import { useUser } from "@/stores/user-store";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface PlantationDeleteButtonProps {
  id: string;
}

const PlantationDeleteButton: React.FC<PlantationDeleteButtonProps> = (
  props
) => {
  const { id } = props;
  const router = useRouter();
  const { email } = useUser();
  const [open, setOpen] = React.useState(false);

  const onDelete = async () => {
    try {
      await toast.promise(deletePlantationFromId(id, email), {
        loading: "Kebun sedang dihapus...",
        success: "Kebun berhasil dihapus!",
        error: "Kebun gagal dihapus!",
      });
      setOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error((e as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Hapus Kebun</DialogTitle>
          <DialogDescription>
            Apakah anda yakin mau hapus kebun?
          </DialogDescription>
        </DialogHeader>
        <p>Tindakan ini tidak dapat dibatalkan!</p>
        <DialogFooter className="flex items-center gap-4 justify-center">
          <Button onClick={onDelete}>Ya</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Tidak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlantationDeleteButton;
