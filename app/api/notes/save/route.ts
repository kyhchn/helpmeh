import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, id } = body;
    if (!content && !id)
      return new NextResponse("Bad request", { status: 400 });

    const note = (
      await db.select().from($notes).where(eq($notes.id, id))
    ).shift();

    if (!note) return new NextResponse("Note not found", { status: 404 });

    if (note.content !== content) {
      await db.update($notes).set({ content }).where(eq($notes.id, id));

      return NextResponse.json(
        {
          message: "Note updated successfully",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Note wasn't updated",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating note",
      },
      { status: 500 }
    );
  }
}
