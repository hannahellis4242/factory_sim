import random from "random";
import Distribution from "./Distribution";
export default class Binomial implements Distribution {
  generator: () => number;
  constructor(n: number, p: number) {
    this.generator = random.binomial(n, p);
  }
  numberOfTicks(): number {
    return this.generator();
  }
}
