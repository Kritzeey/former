import { Link } from "react-router";
import { Button } from "./ui/button";

interface Question {
  id: number | string;
  question: string;
}

interface Form {
  id: number | string;
  _title: string;
  response?: number;
  questions?: Question[];
}

export default function FormCard({ form }: { form: Form }) {
  return (
    <div className="flex w-full justify-between items-center p-4 hover:bg-primary/20 rounded-xl transition-colors">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">{form._title}</div>

        <div className="text-md text-primary font-medium">
          {form.questions?.length || 0}{" "}
          Questions&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          {form.response || 0} Responses
        </div>
      </div>

      <Link to={`/forms/${form.id}`}>
        <Button className="rounded-md cursor-pointer hover:opacity-90">
          Details
        </Button>
      </Link>
    </div>
  );
}
