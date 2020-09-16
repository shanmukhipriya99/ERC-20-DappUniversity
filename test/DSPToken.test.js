const assert = require("assert");

var DSPToken = artifacts.require("DSPToken");

contract("DSPToken", function (accounts) {
  var tokenInstance;

  it("initializes the contract with the correct values", () => {
    return DSPToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then((name) => {
        assert.equal("DSP Token", name, "correct name");
        return tokenInstance.symbol();
      })
      .then((symbol) => {
        assert.equal("DSP", symbol, "correct symbol");
        return tokenInstance.standard();
      })
      .then((standard) => {
        assert.equal("DSP Token v1.0", standard, "correct standard");
      });
  });

  it("allocates the initial supply upon deployment", function () {
    return DSPToken.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        // console.log(tokenInstance.address);
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        // console.log(totalSupply.toNumber());
        assert.equal(
          1000000,
          totalSupply.toNumber(),
          "Sets the total supply to 1000000"
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (adminBalance) {
        // console.log(adminBalance);  //is a big number
        assert.equal(
          1000000,
          adminBalance.toNumber(),
          "allocates the initial supply to the admin"
        );
      });
  });

  it("transfers token ownership", function () {
    return DSPToken.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        // Test `require` statement first by transferring something larger than the sender's balance
        return tokenInstance.transfer.call(accounts[1], 99999999);
      })
      .then(assert.fail)
      .catch(function (error) {
        // console.log('err', error.message);
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        return tokenInstance.transfer.call(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then(function (success) {
        assert.equal(success, true, "it returns true");
        return tokenInstance.transfer(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then((receipt) => {
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(
          receipt.logs[0].event,
          "Transfer",
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          "logs the account the tokens are transferred from"
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          "logs the account the tokens are transferred to"
        );
        assert.equal(
          receipt.logs[0].args._value,
          250000,
          "logs the transfer amount"
        );
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then((balance) => {
        assert.equal(
          balance.toNumber(),
          250000,
          "adds the amt to the receiving account"
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then((balance) => {
        assert.equal(
          balance.toNumber(),
          750000,
          "deducts amy from sending account"
        );
      });
  });
});
