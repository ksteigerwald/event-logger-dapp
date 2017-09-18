import css from './stylesheet.css'
import Web3 from 'web3'
import ipfs from 'browser-ipfs'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

ipfs.localProvider = {host: '127.0.0.1', port: '5001', protocol: 'http', root: '/api/v0'};

ipfs.setProvider(ipfs.localProvider)

console.log("Hello from app.js")

ipfs.cat("QmaamdrH6k4KCU4iENDmbZ7WaX93vGwhu8snUeVF2xTMuP", function(err, text) {
	if (err) throw err;
	console.log("text:", text); 	// "Testing..."
});