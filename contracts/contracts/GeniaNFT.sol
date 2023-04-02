// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract GenIA_NFT is ERC721, Ownable {
    using Strings for uint256;

    mapping (uint256 => string) private _tokenURIs;


    string private _baseURIextended;
    uint256 public _tokenIds = 0 ;


    constructor()
        ERC721("GenIANFT", "GENFT")
    {}
    
    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "This token does not exists");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function getTotalTokens() external view returns(uint256) {
        return _tokenIds;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "This token does not exists");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function transfer(address _to, uint256 tokenId) public returns (bool) {
        require(_exists(tokenId), "This token does not exists");

        approve(_to, tokenId);
        transferFrom(msg.sender, _to, tokenId);

        return true;
    }

    function mint(
        address _to,
        string memory tokenURI_
    ) external payable returns(uint256){
        _tokenIds++;
        _mint(_to, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI_);
        return _tokenIds;
    }
}