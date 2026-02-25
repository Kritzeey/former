import FormCard from "@/components/form-card";
import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "react-router";
import { getCookie } from "@/lib/utils";
import type { Route } from "./+types/_public.forms._index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Former | Forms List" },
    { name: "description", content: "Forms list." },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const token = getCookie("accessToken");

  const response = await fetch("http://localhost:3000/api/forms", {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch forms");
  }

  const data = await response.json();

  console.log(data);

  return data.forms;
}

export default function Forms() {
  const forms = useLoaderData<typeof clientLoader>();

  return (
    <main className="pt-16 h-full w-full items-center justify-center flex">
      <div className="grid grid-cols-5 w-full h-full">
        <div className="col-span-1 border-r h-full p-4 flex flex-col gap-2">
          <Link to="/forms/create" className="w-full">
            <Button className="cursor-pointer hover:opacity-90 w-full rounded-md">
              Create a Form
            </Button>
          </Link>
        </div>

        <div className="p-4 col-span-4 h-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            {forms.length === 0 ? (
              <div className="text-center text-muted-foreground mt-10">
                No forms found. Create one to get started!
              </div>
            ) : (
              forms.map((form: any) => <FormCard key={form.id} form={form} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
