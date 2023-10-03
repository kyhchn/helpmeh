import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "@/lib/db/index";
import { $notes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TipTapEditor from "@/components/TipTapEditor";
export const dynamic = "force-dynamic";
export const revalidate = 0;
type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth();
  if (!userId) return redirect("/dashboard");

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.userId, userId!), eq($notes.id, parseInt(id))));
  if (notes.length === 0) return redirect("/dashboard");
  const note = notes[0];
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-lg rounded-xl mt-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Link href="/dashboard">
              <ArrowLeft />
            </Link>
            {note.name}
          </div>

          <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-4 shadow-lg rounded-xl mt-4 prose">
        <TipTapEditor note={note} />
      </div>
    </div>
  );
};

export default page;
