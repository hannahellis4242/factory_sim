import Process from "./factory/Process/Process";
import Resource from "./factory/Resource";

const stopCondition = (
  inputs: Resource[],
  machines: Process[],
  clock: number
) => {
  return clock >= 1000;
  /*return inputs[0].quantity === 0 &&
    machines.every((machine) => machine.mode === "Waiting";*/
};

const run = (
  inputs: Resource[],
  machines: Process[],
  clock: number = -1
): string => {
  if (clock === -1) {
    //create table header
    const header = `tick\t${inputs.map((x) => x.name).join("\t")}\t${machines
      .map((x) => `${x.config.name} status`)
      .join("\t")}\n`;
    return header + run(inputs, machines, clock + 1);
  }
  const output = `${clock}\t${inputs
    .map((x) => x.quantity)
    .join("\t")}\t${machines.map((x) => `${x.mode}`).join("\t")}\n`;

  if (stopCondition(inputs, machines, clock)) {
    return output;
  }
  machines.forEach((x) => x.run(inputs));
  return output + run(inputs, machines, clock + 1);
};

export default run;
