pragma solidity ^0.5.1;

contract DSPToken {
    //constructor
    //set the total number of tokens
    //read the total number of tokens

    uint256 public totalSupply;
    string public name = 'DSP Token';
    string public symbol = 'DSP';
    string public standard = 'DSP Token v1.0';

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}