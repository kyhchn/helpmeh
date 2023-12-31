import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import CreateDialog from "@/components/CreateDialog";
import { db } from "@/lib/db/index";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
export const revalidate = 0;
type Props = {};

const Page = async (props: Props) => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-teal-100 min-h-screen">
      <div className="max-w-[calc(100vw-40px)] mx-auto p-10">
        <div className="flex flex-row justify-between items-center">
          <Link href="/">
            <Button className="bg-teal-500">Back</Button>
          </Link>
          <h1 className="text-xl">Notes</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        <Separator className="my-3 bg-slate-300" />
        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-4">
          <CreateDialog />
          {notes.map((note, index) => (
            <Link href={"/notes/" + note.id} key={index}>
              <div className="w-full rounded-xl overflow-hidden shadow-sm flex flex-col hover:-translate-y-1 transition hover:shadow-xl h-full">
                <div className="relative w-full sm:h-44 md:h-52">
                  <Image alt={note.name} src={note.imageUrl!} fill />
                </div>

                <div className="w-full bg-white opacity-95 p-2 flex-1">
                  <p className="text-black">{note.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
