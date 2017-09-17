var Logger = artifacts.require("./Logger.sol");

module.exports = function(deployer) {
  deployer.deploy(Logger);
};
