// scripts/send_eth.js
const { ethers } = require("hardhat");

async function main() {
  const [sender] = await ethers.getSigners(); // Conta que tem saldo inicial (da rede Hardhat)
  const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Substitua pelo endereço da sua MetaMask

  console.log(`Enviando 1 ETH de ${sender.address} para ${recipient}`);

  const tx = await sender.sendTransaction({
    to: recipient,
    value: ethers.utils.parseEther("1.0"), // Enviando 1 ETH
  });

  await tx.wait();
  console.log(`Transação confirmada! Hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
