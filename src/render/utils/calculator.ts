export const add = (a: number, b: number): number => {
  return a + b;
};

export class Grade {
  math: number;
  english: number;

  constructor(math: number, english: number) {
    this.math = math;
    this.english = english;
  }

  sum(): number {
    return this.math + this.english;
  }
}
