const { ethers } = require("hardhat");

async function main() {
  const [deployer, user] = await ethers.getSigners();

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
    console.log("Tentando comprar créditos...");
    const tx = await carbonCredits.connect(user).buyCredits({
      value: paymentValue,
    });
  
    await tx.wait();
    console.log("Créditos emitidos com sucesso para:", user.address);
  } catch (error) {
    console.error("Falha ao emitir créditos. Motivo:", error.message);
    console.error("Objeto completo do erro:", error);
  }  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro no script:", error.message);
    process.exit(1);
  });
