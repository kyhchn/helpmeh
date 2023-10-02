"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapTopbar from "./TipTapTopbar";
import { Button } from "./ui/button";
const TipTapEditor = () => {
  const [content, setContent] = React.useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: true,
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <>
      <div className="flex justify-between">
        {editor && <TipTapTopbar editor={editor} />}
        <Button className="bg-teal-500 hover:bg-teal-400">Save</Button>
      </div>

      <div>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTapEditor;
