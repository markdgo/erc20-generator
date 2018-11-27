# ERC20 Token Generator

[![Build Status](https://travis-ci.org/vittominacori/erc20-generator.svg?branch=master)](https://travis-ci.org/vittominacori/erc20-generator) 
[![Coverage Status](https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master)](https://coveralls.io/github/vittominacori/erc20-generator?branch=master)

A simple Smart Contract for a Standard, Mintable, Burnable, Payable ERC20 Token.

Token has a Role Based Access Control so you can add the "minter" permission to users or Smart Contracts. 

Token also has [ERC1363](https://github.com/ethereum/EIPs/issues/1363) Behaviours to work like a Payable Token.


DApp here [https://vittominacori.github.io/erc20-generator](https://vittominacori.github.io/erc20-generator)

DApp source here [https://github.com/vittominacori/erc20-generator/tree/dapp](https://github.com/vittominacori/erc20-generator/tree/dapp)

## Installation

Install truffle.

```bash
npm install -g truffle      // Version 4.1.14+ required.
```

## Install dependencies

```bash
npm install
```

## Linter

Use Solium

```bash
npm run lint:sol
```

Use ESLint

```bash
npm run lint:js
```

#### Note

IMPORTANT: Before commit run the lint and fix command:

```bash
npm run lint:fix
```

## Compile and test the contracts.
 
Open the Truffle console

```bash
truffle develop
```

Compile 

```bash
compile 
```

Test

```bash
test
```

## Optional

Install the [truffle-flattener](https://github.com/alcuadrado/truffle-flattener)

```bash
npm install -g truffle-flattener
```

Usage

```bash
truffle-flattener contracts/BaseToken.sol > dist/BaseToken.dist.sol
```

## Token verification on Etherscan

Use the dist smart contracts [dist/BaseToken.dist.sol](https://github.com/vittominacori/erc20-generator/blob/master/dist/BaseToken.dist.sol)

Solc version is 0.4.24


## License

Code released under the [MIT License](https://github.com/vittominacori/erc20-generator/blob/master/LICENSE).
