Example DAPP aimed to utilize Ethereum Smart Contracts and IPFS to log events on the block chain and store JSON files to IPFS

#Test IPFS Files
added QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP event-logger-dapp/some-extraordinary-event.json
added QmPDYXiRnE3MUyJ35oYts3YGmecpUppdMzUiG9nSx5mSte event-logger-dapp


#start testrpc
testrpc --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,web3" -u 0 -u 1

#install ipfs 

osx: brew install ipfs

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'

ipfs daemon 


geth --fast --cache=1048 --testnet --password .password --unlock 0 --rpc --rpcapi "db,eth,net,web3,admin,personal" --rpccorsdomain '*' --rpcaddr localhost --rpcport 8545  --wsorigins="*" --ws --wsapi "db,eth,net,web3,admin,personal"

# event-logger-dapp
Example DAPP aimed to utilize Ethereum Smart Contracts and IPFS to log events on the blockchain and store JSON files to IPFS.

To run this application, you must have installed an running the following: 

IPFS - https://ipfs.io/
geth - https://geth.ethereum.org/downloads/

Prior to launching ipfs, be sure to set the CORS headers as such: 

``` 
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]' 
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]' 
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```

IPFS Should be up and running as a daemon. 
```$ ipfs daemon ```

When running geth, use the following configuration: 

```geth --fast --cache=1048 --testnet --unlock "0xYOURMAINADDRESS" --password ~/Desktop/.password --unlock 0 --rpc --rpcapi "db,eth,net,web3,admin,personal" --rpccorsdomain '*' --rpcaddr localhost --rpcport 8545  --wsorigins="*" --ws --wsapi "db,eth,net,web3,admin,personal"```

OR modify the .geth file and launch it from there. 

Note: This will not work with MetaMask as it relies on WebSockets. 

# Front end
open the app.js file under webroot/src. You will need to change the address to the one you are using under geth. If you have mist installed, this will likely be your main account. It defaults to 0 if you used the settings. 
```
    var ContractManager = (function () {

	const contractAddress = "0x70780fbd60ce921a04947c45353e5a925f4550aa"; //on ropsten
	const wallet = "0xE3Af82E76ea98616205bf526Aa3B403e8845F270"; //your wallet here
    ...
```

To run the front end:
``` $cd webroot
    $ npm install
    $ npm start
```

