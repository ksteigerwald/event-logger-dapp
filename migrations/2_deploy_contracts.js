var Logger = artifacts.require("./Logger.sol");

module.exports = function(deployer) {
  deployer.deploy(Logger, 'QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP', true);
};
