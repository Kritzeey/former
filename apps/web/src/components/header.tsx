import { Link } from "react-router";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="border-b px-4 h-16 top-0 fixed w-full flex items-center justify-between">
      <Link to="/" className="font-bold text-2xl">
        Former
      </Link>

      <div className="flex gap-2">
        <Link to="/login">
          <Button variant="outline" className="cursor-pointer rounded-md">
            Log In
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="rounded-md hover:opacity-90 cursor-pointer">
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}
