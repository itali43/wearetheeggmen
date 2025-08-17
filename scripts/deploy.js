// npx hardhat run scripts/deploy.js --network baseSepolia

const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Check if we have a signer
  const [deployer] = await hre.ethers.getSigners();

  if (!deployer) {
    throw new Error(
      "No deployer account found. Make sure PRIVATE_KEY is set in environment variables."
    );
  }

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const WeAreTheEggmen = await hre.ethers.getContractFactory("WeAreTheEggmen");
  console.log("Deploying WeAreTheEggmen on Base Sepolia...");

  const weAreTheEggmen = await WeAreTheEggmen.deploy();
  await weAreTheEggmen.deployed();

  console.log("WeAreTheEggmen deployed to:", weAreTheEggmen.address);
  console.log("Transaction hash:", weAreTheEggmen.deployTransaction.hash);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
