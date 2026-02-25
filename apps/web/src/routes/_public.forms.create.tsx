import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Former | Create Forms" },
    { name: "description", content: "Create form." },
  ];
}

export default function CreateForm() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div>Create Forms</div>
    </main>
  );
}
