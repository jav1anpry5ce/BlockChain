const { Blockchain, Transaction } = require("./blockChain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const key = ec.keyFromPrivate(
  "653fab671deacab222b750b2076dc549cb3a2bcfc0af76611dee39515e079afd"
);
const wallet = key.getPublic("hex");

let coin = new Blockchain();

const tx1 = new Transaction(wallet, "key", 15);
tx1.signTransaction(key);
coin.addTransaction(tx1);

console.log("Starting the miner...");
coin.minePendingTransactions(wallet);

console.log("\nBlance of wallet: " + coin.getBalance(wallet));

console.log("Is chain valid: ", coin.validateChain());
