import TypeWriter from "@/components/TypeWriter";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="absolute top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-full md:w-auto">
        <h1 className="font-semibold text-4xl md:text-7xl text-center">
          Take a <span className="text-teal-500">note</span> using{" "}
          <span className="text-teal-500">AI</span>
        </h1>
        <h2 className="my-10 font-semibold text-xl md:text-3xl text-center text-slate-500">
          <TypeWriter />
        </h2>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="gap-2">
              {"Let's Go"}
              <IoIosArrowForward />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
