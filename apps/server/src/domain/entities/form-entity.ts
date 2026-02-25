import { Question } from "../value-objects/question.value-object";

export class Form {
  constructor(
    public readonly id: string,
    public readonly creatorId: string,
    public readonly title: string,
    public readonly description: string,
    private questions: Question[],
    public readonly createdAt: Date,
  ) {}

  public addQuestion(question: Question): void {
    question.validate();

    this.questions.push(question);
  }
}
