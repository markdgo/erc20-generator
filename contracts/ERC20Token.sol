pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract ERC20Token is DetailedERC20, MintableToken, BurnableToken {

    string public builtOn = "https://vittominacori.github.io/erc20-generator";

    function ERC20Token(
        string _name,
        string _symbol,
        uint8 _decimals,
        uint256 _initialAmount
    )
    DetailedERC20 (_name, _symbol, _decimals)
    public
    {
        if (_initialAmount > 0) {
            mint(owner, _initialAmount * (10 ** uint256(decimals)));
        }
    }
}
