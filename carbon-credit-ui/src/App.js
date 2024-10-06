import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"; // Atualizar conforme necessário
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "buyCredits",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sellCredits",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    // ... restante da ABI
  ];

  // Função para conectar à Metamask
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("Metamask detectada. Tentando conectar...");

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        console.log("Conta solicitada");

        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);

        console.log("Conta conectada:", account);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract);
        console.log("Contrato conectado com sucesso");
      } catch (error) {
        console.error("Erro ao conectar à Metamask:", error);
      }
    } else {
      console.error("Metamask não está instalada!");
    }
  }

  // Função para comprar créditos de carbono
  async function buyCredits() {
    if (contract) {
      try {
        const value = ethers.parseUnits(amount, "ether");
        const tx = await contract.buyCredits({ value });

        await tx.wait();

        const transactionData = {
          account,
          amount,
          transactionHash: tx.hash,
        };

        await axios.post("http://localhost:5000/api/transactions", transactionData);

        setMessage(`Comprados ${amount} créditos de carbono para ${account}`);
        console.log(`Comprados ${amount} créditos de carbono pelo endereço ${account}`);
      } catch (error) {
        console.error("Erro ao comprar créditos:", error);
        setMessage("Erro ao comprar créditos");
      }
    }
  }

  // Função para vender créditos de carbono
  async function sellCredits() {
    if (contract) {
      try {
        const tx = await contract.sellCredits(ethers.parseUnits(amount, "ether"));

        await tx.wait();

        setMessage(`Vendidos ${amount} créditos de carbono de ${account}`);
        console.log(`Vendidos ${amount} créditos de carbono pelo endereço ${account}`);
      } catch (error) {
        console.error("Erro ao vender créditos:", error);
        setMessage("Erro ao vender créditos");
      }
    }
  }

  return (
    <div>
      <h1>Plataforma de Créditos de Carbono</h1>
      {!account ? (
        <button onClick={connectWallet}>Conectar à Metamask</button>
      ) : (
        <div>
          <p>Conectado: {account}</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Quantidade de créditos"
          />
          <button onClick={buyCredits}>Comprar Créditos</button>
          <button onClick={sellCredits}>Vender Créditos</button>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
