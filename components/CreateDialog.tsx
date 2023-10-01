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

type Props = {};

const CreateDialog = (props: Props) => {
  const [input, setInput] = React.useState("");
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex border-dashed border-2 border-teal-500 h-full rounded-lg items-center justify-center flex-col sm:flex-row p-4 hover:shadow-xl hover:-translate-y-1 transition ">
          <IoMdAdd className="text-3xl text-teal-500" />
          <h2 className="font-semibold text-teal-500">kons</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>konsz</DialogHeader>
        <Input
          placeholder="Name.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></Input>
        <div className="flex flex-row justify-end items-center gap-4">
          <Button type="reset" variant={"secondary"}>
            Cancel
          </Button>
          <Button type="submit" className="bg-teal-600">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
