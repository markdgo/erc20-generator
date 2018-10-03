pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/RBACMintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "erc-payable-token/contracts/token/ERC1363/ERC1363BasicToken.sol";

import "./safe/TokenRecover.sol";


// solium-disable-next-line max-len
contract BaseToken is DetailedERC20, RBACMintableToken, BurnableToken, ERC1363BasicToken, TokenRecover {

  string public builtOn = "https://vittominacori.github.io/erc20-generator";

  constructor(
    string _name,
    string _symbol,
    uint8 _decimals
  )
    DetailedERC20 (_name, _symbol, _decimals)
    public
  {
    addMinter(owner);
  }
}
