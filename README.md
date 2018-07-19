# ERC20 Token Generator

[![Build Status](https://travis-ci.org/vittominacori/erc20-generator.svg?branch=master)](https://travis-ci.org/vittominacori/erc20-generator) 
[![Coverage Status](https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master)](https://coveralls.io/github/vittominacori/erc20-generator?branch=master)

A simple Smart Contract for a Standard, Mintable, Burnable, ERC20 Token with Minter Role.

Token has a Role Based Access Control so you can add the "minter" permission to users or Smart Contracts. 


DApp here [https://vittominacori.github.io/erc20-generator](https://vittominacori.github.io/erc20-generator)

DApp source here [https://github.com/vittominacori/erc20-generator/tree/gh-pages](https://github.com/vittominacori/erc20-generator/tree/gh-pages)

Code created using [Open Zeppelin (openzeppelin-solidity)](https://github.com/OpenZeppelin/openzeppelin-solidity) and [Truffle Framework](https://github.com/trufflesuite/truffle).

 
 
## Installation


Install truffle, compiler and linter.

```bash
npm install -g truffle      // Version 4.1.13+ required.
npm install -g solium       // Version 1.1.8+ required.
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
 


## Token verification on Etherscan


Use the dist smart contracts [dist/ERC20Token.sol](https://github.com/vittominacori/erc20-generator/blob/master/dist/ERC20Token.sol)

Solc version is 0.4.24

 
 
## Links

Solidity [Doc](https://solidity.readthedocs.io) [Github](https://solidity.readthedocs.io)

OpenZeppelin [Doc](http://zeppelin-solidity.readthedocs.io) [Github](https://github.com/OpenZeppelin)

Truffle [Doc](http://truffleframework.com/docs) [Github](https://github.com/trufflesuite/truffle)

Web3.js [Doc 0.20.4](https://github.com/ethereum/wiki/wiki/JavaScript-API) [Doc 1.0](http://web3js.readthedocs.io/en/1.0) [Github](https://github.com/ethereum/web3.js)
