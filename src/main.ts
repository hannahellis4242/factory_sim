import Binomial from "./factory/Distribution/Binomial";
import Resource from "./factory/Resource";
import Process from "./factory/Process/Process";
import run from "./run";

const inputs = [
  new Resource("A", 100),
  new Resource("B", 0),
  new Resource("C", 0),
];

const config1 = {
  distribution: new Binomial(25, 0.25),
  requiments: [{ name: "A", quantity: 1 }],
  output: "B",
};

const config2 = {
  distribution: new Binomial(25, 0.25),
  requiments: [{ name: "B", quantity: 2 }],
  output: "C",
};

const machine1 = new Process({ name: "X1", ...config1 });
const machine2 = new Process({ name: "X2", ...config1 });
const machine3 = new Process({ name: "Y", ...config2 });

console.log(run(inputs, [machine1, machine2, machine3]));
