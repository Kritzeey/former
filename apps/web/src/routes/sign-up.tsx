import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function Login() {
  return (
    <main className="w-full h-dvh flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg rounded-md">
        <CardHeader className="flex flex-col gap-2 items-center">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>

          <CardDescription className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link className="underline hover:opacity-60" to="/log-in">
              Log in
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              className="rounded-md placeholder:text-muted-foreground/60"
              id="text"
              type="text"
              placeholder="johndoe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="rounded-md placeholder:text-muted-foreground/60"
              id="password"
              type="password"
              placeholder="●●●●●●●●"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              className="rounded-md placeholder:text-muted-foreground/60"
              id="confirmPassword"
              type="confirmPassword"
              placeholder="●●●●●●●●"
            />
          </div>

          <Button className="rounded-md w-full mt-2 hover:opacity-90 cursor-pointer">
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
