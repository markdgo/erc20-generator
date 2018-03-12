pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract ERC20Token is DetailedERC20, MintableToken, BurnableToken {

    function ERC20Token(string _name, string _symbol, uint8 _decimals)
    DetailedERC20 (_name, _symbol, _decimals)
    public
    {

    }
}
