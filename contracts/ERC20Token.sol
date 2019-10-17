pragma solidity ^0.5.12;

import "ico-maker/contracts/token/ERC1363/BaseERC1363Token.sol";

/**
 * @title ERC20Token
 * @author Vittorio Minacori (https://github.com/vittominacori)
 * @dev Implementation of a BaseERC1363Token
 */
contract ERC20Token is BaseERC1363Token {

    string public builtOn = "https://vittominacori.github.io/erc20-generator";

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 cap,
        uint256 initialSupply,
        bool transferEnabled
    )
        public
        BaseERC1363Token(name, symbol, decimals, cap, initialSupply)
    {
        if (transferEnabled) {
            enableTransfer();
        }
    }
}
