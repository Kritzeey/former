import { redirect } from "react-router";
import type { Route } from "../+types/root";
import { getCookie } from "@/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Former | Create Forms" },
    { name: "description", content: "Create form." },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const token = getCookie("accessToken");

  if (!token) {
    return redirect("/log-in");
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    return null;
  } catch (error) {
    return redirect("/log-in");
  }
}

export default function CreateForm() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div>Create Forms</div>
    </main>
  );
}
