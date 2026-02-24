import { Button } from "./ui/button";

interface Question {
  id: number;
  question: string;
}

interface Form {
  id: number;
  title: string;
  response: number;
  questions: Question[];
}

export default function FormCard({ form }: { form: Form }) {
  return (
    <div className="flex w-full justify-between items-center p-4 hover:bg-primary/20 rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">{form.title}</div>

        <div className="text-md text-primary">
          {form.questions.length} Questions&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          {form.response} Responses
        </div>
      </div>

      <Button className="rounded-md cursor-pointer hover:opacity-90">
        Details
      </Button>
    </div>
  );
}
