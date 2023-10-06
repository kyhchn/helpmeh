import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
const dynamic = "force-dynamic";
const revalidate = 0;
export default async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const note = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(id!)), eq($notes.userId, userId)));

  if (!note) {
    return new Response("Note not found", { status: 404 });
  }
  revalidatePath("/notes/" + id);
  return NextResponse.json(
    {
      note: note,
    },
    { status: 200 }
  );
}
