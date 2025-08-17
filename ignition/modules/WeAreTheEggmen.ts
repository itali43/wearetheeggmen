import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("EggmenModule", (m) => {
  // If your contract has constructor args, pass them as the 2nd param
  const eggmen = m.contract("WeAreTheEggmen" /*, [arg1, arg2] */);

  // Example of a post-deploy call (remove if not needed)
  // m.call(eggmen, "initialize", [/* args */]);

  return { eggmen };
});
