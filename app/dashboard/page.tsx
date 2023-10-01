"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import CreateDialog from "@/components/CreateDialog";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-teal-100 min-h-screen">
      <div className="max-w-[calc(100vw-40px)] mx-auto p-10">
        <div className="flex flex-row justify-between items-center">
          <Link href="/">
            <Button className="bg-teal-500">Back</Button>
          </Link>
          <h1>Notes</h1>
          <UserButton />
        </div>
        <Separator className="my-3" />
        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-4">
          <CreateDialog />
        </div>
      </div>
    </div>
  );
};
export default Page;