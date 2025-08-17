// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WeAreTheEggmen is Ownable {
    mapping(string => address) public blobToUser;
    mapping(address => string[]) public userToBlobs;
    address public authorizedUser;
    uint public blobCount;

    constructor() Ownable(msg.sender) {
        // Initialization code if needed
    }

    modifier onlyAuthorizedUser() {
        require(msg.sender == authorizedUser, "Not authorized to add");
        _;
    }

    function setAuthorizedUser(address _user) public onlyOwner {
        authorizedUser = _user;
    }

    function addBlob(string memory blobId, address userAddress) public onlyAuthorizedUser {
        require(blobToUser[blobId] == address(0), "Blob ID already exists");
        blobToUser[blobId] = userAddress;
        userToBlobs[userAddress].push(blobId);
        blobCount++;
    }

    function getBlobOf(string memory blobId) public view returns (address) {
        return blobToUser[blobId];
    }

    function getUserBlobs(address userAddress) public view returns (string[] memory) {
        return userToBlobs[userAddress];
    }
}
