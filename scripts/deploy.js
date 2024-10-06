const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const CarbonCredits = await ethers.getContractFactory("CarbonCredits");

  // Aqui usamos parseEther em vez de parseUnits para o valor de "initialSupply"
  const initialSupply = ethers.utils.parseEther("1000");

  // Deploy do contrato
  const carbonCredits = await CarbonCredits.deploy(initialSupply);
  await carbonCredits.deployed();

  console.log("Contract deployed at:", carbonCredits.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in deployment:", error);
    process.exit(1);
  });

