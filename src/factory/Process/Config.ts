import Distribution from "../Distribution/Distribution";

export interface Requirement {
  name: string;
  quantity: number;
}
export default interface Config {
  name: string;
  distribution: Distribution;
  requiments: Requirement[];
  output: string;
}
