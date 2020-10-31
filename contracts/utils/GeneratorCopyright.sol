// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

/**
 * @title GeneratorCopyright
 * @author ERC20 Generator (https://vittominacori.github.io/erc20-generator)
 * @dev Implementation of the GeneratorCopyright
 */
contract GeneratorCopyright {

    string private constant _GENERATOR = "https://vittominacori.github.io/erc20-generator";
    string private constant _VERSION = "v4.0.0";

    /**
     * @dev Returns the token generator tool.
     */
    function generator() public pure returns (string memory) {
        return _GENERATOR;
    }

    /**
     * @dev Returns the token generator version.
     */
    function version() public pure returns (string memory) {
        return _VERSION;
    }
}
