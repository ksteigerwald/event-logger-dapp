import css from './stylesheet.css'
import Web3 from 'web3'
import ipfs from 'browser-ipfs'

// if (typeof web3 !== 'undefined') {
// 	// Use Mist/MetaMask's provider
// 	window.web3 = new Web3(web3.currentProvider);
//   } else {
// 	console.log('No web3? You should consider trying MetaMask!')
// 	  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
// 	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }

window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
window.web3.setProvider('ws://localhost:8546');

ipfs.localProvider = { host: '127.0.0.1', port: '5001', protocol: 'http', root: '/api/v0' };

ipfs.setProvider(ipfs.localProvider)

var DocManager = (function () {

	const $doc = document.getElementById("doc")
	
	function findDoc() {
		document.getElementById("Logging").addEventListener('click', function(e){
			if (e.target.matches('a.ipfsHash')) {
				e.stopPropagation();
				let hash = e.target.innerHTML;
				ipfs.catJson(hash, (e, doc) => {
					$doc.value = doc;
				})
			}
		});
	}

	function isJSON(text){
		try{
			JSON.parse(text);
			return true;
		}
		catch (error){
			return false;
		}
	}

	function docUpdate() {
		$doc.value = "Document sending..."	
		console.log("----- docUpdate");
		setTimeout(() => {
			$doc.value = JSON.stringify({ root: [ "put your json doc here"]});
		}, 2000);
	}
	function add(input) {
		if( !isJSON(input)) return false

		ipfs.addJson(input, (err, hash) => {
			if (err) {
				console.log("Could not submit document");
			}
			console.log("----- docUpdate", hash);
			docUpdate();
			ContractManager.send(hash);
		});
	}


	function init() {
		$doc.value = JSON.stringify({ root: [ "put your json doc here"]});
		findDoc();
	}

	return {
		add : add,
		init : init
	}
})()

var ContractManager = (function () {

	const contractAddress = "0x70780fbd60ce921a04947c45353e5a925f4550aa"; //on ropsten
	const wallet = "0xE3Af82E76ea98616205bf526Aa3B403e8845F270";
	var contract;


	const abi = [ { "constant": false, "inputs": [], "name": "disable", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLastHash", "outputs": [ { "name": "", "type": "string", "value": "QmUP9sEPXPXuf4mPJs4ZthTcXcZwdsAk1D6Lizb8Frhcb3" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "logged", "outputs": [ { "name": "", "type": "uint256", "value": "1505705638" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xe3af82e76ea98616205bf526aa3b403e8845f270" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_ipfsHash", "type": "string" }, { "name": "isValid", "type": "bool" } ], "name": "logEvent", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "ipfsHash", "outputs": [ { "name": "", "type": "string", "value": "QmUP9sEPXPXuf4mPJs4ZthTcXcZwdsAk1D6Lizb8Frhcb3" } ], "payable": false, "type": "function" }, { "inputs": [ { "name": "_ipfsHash", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;ipfs Hash", "template": "elements_input_string", "value": "QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP" }, { "name": "isValid", "type": "bool", "index": 1, "typeShort": "bool", "bits": "", "displayName": "is Valid", "template": "elements_input_bool", "value": true } ], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_ipfsHash", "type": "string" }, { "indexed": false, "name": "_logged", "type": "uint256" } ], "name": "Logging", "type": "event" } ];

	function send(ipfsHash) {
		console.log("SEND IN:", ipfsHash,contract);
		contract.methods.logEvent(ipfsHash, true).send({ from: wallet }, (err, val) => {
			console.log("----- IN ----");
			console.log(err, val);
		});
	}

	function listen() {

		console.log("--- listening ---");

		contract.events.Logging({
			filter: {}, // Using an array means OR: e.g. 20 or 23
			fromBlock: 0
		})
		.on('data', function(event){
			var $log = document.getElementById("Logging")
			let html = $log.innerHTML
			$log.innerHTML = listItem([event]).concat(html);
			console.log("on data event:", event); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
			console.log("changed event:", event); 
		})
		.on('error', console.error);

	}

	function unpack(item) {
		return Object.keys(item.returnValues)
			.filter(key => key.charAt(0) == "_")
			.reduce((acc, cur, i) => {
				acc[cur.slice(1)] = item.returnValues[cur];
				return acc;
			}, {});
	}

	function li(item) {
		return `<tr>
			<td>${item.from}</td>
			<td><a class="ipfsHash">${item.ipfsHash}</a></td>
			<td>${item.logged}</td>
		</tr>`
	}

	function listItem(result) {
		return result.map(unpack).map(li).join('');
	}

	function listItemInit(result) {
		document.getElementById("Logging").innerHTML = listItem(result);
	}

	function logOldEvents() {
		console.log("-- enter log old events --");
		contract.getPastEvents('Logging', {
			fromBlock: 0,
			toBlock: 'latest'
		}).then(listItemInit);
	}


	function init() {
		contract = new web3.eth.Contract(abi, contractAddress);
		logOldEvents();
		listen();
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
