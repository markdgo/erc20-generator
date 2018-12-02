pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "erc-payable-token/contracts/token/ERC1363/ERC1363.sol";
import "eth-token-recover/contracts/TokenRecover.sol";

/**
 * @title BaseToken
 * @author Vittorio Minacori (https://github.com/vittominacori)
 * @dev Implementation of a BaseToken
 */
contract BaseToken is ERC20Detailed, ERC20Mintable, ERC20Burnable, ERC1363, TokenRecover { // solium-disable-line max-len

  string public builtOn = "https://vittominacori.github.io/erc20-generator";

  constructor(
    string name,
    string symbol,
    uint8 decimals,
    uint256 initialBalance
  )
    ERC20Detailed(name, symbol, decimals)
    public
  {
    _mint(owner(), initialBalance);
  }
}
