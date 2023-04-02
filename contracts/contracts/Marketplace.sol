// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface GENIA {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function burn(address _account,uint256 amount) external payable returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external  returns (bool);
}

interface GENFT {
    function mint(address to, string memory tokenURI_) external payable returns (uint256);
    function transfer(address to, uint256 _tokenId) external returns (bool);
    function getTotalTokens() external view returns(uint256);
}

contract MarketPlace{
    using Strings for uint256;

    GENIA public GenIA;
    GENFT public GeNFT;

    uint256 public promptPrice;

    // Bridge Events
    event activateBridgeToPolygon(uint256 indexed sent, string prompt);

    
    constructor(
        address _tokenContract,
        address _NFTContract,
        uint256 _promptPrice) {

        promptPrice = _promptPrice;
        GenIA = GENIA(_tokenContract);
        GeNFT = GENFT(_NFTContract);
        
    }

    function CreateURI() internal view returns(string memory) {
        uint256 total = GeNFT.getTotalTokens() + 1;
        return string(abi.encodePacked("https://res.cloudinary.com/dsebklwp5/image/upload/v1/", total.toString(), ".png"));
    }

    function SendPrompt(string memory _prompt) public payable {
       
        GeNFT.mint(msg.sender, CreateURI());

        GenIA.burn(msg.sender, promptPrice);

        emit activateBridgeToPolygon(GeNFT.getTotalTokens(), _prompt);
    }

}