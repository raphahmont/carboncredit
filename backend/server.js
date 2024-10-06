// Importar módulos necessários
const express = require('express');
const cors = require('cors');

// Criar uma aplicação Express
const app = express();
const port = 5000; // Porta na qual o servidor irá escutar

// Configurar middleware para permitir CORS
app.use(cors());

// Configurar middleware para parsear JSON
app.use(express.json());

// Definir rota para registrar transações
app.post('/api/transactions', (req, res) => {
  console.log('Dados recebidos:', req.body);

  // Aqui você poderia salvar os dados em um banco de dados, se necessário
  const { account, amount, transactionHash } = req.body;

  if (account && amount && transactionHash) {
    console.log(`Transação registrada: 
      Conta: ${account}, 
      Quantidade: ${amount}, 
      Hash da Transação: ${transactionHash}`
    );
    res.status(200).send('Transação registrada com sucesso');
  } else {
    res.status(400).send('Erro: Dados incompletos');
  }
});

// Iniciar o servidor e escutar na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
