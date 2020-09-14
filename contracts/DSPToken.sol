pragma solidity ^0.5.1;

contract DSPToken {
    //constructor
    //set the total number of tokens
    //read the total number of tokens

    uint256 public totalSupply;

    constructor(uint256 _initialSupply) public {
        totalSupply = _initialSupply;
    }
}