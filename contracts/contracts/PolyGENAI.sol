// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract PolyContract is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    using Strings for uint256;

    // Chainlink Variables
    address private oracleAddress;
    bytes32 private jobIdNumber;
    uint256 private fee = (1 * LINK_DIVISIBILITY) / 50;

    // Chainlink Events
    event PromptSent(bytes32 indexed requestId);
    event PromptRequestFulfilled(bytes32 indexed requestId, uint256 result);
 
    constructor(
        address _oracleAddress,
        address _tokenAddress,
        bytes32 _jobIdNumber) {
        
        setChainlinkToken(_tokenAddress);
        setChainlinkOracle(_oracleAddress);

        oracleAddress = _oracleAddress;
        jobIdNumber = _jobIdNumber;
        
    }

    function CreatePrompt(uint256 _id, string memory _prompt) public pure returns(string memory) {
        return string(abi.encodePacked("https://genai-backend.onrender.com/get_images/", _id.toString(), "&", _prompt));
    }

    function SendPrompt(string memory _prompt, uint256 _id) public payable {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobIdNumber,
            address(this),
            this.fulfillPrompt.selector
        );

        req.add("get", CreatePrompt(_id, _prompt));

        bytes32 request = sendOperatorRequest(req, fee);

        emit PromptSent(request);
    }

    function fulfillPrompt(
        bytes32 requestId,
        uint256 _result
    ) public recordChainlinkFulfillment(requestId) {
        emit PromptRequestFulfilled(requestId, _result);
    }
}