const assert = require("assert");

var DSPToken = artifacts.require("DSPToken");

contract('DSPToken', function(accounts) {
    var tokenInstance;

    it('initializes the contract with the correct values', () => {
        return DSPToken.deployed(). then((instance) => {
            tokenInstance = instance;
            return tokenInstance.name();     
        }).then((name) => {
            assert.equal('DSP Token', name, 'correct name');
            return tokenInstance.symbol();
        }).then((symbol) => {
            assert.equal('DSP', symbol, 'correct symbol');
            return tokenInstance.standard();
        }).then((standard) => {
            assert.equal('DSP Token v1.0', standard, 'correct standard');
        });
    });

    it('allocates the initial supply upon deployment', function() {
        return DSPToken.deployed().then(function(instance) {
            tokenInstance = instance;
            // console.log(tokenInstance.address);
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            // console.log(totalSupply.toNumber());
            assert.equal(1000000, totalSupply.toNumber(), 'Sets the total supply to 1000000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            // console.log(adminBalance);  //is a big number
            assert.equal(1000000, adminBalance.toNumber(), 'allocates the initial supply to the admin');
        });
    });
});