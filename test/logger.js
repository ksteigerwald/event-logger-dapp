var Logger = artifacts.require("./Logger.sol");

contract('Logger', function(accounts) {
  it("should assert true", function(done) {
    console.log('alsdjfalsfkjlk');
    var logger = Logger.deployed();
    console.log(logger.contract);
    assert.isTrue(true);
    done();
  });
});
