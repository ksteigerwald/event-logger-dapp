pragma solidity ^0.4.13;

contract Logger {

  address owner;
  uint logged;
  uint public ipfsHash;
  address public lastSender;

  event Logging(address _from, uint _ipfsHash, uint _logged);

  function Logger(uint _ipfsHash, uint _logged) {
    owner = msg.sender;
    ipfsHash = _ipfsHash;
    logged = _logged;
  }

  function logEvent(uint _ipfsHash, bool isValid) {
    if (!isValid) { revert(); }

    ipfsHash = _ipfsHash;
    Logging(msg.sender, ipfsHash, now);
  }

}
