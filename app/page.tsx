import TypeWriter from "@/components/ui/TypeWriter";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-teal-100 min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h1 className="font-semibold text-7xl text-center">
          Take a <span className="text-teal-500">note</span> using{" "}
          <span className="text-teal-500">AI</span>
        </h1>
        <h2 className="my-10 font-semibold text-3xl text-center text-slate-500">
          <TypeWriter />
        </h2>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="gap-2">
              Let's Go
              <IoIosArrowForward />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
