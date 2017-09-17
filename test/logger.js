var Logger = artifacts.require("./Logger.sol");

contract('Logger', function(accounts) {
  it("should assert true", function(done) {
    var logger = Logger.deployed();
    assert.isTrue(true);
    done();
  });

  it("should have point to QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP", (done) => {
    var logger = Logger.deployed();
    var hash = 'QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP';
    logger.then((contract) => {
      contract.getLastHash().then( val => {
        assert.isTrue(val == hash);
        done();
      });
    })
  });

});
