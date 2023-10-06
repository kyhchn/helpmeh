"use client";

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function DeleteButon({ noteId }: { noteId: number }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await db.delete($notes).where(eq($notes.id, noteId));
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button className="bg-red-500 hover:bg-red-400" onClick={handleDelete}>
      Delete
    </Button>
  );
}
