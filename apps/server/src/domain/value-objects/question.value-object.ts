export type QuestionType =
  | "SHORT_ANSWER"
  | "MULTIPLE_CHOICE"
  | "CHECKBOXES"
  | "DROPDOWN";

export class Question {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly type: QuestionType,
    public readonly isRequired: boolean,
    public readonly options?: string[],
  ) {}

  public validate(): void {
    if (
      (this.type === "MULTIPLE_CHOICE" || this.type === "CHECKBOXES") &&
      (!this.options || this.options.length === 0)
    ) {
      throw new Error(`Question "${this.text}" requires options.`);
    }
  }
}
