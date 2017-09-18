import css from './stylesheet.css'
import Web3 from 'web3'
import ipfs from 'browser-ipfs'

if (typeof web3 !== 'undefined') {
	// Use Mist/MetaMask's provider
	window.web3 = new Web3(web3.currentProvider);
  } else {
	console.log('No web3? You should consider trying MetaMask!')
	  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

const contractAddres = "0x7823c87A06Fe125A957AD4ad2a50EE48A88CbC30"; //on ropsten
const mistWallet = "0x422244F99c97993cFE5CA3B2E1A4Be589df24080";

const abi = [ 
	{ "constant": true, "inputs": [], "name": "lastSender", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "disable", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLastHash", "outputs": [ { "name": "", "type": "string", "value": "QmdXuGjgFtHhT8gW81HqbSvgJwFZzKUVHHTudVjFUDKMcn" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_ipfsHash", "type": "string" }, { "name": "isValid", "type": "bool" } ], "name": "logEvent", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "ipfsHash", "outputs": [ { "name": "", "type": "string", "value": "QmdXuGjgFtHhT8gW81HqbSvgJwFZzKUVHHTudVjFUDKMcn" } ], "payable": false, "type": "function" }, { "inputs": [ { "name": "_ipfsHash", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;ipfs Hash", "template": "elements_input_string", "value": "QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP" }, { "name": "isValid", "type": "bool", "index": 1, "typeShort": "bool", "bits": "", "displayName": "is Valid", "template": "elements_input_bool", "value": true } ], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_ipfsHash", "type": "string" }, { "indexed": false, "name": "_logged", "type": "uint256" } ], "name": "Logging", "type": "event" } ];

console.log(web3.currentProvider)
//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let contract = new web3.eth.Contract(abi, contractAddres);

contract.methods.logEvent("QmXuR54Mu5XVTAE99z4bRhfhxkgeBF4TFQyujJR9FYX6gP", true).send({from: mistWallet}, (err, val) => {
	console.log("----- IN ----");
	console.log(err, val);
});

ipfs.localProvider = {host: '127.0.0.1', port: '5001', protocol: 'http', root: '/api/v0'};

ipfs.setProvider(ipfs.localProvider)

console.log("Hello from app.js")

ipfs.cat("QmdXuGjgFtHhT8gW81HqbSvgJwFZzKUVHHTudVjFUDKMcn", function(err, text) {
	if (err) throw err;
	console.log("text:", text); 	// "Testing..."
});
