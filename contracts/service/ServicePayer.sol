// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "./ServiceReceiver.sol";

/**
 * @title ServicePayer
 * @author ERC20 Generator (https://vittominacori.github.io/erc20-generator)
 * @dev Implementation of the ServicePayer
 */
contract ServicePayer {

    constructor (address payable receiver, string memory serviceName) payable {
        ServiceReceiver(receiver).pay{value: msg.value}(serviceName);
    }
}
