// npx hardhat run scripts/deploy.js --network baseSepolia

const { ethers } = require("hardhat");

async function main() {
  const WeAreTheEggmen = await ethers.getContractFactory("WeAreTheEggmen");
  console.log("Deploying WeAreTheEggmen on Base Sepolia...");
  const weAreTheEggmen = await WeAreTheEggmen.deploy();
  await weAreTheEggmen.deployed();
  console.log("WeAreTheEggmen deployed to:", weAreTheEggmen.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
