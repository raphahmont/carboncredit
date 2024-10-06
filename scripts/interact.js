const { ethers } = require("hardhat");

async function main() {
  const [deployer, user] = await ethers.getSigners();

  // Certifique-se de que temos os signatários corretos
  console.log("Deployer Address:", deployer.address);
  console.log("User Address:", user.address);

  // Implantar o contrato CarbonCredits
  const CarbonCredits = await ethers.getContractFactory("CarbonCredits");
  const initialSupply = ethers.utils.parseUnits("1000", 18);
  const carbonCredits = await CarbonCredits.deploy(initialSupply);

  await carbonCredits.deployed();
  console.log("CarbonCredits deployed to:", carbonCredits.address);

  // Verificar o saldo do usuário antes de tentar comprar créditos
  const userBalance = await user.getBalance();
  console.log("User balance:", ethers.utils.formatEther(userBalance));

  if (userBalance.lt(ethers.utils.parseEther("0.01"))) {
    throw new Error("User does not have enough funds to buy credits");
  }

  // Definindo o valor de pagamento para compra de créditos de carbono
  const paymentValue = ethers.utils.parseEther("0.01"); // 0.01 ETH

  try {
    // Conectar ao contrato usando `user` e comprar créditos
    console.log("Attempting to buy credits...");
    const tx = await carbonCredits.connect(user).buyCredits({
      value: paymentValue,
    });

    await tx.wait();
    console.log("Credits issued successfully to:", user.address);
  } catch (error) {
    console.error("Failed to issue credits:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in script:", error);
    process.exit(1);
  });

