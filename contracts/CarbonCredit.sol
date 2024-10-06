// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredits {
    string public name = "Carbon Credit Token";
    string public symbol = "CCT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    address public owner;
    uint256 public rate = 1000; // 1 ETH = 1000 Créditos de Carbono

    event IssueCredits(address indexed to, uint256 amount);
    event SellCredits(address indexed from, uint256 amount);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }

    // Função para comprar créditos baseada em um pagamento recebido
    function buyCredits() public payable {
        require(msg.value > 0, "E necessario enviar ETH para comprar creditos");
        
        uint256 creditsToIssue = msg.value * rate; // Calcula quantos créditos devem ser emitidos
        require(creditsToIssue > 0, "Quantidade de creditos deve ser maior que zero");
        require(totalSupply + creditsToIssue >= totalSupply, "Overflow detectado no total de creditos");

        balanceOf[msg.sender] += creditsToIssue;
        totalSupply += creditsToIssue;

        emit IssueCredits(msg.sender, creditsToIssue);
    }

    // Função para vender créditos em troca de ETH
    function sellCredits(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente de creditos");
        require(amount > 0, "Quantidade de creditos deve ser maior que zero");
        
        uint256 ethAmount = amount / rate; // Converte os créditos para a quantidade correspondente em ETH
        require(address(this).balance >= ethAmount, "Contrato nao possui ETH suficiente para realizar a compra");

        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        payable(msg.sender).transfer(ethAmount);

        emit SellCredits(msg.sender, amount);
    }

    // Função para retirar os ETH recebidos para o endereço do proprietário do contrato
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

