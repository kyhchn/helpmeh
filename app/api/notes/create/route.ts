import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { $notes } from "@/lib/db/schema";
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = body;
    const image_description = await generateImagePrompt(name);
    if (!image_description)
      return new NextResponse("Error generating image prompt", { status: 500 });

    const image_url = await generateImage(image_description);
    if (!image_url)
      return new NextResponse("Error generating Image", {
        status: 500,
      });

    const notes = await db
      .insert($notes)
      .values({
        name: name,
        userId: userId,
        imageUrl: image_url,
      })
      .returning({
        insertedId: $notes.id,
        imageUrl: $notes.imageUrl,
      });
    return NextResponse.json({
      note_id: notes[0].insertedId,
      image_url: notes[0].imageUrl,
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Error " + error.message, { status: 500 });
  }
}
