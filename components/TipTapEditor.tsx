"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapTopbar from "./TipTapTopbar";
import { Button } from "./ui/button";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCompletion } from "ai/react";
import Text from "@tiptap/extension-text";
import { BsMagic } from "react-icons/bs";
type Props = {
  note: NoteType;
};
const TipTapEditor = ({ note }: Props) => {
  const [content, setContent] = React.useState(note.content);
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-x": () => {
          const words = this.editor.getText().split(" ").slice(-30).join(" ");
          lastCompletion.current = "";
          complete(words);
          return true;
        },
      };
    },
  });
  const editor = useEditor({
    extensions: [StarterKit, customText],
    autofocus: true,
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleMobileCompletion = () => {
    if (!editor) return;
    const words = editor.getText().split(" ").slice(-30).join(" ");
    lastCompletion.current = "";
    complete(words);
    return true;
  };
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/notes/save", {
        id: note.id,
        content: content,
      });
    },
  });
  const lastCompletion = React.useRef("");

  useEffect(() => {
    if (!completion || !editor) return;
    console.log(completion);
    console.log(lastCompletion.current.length);
    const diff = completion.slice(lastCompletion.current.length);
    console.log("diff ", diff);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion]);

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
      <div className="w-full prose-sm">
        <EditorContent editor={editor} />
      </div>
      <span className="mt-2 hidden md:block">
        Press: <kbd>Shift+x</kbd> to autocomplete with AI
      </span>
      <Button
        className="bg-teal-500 block md:hidden rounded-full"
        onClick={handleMobileCompletion}
      >
        <BsMagic />
      </Button>
    </>
  );
};

export default TipTapEditor;
