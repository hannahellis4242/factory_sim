import Resource from "../Resource";
import Config, { Requirement } from "./Config";
import { Mode } from "./Mode";

const isMet = (required: Requirement, inputs: Resource[]) => {
  const resourse = inputs.find((input) => input.name === required.name);
  return resourse ? resourse.check(required.quantity) : false;
};

const takeInput = (required: Requirement, inputs: Resource[]) => {
  const resourse = inputs.find((input) => input.name === required.name);
  if (resourse) {
    resourse.take(required.quantity);
  }
};

const addResource = (name: string, resources: Resource[]) => {
  const resource = resources.find((x) => x.name === name);
  if (resource) {
    resource.add(1);
  } else {
    resources.push(new Resource(name, 1));
  }
};

export default class Process {
  mode: Mode;
  tick: number;
  constructor(public config: Config) {
    this.mode = "Waiting";
    this.tick = 0;
  }
  run(resources: Resource[]) {
    if (this.mode === "Operating") {
      if (this.tick === 0) {
        this.mode = "Waiting";
        addResource(this.config.output, resources);
      } else {
        this.tick--;
      }
    } else if (this.mode === "Waiting") {
      const haveAvailableInputs = this.config.requiments.every((requirement) =>
        isMet(requirement, resources)
      );
      if (haveAvailableInputs) {
        //take those items off the input
        this.config.requiments.forEach((requirement) =>
          takeInput(requirement, resources)
        );
        //set the number of ticks required to produce a product from distribution
        this.tick = this.config.distribution.numberOfTicks();
        //move into operating state
        this.mode = "Operating";
      }
      return 0;
    }
    return 0;
  }
}
