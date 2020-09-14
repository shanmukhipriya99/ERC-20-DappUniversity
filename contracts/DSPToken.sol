pragma solidity ^0.5.1;

contract DSPToken {
    //constructor
    //set the total number of tokens
    //read the total number of tokens

    uint256 public totalSupply;
    string public name = 'DSP Token';
    string public symbol = 'DSP';
    string public standard = 'DSP Token v1.0';

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
}