require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.27", // Adicionando a versão compatível com o seu contrato
      }
    ]
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
