import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center">
          <div className="font-bold text-8xl">Former</div>
          <div className="text-2xl text-primary">
            Create forms, hassle-free.
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Link to="/forms">
            <Button
              variant="outline"
              className="cursor-pointer text-xl p-6 rounded-md"
            >
              Forms List
            </Button>
          </Link>

          <Button
            variant="outline"
            className="cursor-pointer text-xl p-6 rounded-md"
          >
            Create a Form
          </Button>
        </div>
      </div>
    </main>
  );
}
