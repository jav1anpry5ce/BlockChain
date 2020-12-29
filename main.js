const { Blockchain, Transaction } = require("./blockChain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const javankey = ec.keyFromPrivate(
  "653fab671deacab222b750b2076dc549cb3a2bcfc0af76611dee39515e079afd"
);
const javanwallet = javankey.getPublic("hex");

const amitkey = ec.keyFromPrivate(
  "4d9428bfe0e82864cdc167330d7b3202059f2d1b98fe7e3680892949b38facf2"
);
const amitwallet = amitkey.getPublic("hex");

let coin = new Blockchain();

function sendJCoin(fromAddress, toAddress, amount, privateKey) {
  if (coin.getBalance(fromAddress) - amount < 0) {
    throw new Error("Not enough JCoin for this transaction!");
  } else {
    const transaction = new Transaction(fromAddress, toAddress, amount);
    transaction.signTransaction(privateKey);
    coin.addTransaction(transaction);
    console.log("\nTransaction added to be mined!");
  }
}

// const tx1 = new Transaction(javanwallet, amitwallet, 15);
// tx1.signTransaction(javankey);
// coin.addTransaction(tx1);

console.log("Starting the miner...");
coin.minePendingTransactions(amitwallet);

console.log("\nBlance of Javan wallet:", coin.getBalance(javanwallet));
console.log("\nBalance of Amit wallet:", coin.getBalance(amitwallet));

sendJCoin(amitwallet, javanwallet, 101, amitkey);

console.log("\nStarting the miner...");
coin.minePendingTransactions("sdgdf");

console.log("\nBlance of Javan wallet:", coin.getBalance(javanwallet));
console.log("\nBalance of Amit wallet:", coin.getBalance(amitwallet));

console.log("Is chain valid:", coin.validateChain());
