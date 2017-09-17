pragma solidity ^0.4.13;

contract Logger {

  address owner;
  uint logged;
  string public ipfsHash;
  address public lastSender;

  event Logging(address _from, string _ipfsHash, uint _logged);

  modifier isValidIPFS(bool isValid) {
    if (!isValid) {
      revert();
    } else {
      _;
    }
  }

  function Logger(string _ipfsHash, bool isValid) isValidIPFS(isValid) {
    owner = msg.sender;
    ipfsHash = _ipfsHash;
    logged = now;
  }

  function logEvent(string _ipfsHash, bool isValid) isValidIPFS(isValid) {
    if (!isValid) {
      revert();
    }

    ipfsHash = _ipfsHash;
    Logging(msg.sender, ipfsHash, now);
  }

  function getLastHash() constant returns (string) {
    return ipfsHash;
  }

}
