import { useParams } from "react-router";
import { forms } from "@/lib/constants";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Former | Form Detail" },
    { name: "description", content: "Form detail." },
  ];
}

export default function FormDetail() {
  const { id } = useParams();
  const form = forms.find((form) => form.id === Number(id));

  if (!form) {
    return <div className="p-8 text-center">Form not found.</div>;
  }

  return (
    <main className="pt-16 flex flex-col">
      <div className="flex items-center justify-between mx-auto max-w-4xl w-full p-6 border-b">
        <div className="flex flex-col justify-center w-full items-center gap-4">
          <h1 className="text-3xl font-bold text-[#56453f]">{form.title}</h1>
          <p className="text-[#a37764] flex items-center gap-2">
            {form.response} total responses
          </p>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto flex flex-col gap-4 my-4">
        {form.questions.map((question, index) => (
          <Card className="rounded-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-xl">
                {index + 1}. {question.question}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
