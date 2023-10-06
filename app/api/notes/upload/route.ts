import uploadImage from "@/lib/firebase";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
export const runtime = "edge";
export async function POST(req: Request) {
  try {
    const { imgUrl, noteId } = await req.json();
    if (!noteId)
      return new NextResponse("No note id provided", { status: 400 });

    const note = (
      await db.select().from($notes).where(eq($notes.id, noteId))
    ).shift();

    if (!note) return new NextResponse("Note not found", { status: 404 });

    if (!imgUrl)
      return new NextResponse("No image url provided", { status: 400 });

    const response = await uploadImage(imgUrl);
    if (!response)
      return new NextResponse("Error uploading image", { status: 500 });

    await db
      .update($notes)
      .set({ imageUrl: response })
      .where(eq($notes.id, noteId));

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Error " + error.message, { status: 500 });
  }
}
