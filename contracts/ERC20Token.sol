pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/rbac/RBACWithAdmin.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";


contract ERC20Token is DetailedERC20, MintableToken, BurnableToken, RBACWithAdmin {

    string public builtOn = "https://vittominacori.github.io/erc20-generator";

    string public constant ROLE_MINTER = "minter";

    modifier onlyMinter () {
        require(hasRole(msg.sender, ROLE_ADMIN) || hasRole(msg.sender, ROLE_MINTER));
        _;
    }

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
            mint(owner, _initialAmount * (10 ** uint256(decimals)));
        }
    }

    function mint(address _to, uint256 _amount) onlyMinter canMint public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    function transferAnyERC20Token(address _tokenAddress, uint256 _tokens) onlyOwner public returns (bool success) {
        return ERC20Basic(_tokenAddress).transfer(owner, _tokens);
    }
}
