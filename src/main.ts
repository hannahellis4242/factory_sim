import Binomial from "./factory/Distribution/Binomial";
import Resource from "./factory/Resource";
import Process from "./factory/Process/Process";
import run from "./run";

const inputs = [
  new Resource("A", 1000),
  new Resource("B", 0),
  new Resource("C", 0),
  new Resource("D", 0),
];

const config1 = {
  distribution: new Binomial(25, 0.25),
  requiments: [{ name: "A", quantity: 1 }],
  output: "B",
};

const config2 = {
  distribution: new Binomial(50, 0.25),
  requiments: [{ name: "B", quantity: 1 }],
  output: "C",
};

const config3 = {
  distribution: new Binomial(10, 0.25),
  requiments: [{ name: "C", quantity: 1 }],
  output: "D",
};

const machine1 = new Process({ name: "X", ...config1 });
const machine2 = new Process({ name: "Y", ...config2 });
const machine3 = new Process({ name: "Z", ...config3 });

console.log(run(inputs, [machine1, machine2, machine3]));
