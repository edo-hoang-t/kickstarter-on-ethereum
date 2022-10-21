const Web3 = require("web3");

let web3;

if (typeof window !== "undefined" && window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/70c73ff09f424c28a7609f96b44c1339"
  );
  web3 = new Web3(provider);
}

export default web3;
