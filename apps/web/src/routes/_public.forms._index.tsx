import FormCard from "@/components/form-card";
import { Button } from "@/components/ui/button";
import { forms } from "@/lib/constants";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Former | Forms List" },
    { name: "description", content: "Forms list." },
  ];
}

export default function Forms() {
  return (
    <main className="pt-16 h-full w-full items-center justify-center flex">
      <div className="grid grid-cols-5 w-full h-full">
        <div className="col-span-1 border-r h-full p-4">
          <Button className="cursor-pointer hover:opacity-90 w-full rounded-md">
            Create a Form
          </Button>
        </div>

        <div className="p-4 col-span-4 h-full overflow-scroll">
          {forms.map((form) => (
            <FormCard form={form} />
          ))}
        </div>
      </div>
    </main>
  );
}
