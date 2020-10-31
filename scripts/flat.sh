#!/usr/bin/env bash

for contract in "SimpleERC20" "StandardERC20" "CommonERC20" "PowerfulERC20"
do
  npx truffle-flattener contracts/token/ERC20/$contract.sol > dist/$contract.dist.sol
done

npx truffle-flattener contracts/service/ServiceReceiver.sol > dist/ServiceReceiver.dist.sol
