pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";
import "openzeppelin-solidity/contracts/token/ERC20/RBACMintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";


contract ERC20Token is DetailedERC20, ERC827Token, RBACMintableToken, BurnableToken {

  string public builtOn = "https://vittominacori.github.io/erc20-generator";

  constructor(
    string _name,
    string _symbol,
    uint8 _decimals,
    uint256 _initialAmount
  )
  DetailedERC20 (_name, _symbol, _decimals)
  public
  {
    if (_initialAmount > 0) {
      balances[owner] = _initialAmount * (10 ** uint256(decimals));
      totalSupply_ = balances[owner];
    }

    addMinter(owner);
  }

  function transferAnyERC20Token(address _tokenAddress, uint256 _tokens) onlyOwner public returns (bool success) {
    return ERC20Basic(_tokenAddress).transfer(owner, _tokens);
  }
}
