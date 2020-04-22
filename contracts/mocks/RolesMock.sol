pragma solidity ^0.6.0;

import "../access/Roles.sol";

contract RolesMock is Roles {

    function setRoleAdmin(bytes32 roleId, bytes32 adminRoleId) public {
        _setRoleAdmin(roleId, adminRoleId);
    }

    function onlyMINTERMock() public view onlyMinter {} // solhint-disable-line no-empty-blocks

    function onlyOPERATORMock() public view onlyOperator {} // solhint-disable-line no-empty-blocks
}
