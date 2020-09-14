const DSPToken = artifacts.require("DSPToken");

module.exports = function (deployer) {
  deployer.deploy(DSPToken, 1000000);
};
