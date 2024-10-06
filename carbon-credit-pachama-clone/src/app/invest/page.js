// src/app/invest/page.js

"use client"; // Esta linha precisa ser a primeira do arquivo

import { useState } from 'react';
import { ethers } from 'ethers';

export default function InvestPage() {
  const [amount, setAmount] = useState("");

  const handleInvest = async () => {
    // Função que realiza a compra/investimento
    console.log(`Investindo ${amount}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Invista em Projetos Sustentáveis</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Digite a quantidade a investir"
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleInvest}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Investir
      </button>
    </div>
  );
}
