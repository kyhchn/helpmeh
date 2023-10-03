"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapTopbar from "./TipTapTopbar";
import { Button } from "./ui/button";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";

type Props = {
  note: NoteType;
};
const TipTapEditor = ({ note }: Props) => {
  const [content, setContent] = React.useState(note.content);
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: true,
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/notes/save", {
        id: note.id,
        content: content,
      });
    },
  });

  useEffect(() => {
    const update = setTimeout(() => {
      saveNote.mutate(undefined, {
        onSuccess: () => {
          console.log("saved");
        },
        onError: () => {
          console.log("error saving");
        },
      });
    }, 500);
    return () => clearTimeout(update);
  }, [content]);
  return (
    <>
      <div className="flex justify-between">
        {editor && <TipTapTopbar editor={editor} />}
        <Button className="bg-teal-500 hover:bg-teal-400" disabled>
          {saveNote.isLoading && (
            <Loader2 className="animate-spin mr-1" size={16} />
          )}
          Save
        </Button>
      </div>

      <div>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTapEditor;
