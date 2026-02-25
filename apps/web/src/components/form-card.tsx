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
  userId?: string;
}

export default function FormCard({
  form,
  isOwner,
}: {
  form: Form;
  isOwner?: boolean;
}) {
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

      <div className="flex gap-2 items-center">
        {isOwner && (
          <Link to={`/forms/edit/${form.id}`}>
            <Button
              variant="outline"
              className="rounded-md cursor-pointer hover:opacity-90"
            >
              Edit
            </Button>
          </Link>
        )}

        <Link to={`/forms/${form.id}`}>
          <Button className="rounded-md cursor-pointer hover:opacity-90">
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
