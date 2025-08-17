// npx hardhat run scripts/setAuthorizedUser.js --network baseSepolia

const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Contract address - replace with your deployed contract address
  const CONTRACT_ADDRESS =
    process.env.CONTRACT_ADDRESS ||
    "0x999F10125807398d2D83a8d2a676a504deC5fAd8";

  // New authorized user address - replace with the address you want to authorize
  const NEW_AUTHORIZED_USER = "0x73E05A47145c14a7b4fd075652843dCEe265428C";

  if (CONTRACT_ADDRESS === "YOUR_CONTRACT_ADDRESS_HERE") {
    throw new Error(
      "Please set CONTRACT_ADDRESS in your .env file or replace it in the script"
    );
  }

  if (NEW_AUTHORIZED_USER === "NEW_USER_ADDRESS_HERE") {
    throw new Error(
      "Please set NEW_AUTHORIZED_USER in your .env file or replace it in the script"
    );
  }

  // Get the contract owner (signer)
  const [owner] = await hre.ethers.getSigners();
  console.log("Setting authorized user with owner account:", owner.address);

  // Get the contract instance
  const WeAreTheEggmen = await hre.ethers.getContractFactory("WeAreTheEggmen");
  const contract = WeAreTheEggmen.attach(CONTRACT_ADDRESS);

  // Check current owner
  const currentOwner = await contract.owner();
  console.log("Current contract owner:", currentOwner);

  if (currentOwner.toLowerCase() !== owner.address.toLowerCase()) {
    throw new Error("You are not the owner of this contract");
  }

  // Get current authorized user
  const currentAuthorizedUser = await contract.authorizedUser();
  console.log("Current authorized user:", currentAuthorizedUser);

  // Set new authorized user
  console.log("Setting new authorized user to:", NEW_AUTHORIZED_USER);
  const tx = await contract.setAuthorizedUser(NEW_AUTHORIZED_USER);

  console.log("Transaction sent:", tx.hash);
  await tx.wait();

  // Verify the change
  const newAuthorizedUser = await contract.authorizedUser();
  console.log("New authorized user set to:", newAuthorizedUser);
  console.log(
    "✅ Authorized user updated successfully!... above may not update quick enough idk.."
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
