pragma solidity ^0.5.10;

import "ico-maker/contracts/token/ERC20/BaseERC20Token.sol";

/**
 * @title ERC20Token
 * @author Vittorio Minacori (https://github.com/vittominacori)
 * @dev Implementation of a BaseERC20Token
 */
contract ERC20Token is BaseERC20Token {

    string public builtOn = "https://vittominacori.github.io/erc20-generator";

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 cap,
        uint256 initialSupply
    )
        public
        BaseERC20Token(name, symbol, decimals, cap, initialSupply)
    {} // solhint-disable-line no-empty-blocks
}
