# event-logger-dapp
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

#Webroot
npm install

