# ERC20 Token Generator

[![Build Status](https://travis-ci.com/vittominacori/erc20-generator.svg?branch=master)](https://travis-ci.com/vittominacori/erc20-generator)
[![Coverage Status](https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master)](https://coveralls.io/github/vittominacori/erc20-generator?branch=master)
[![MIT licensed](https://img.shields.io/github/license/vittominacori/erc20-generator.svg)](https://github.com/vittominacori/erc20-generator/blob/master/LICENSE)

The most used Smart Contract Generator for ERC20 Token.

## Try it

[https://vittominacori.github.io/erc20-generator](https://vittominacori.github.io/erc20-generator)


## Development


### Install dependencies

```bash
npm install
```


### Usage (using Truffle)

Open the Truffle console

```bash
npm run console
```


#### Compile

```bash
npm run compile
```


#### Test

```bash
npm run test
```


### Usage (using Buidler)

Open the Buidler console

```bash
npm run buidler:console
```


#### Compile

```bash
npm run buidler:compile
```


#### Test

```bash
npm run buidler:test
```


### Code Coverage

```bash
npm run coverage
```


## Linter

Use Solhint

```bash
npm run lint:sol
```

Use ESLint

```bash
npm run lint:js
```

Use ESLint and fix

```bash
npm run lint:fix
```


## Flattener

This allow to flatten the code into a single file

Edit `scripts/flat.sh` to add your contracts

```bash
npm run flat
```


## Analysis

Note: it is better to analyze the flattened code to have a bigger overview on the entire codebase. So run the flattener first.

### Describe

The `describe` command shows a summary of the contracts and methods in the files provided

```bash
npx surya describe dist/StandardERC20.dist.sol
```

### Dependencies

The `dependencies` command outputs the c3-linearization of a given contract's inheirtance graph. Contracts will be listed starting with most-derived, ie. if the same function is defined in more than one contract, the solidity compiler will use the definition in whichever contract is listed first.

```bash
npx surya dependencies StandardERC20 dist/StandardERC20.dist.sol
```
### Generate Report

Edit `scripts/analyze.sh` to add your contracts

```bash
npm run analyze
```

The `inheritance` command outputs a DOT-formatted graph of the inheritance tree.

The `graph` command outputs a DOT-formatted graph of the control flow.

The `mdreport` command creates a markdown description report with tables comprising information about the system's files, contracts and their functions.

The `sol2uml` generates UML class diagram from Solidity contracts.


## License

Code released under the [MIT License](https://github.com/vittominacori/erc20-generator/blob/master/LICENSE).
