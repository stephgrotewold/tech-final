// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TechnoToken is ERC20, Ownable {
    // Eventos para el faucet
    event TokensRequested(address indexed requester, uint256 amount);
    
    // Mapeo para rastrear las solicitudes del faucet
    mapping(address => uint256) private lastRequest;
    
    // Constantes
    uint256 public constant FAUCET_AMOUNT = 10 * 10**18; // 10 TECH tokens
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    constructor() ERC20("Techno Token", "TECH") Ownable(msg.sender) {
        // Mint inicial de 1,000,000 TECH tokens al deployer
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    // Función para el faucet
    function requestTokens() external {
        require(
            block.timestamp >= lastRequest[msg.sender] + FAUCET_COOLDOWN,
            "Please wait 24 hours between requests"
        );
        require(
            balanceOf(address(this)) >= FAUCET_AMOUNT,
            "Faucet is empty"
        );

        lastRequest[msg.sender] = block.timestamp;
        _transfer(address(this), msg.sender, FAUCET_AMOUNT);
        
        emit TokensRequested(msg.sender, FAUCET_AMOUNT);
    }

    // Función para que el owner pueda fondear el faucet
    function fundFaucet(uint256 amount) external onlyOwner {
        _transfer(msg.sender, address(this), amount);
    }

    // Función para quemar tokens (opcional)
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}