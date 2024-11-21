// contracts/TechnoMarketplace.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TechnoMarketplace is ReentrancyGuard {
    IERC20 public techToken;
    
    struct Item {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address seller;
        bool isActive;
        string category;
        string imageUrl;
    }

    uint256 private _itemIds;
    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) private sellerItems;
    mapping(address => uint256[]) private buyerPurchases;

    event ItemListed(
        uint256 indexed id,
        string name,
        uint256 price,
        address seller,
        string category
    );
    
    event ItemSold(
        uint256 indexed id,
        address buyer,
        address seller,
        uint256 price
    );

    constructor(address _tokenAddress) {
        techToken = IERC20(_tokenAddress);
    }

    function listItem(
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _category,
        string memory _imageUrl
    ) external returns (uint256) {
        _itemIds++;
        
        items[_itemIds] = Item({
            id: _itemIds,
            name: _name,
            description: _description,
            price: _price,
            seller: msg.sender,
            isActive: true,
            category: _category,
            imageUrl: _imageUrl
        });

        sellerItems[msg.sender].push(_itemIds);

        emit ItemListed(_itemIds, _name, _price, msg.sender, _category);
        return _itemIds;
    }

    function buyItem(uint256 _itemId) external nonReentrant {
        Item storage item = items[_itemId];
        require(item.isActive, "Item not available");
        require(item.seller != msg.sender, "Cannot buy your own item");
        
        // Transferir tokens del comprador al vendedor
        require(
            techToken.transferFrom(msg.sender, item.seller, item.price),
            "Transfer failed"
        );
        
        // Marcar el item como vendido
        item.isActive = false;
        
        // Registrar la compra
        buyerPurchases[msg.sender].push(_itemId);
        
        emit ItemSold(_itemId, msg.sender, item.seller, item.price);
    }

    function getSellerItems(address _seller) external view returns (Item[] memory) {
        uint256[] storage sellerItemIds = sellerItems[_seller];
        Item[] memory sellerItemsList = new Item[](sellerItemIds.length);
        
        for (uint256 i = 0; i < sellerItemIds.length; i++) {
            sellerItemsList[i] = items[sellerItemIds[i]];
        }
        
        return sellerItemsList;
    }

    function getBuyerPurchases(address _buyer) external view returns (Item[] memory) {
        uint256[] storage buyerItemIds = buyerPurchases[_buyer];
        Item[] memory purchasesList = new Item[](buyerItemIds.length);
        
        for (uint256 i = 0; i < buyerItemIds.length; i++) {
            purchasesList[i] = items[buyerItemIds[i]];
        }
        
        return purchasesList;
    }

    function getActiveItems() external view returns (Item[] memory) {
        uint256 activeCount = 0;
        
        for (uint256 i = 1; i <= _itemIds; i++) {
            if (items[i].isActive) {
                activeCount++;
            }
        }
        
        Item[] memory activeItems = new Item[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= _itemIds; i++) {
            if (items[i].isActive) {
                activeItems[index] = items[i];
                index++;
            }
        }
        
        return activeItems;
    }
}