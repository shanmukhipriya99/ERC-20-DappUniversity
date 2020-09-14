const assert = require("assert");

var DSPToken = artifacts.require("DSPToken");

contract('DSPToken', function(accounts ) {
    it('sets the total supply upon deployment', function() {
        return DSPToken.deployed().then(function(instance) {
            tokenInstance = instance;
            console.log(tokenInstance.address);
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            console.log(totalSupply.toNumber());
            assert.equal(1000000, totalSupply.toNumber(), 'Sets the total supply to 1000000');
        });
    });
});