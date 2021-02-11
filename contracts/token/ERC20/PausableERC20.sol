// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

import "../../service/ServicePayer.sol";

/**
 * @title PausableERC20
 * @dev Implementation of the PausableERC20
 */
contract PausableERC20 is ERC20Pausable, Ownable, ServicePayer {

    constructor (
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialBalance,
        address payable feeReceiver
    )
      ERC20(name, symbol)
      ServicePayer(feeReceiver, "PausableERC20")
      payable
    {
        require(initialBalance > 0, "PausableERC20: supply cannot be zero");

        _setupDecimals(decimals);
        _mint(_msgSender(), initialBalance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
