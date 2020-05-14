pragma solidity ^0.6.0;

import "./token/ERC20Base.sol";

/**
 * @title BaseToken
 * @author Vittorio Minacori (https://github.com/vittominacori)
 * @dev Implementation of the BaseToken
 */
contract BaseToken is ERC20Base {

  string public constant BUILT_ON = "https://vittominacori.github.io/erc20-generator";

  constructor (
    string memory name,
    string memory symbol,
    uint8 decimals,
    uint256 cap,
    uint256 initialSupply,
    bool transferEnabled,
    bool mintingFinished
  ) public payable ERC20Base(name, symbol, decimals, cap, initialSupply, transferEnabled, mintingFinished) {}
}
