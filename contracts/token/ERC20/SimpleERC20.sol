// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "../../service/ServicePayer.sol";
import "../../utils/GeneratorCopyright.sol";

/**
 * @title SimpleERC20
 * @author ERC20 Generator (https://vittominacori.github.io/erc20-generator)
 * @dev Implementation of the SimpleERC20
 */
contract SimpleERC20 is ERC20, ServicePayer, GeneratorCopyright {

    constructor (
        string memory name,
        string memory symbol,
        uint256 initialBalance,
        address payable feeReceiver
    ) ERC20(name, symbol) ServicePayer(feeReceiver, "SimpleERC20") payable {
        require(initialBalance > 0, "SimpleERC20: supply cannot be zero");

        _mint(_msgSender(), initialBalance);
    }
}
