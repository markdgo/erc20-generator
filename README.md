# ERC20 Token Generator


Simply deploy Smart Contract for a Standard, Mintable, Burnable ERC20 Token.


Token also has a Role Based Access Control so you can add the "minter" permission to users or Smart Contracts. 


DApp here [https://vittominacori.github.io/erc20-generator](https://vittominacori.github.io/erc20-generator)


Code created using [Open Zeppelin (openzeppelin-solidity)](https://github.com/OpenZeppelin/openzeppelin-solidity) and [Truffle Framework](https://github.com/trufflesuite/truffle).

 
 
## Installation


Install truffle, compiler and linter.

```bash
npm install -g truffle      // Version 4.1.8+ required.
npm install -g solium       // Version 1.1.7+ required.
```



## Install dependencies


```bash
npm install
```



## Linter


Use Solium

```bash
solium -d contracts
```



## Compile, migrate and test the contracts.
 

Open the Truffle console

```bash
truffle develop
```

Compile 

```bash
compile 
```

Migrate

```bash
migrate
```

Test

```bash
test
```



## Security Tool


Install [Mythril](https://github.com/ConsenSys/mythril)

```bash
pip3 install mythril
```


Usage 

```bash
truffle compile
myth --truffle
```



## Optional


Install the [truffle-flattener](https://github.com/alcuadrado/truffle-flattener)

```bash
npm install -g truffle-flattener
```
 
 
Usage 

```bash
truffle-flattener contracts/ERC20Token.sol >> dist/ERC20Token.sol
```
 
 
 
## Links

Solidity [Doc](https://solidity.readthedocs.io) [Github](https://solidity.readthedocs.io)

OpenZeppelin [Doc](http://zeppelin-solidity.readthedocs.io) [Github](https://github.com/OpenZeppelin)

Truffle [Doc](http://truffleframework.com/docs) [Github](https://github.com/trufflesuite/truffle)

Web3.js [Doc 0.20.4](https://github.com/ethereum/wiki/wiki/JavaScript-API) [Doc 1.0](http://web3js.readthedocs.io/en/1.0) [Github](https://github.com/ethereum/web3.js)
