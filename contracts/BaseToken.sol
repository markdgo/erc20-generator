pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "erc-payable-token/contracts/token/ERC1363/ERC1363.sol";
import "eth-token-recover/contracts/TokenRecover.sol";

/**
 * @title BaseToken
 * @author Vittorio Minacori (https://github.com/vittominacori)
 * @dev Implementation of a BaseToken
 */
contract BaseToken is ERC20Detailed, ERC20Capped, ERC20Burnable, ERC1363, TokenRecover { // solium-disable-line max-len

  string public builtOn = "https://vittominacori.github.io/erc20-generator";

  constructor(
    string name,
    string symbol,
    uint8 decimals,
    uint256 cap,
    uint256 initialBalance
  )
    ERC20Detailed(name, symbol, decimals)
    ERC20Capped(cap)
    public
  {
    _mint(owner(), initialBalance);
  }
}
