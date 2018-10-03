pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract TokenRecover is Ownable {

  /**
   * @dev It's a safe function allowing to recover any ERC20 sent into the contract for error.
   *  Remember that only owner can call so be careful when use on contracts generated from other contracts.
   * @param _tokenAddress address The token contract address
   * @param _tokens Number of tokens to be sent
   * @return bool
   */
  function transferAnyERC20Token(
    address _tokenAddress,
    uint256 _tokens
  )
  public
  onlyOwner
  returns (bool success)
  {
    return ERC20Basic(_tokenAddress).transfer(owner, _tokens);
  }
}
