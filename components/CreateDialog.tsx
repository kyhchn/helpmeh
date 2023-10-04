"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { IoMdAdd } from "react-icons/io";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {};

const CreateDialog = (props: Props) => {
  const [input, setInput] = React.useState("");
  const router = useRouter();
  const createNotebook = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/notes/create", {
        name: input,
      });
      return res.data;
    },
  });
  const uploadImage = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("/api/notes/upload", {
        imgUrl: data.imageUrl,
        noteId: data.noteId,
      });
      return res.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name");
      return;
    }
    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id, image_url }) => {
        console.log("created new note:" + note_id);
        if (image_url && note_id) {
          uploadImage.mutate(
            {
              imageUrl: image_url,
              noteId: note_id,
            },
            {
              onSuccess: (data) => {
                router.push(`/notes/${note_id}`);
              },
              onError: (err) => {
                console.log(err);
              },
            }
          );
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex border-dashed border-2 border-teal-500 h-full rounded-lg items-center justify-center flex-col sm:flex-row p-4 hover:shadow-xl hover:-translate-y-1 transition ">
          <IoMdAdd className="text-3xl text-teal-500" />
          <h2 className="font-semibold text-teal-500">Create</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create Note</DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Name.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <div className="flex flex-row justify-end items-center gap-4 mt-4">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal-600"
              disabled={createNotebook.isLoading || uploadImage.isLoading}
            >
              {(createNotebook.isLoading || uploadImage.isLoading) && (
                <Loader2 className="animate-spin" size={16} />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
