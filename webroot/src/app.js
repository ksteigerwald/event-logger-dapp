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


ipfs.localProvider = { host: '127.0.0.1', port: '5001', protocol: 'http', root: '/api/v0' };

ipfs.setProvider(ipfs.localProvider)

console.log("Hello from app.js")

ipfs.cat("QmUP9sEPXPXuf4mPJs4ZthTcXcZwdsAk1D6Lizb8Frhcb3", function(err, text) {
	if (err) throw err;
	console.log("text:", text); 	// "Testing..."
});

var DocManager = (function () {

	const $doc = document.getElementById("doc")
	
	function isJSON(text){
		try{
			JSON.parse(text);
			return true;
		}
		catch (error){
			return false;
		}
	}

	function add(input) {
		if( !isJSON(input)) return false
		console.log(input);

		ipfs.addJson(input, (err, hash) => {
			if (err) {
				console.log("Could not submit document");
			}
			console.log(hash);
			ContractManager.send(hash);
		})
	}

	function read() {
		console.log("hitreeadadd")
	}

	function init() {
		$doc.value = JSON.stringify({ root: [ "put your json doc here"]});
	}

	return {
		add : add,
		read : read,
		init : init
	}
})()

var ContractManager = (function () {

	const contractAddres = "0x2f923eE727ff6e28a52D90AeF56CEc7d0613E6e9"; //on ropsten
	const wallet = "0x422244F99c97993cFE5CA3B2E1A4Be589df24080";
	var contract;

	const abi = [
		{ "constant": true, "inputs": [], "name": "lastSender", "outputs": [{ "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "disable", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLastHash", "outputs": [{ "name": "", "type": "string", "value": "QmdXuGjgFtHhT8gW81HqbSvgJwFZzKUVHHTudVjFUDKMcn" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_ipfsHash", "type": "string" }, { "name": "isValid", "type": "bool" }], "name": "logEvent", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "ipfsHash", "outputs": [{ "name": "", "type": "string", "value": "QmdXuGjgFtHhT8gW81HqbSvgJwFZzKUVHHTudVjFUDKMcn" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_ipfsHash", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;ipfs Hash", "template": "elements_input_string", "value": "QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP" }, { "name": "isValid", "type": "bool", "index": 1, "typeShort": "bool", "bits": "", "displayName": "is Valid", "template": "elements_input_bool", "value": true }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_ipfsHash", "type": "string" }, { "indexed": false, "name": "_logged", "type": "uint256" }], "name": "Logging", "type": "event" }];

	function send(ipfsHash) {
		console.log("SEND IN:", ipfsHash);
		contract.methods.logEvent(ipfsHash, true).send({ from: wallet }, (err, val) => {
			console.log("----- IN ----");
			console.log(err, val);
		});
	}

	function init() {
		contract = new web3.eth.Contract(abi, contractAddres);
	}

	return {
		send : send,
		init : init
	}
})()

DocManager.init();
ContractManager.init();

document.getElementById('add-doc').addEventListener("mousedown", (click) => {
	let doc = document.getElementById('doc')
	DocManager.add(doc.value);
});
