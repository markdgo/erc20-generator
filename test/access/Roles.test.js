const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const RolesMock = artifacts.require('RolesMock');

contract('Roles', function ([_, owner, ...otherAccounts]) {
  beforeEach(async function () {
    this.contract = await RolesMock.new({ from: owner });
  });

  context('testing MINTER role', function () {
    shouldBehaveLikeAccessControl(owner, otherAccounts, 'MINTER');
  });

  context('testing OPERATOR role', function () {
    shouldBehaveLikeAccessControl(owner, otherAccounts, 'OPERATOR');
  });

  function shouldBehaveLikeAccessControl (admin, [authorized, otherAuthorized, other, otherAdmin], roleName) {
    const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const ROLE = web3.utils.soliditySha3(roleName);
    const OTHER_ROLE = web3.utils.soliditySha3('OTHER_ROLE');

    describe('default admin', function () {
      it('deployer has default admin role', async function () {
        expect(await this.contract.hasRole(DEFAULT_ADMIN_ROLE, admin)).to.equal(true);
      });

      it('other roles\'s admin is the default admin role', async function () {
        expect(await this.contract.getRoleAdmin(ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
      });

      it('default admin role\'s admin is itself', async function () {
        expect(await this.contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
      });
    });

    describe('granting', function () {
      it('admin can grant role to other accounts', async function () {
        const receipt = await this.contract.grantRole(ROLE, authorized, { from: admin });
        expectEvent(receipt, 'RoleGranted', { account: authorized, role: ROLE, sender: admin });

        expect(await this.contract.hasRole(ROLE, authorized)).to.equal(true);
      });

      it('non-admin cannot grant role to other accounts', async function () {
        await expectRevert(
          this.contract.grantRole(ROLE, authorized, { from: other }),
          'AccessControl: sender must be an admin to grant',
        );
      });

      it('accounts can be granted a role multiple times', async function () {
        await this.contract.grantRole(ROLE, authorized, { from: admin });
        const receipt = await this.contract.grantRole(ROLE, authorized, { from: admin });
        await expectEvent.not.inTransaction(receipt.tx, RolesMock, 'RoleGranted');
      });
    });

    describe('revoking', function () {
      it('roles that are not had can be revoked', async function () {
        expect(await this.contract.hasRole(ROLE, authorized)).to.equal(false);

        const receipt = await this.contract.revokeRole(ROLE, authorized, { from: admin });
        await expectEvent.not.inTransaction(receipt.tx, RolesMock, 'RoleRevoked');
      });

      context('with granted role', function () {
        beforeEach(async function () {
          await this.contract.grantRole(ROLE, authorized, { from: admin });
        });

        it('admin can revoke role', async function () {
          const receipt = await this.contract.revokeRole(ROLE, authorized, { from: admin });
          expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: admin });

          expect(await this.contract.hasRole(ROLE, authorized)).to.equal(false);
        });

        it('non-admin cannot revoke role', async function () {
          await expectRevert(
            this.contract.revokeRole(ROLE, authorized, { from: other }),
            'AccessControl: sender must be an admin to revoke',
          );
        });

        it('a role can be revoked multiple times', async function () {
          await this.contract.revokeRole(ROLE, authorized, { from: admin });

          const receipt = await this.contract.revokeRole(ROLE, authorized, { from: admin });
          await expectEvent.not.inTransaction(receipt.tx, RolesMock, 'RoleRevoked');
        });
      });
    });

    describe('renouncing', function () {
      it('roles that are not had can be renounced', async function () {
        const receipt = await this.contract.renounceRole(ROLE, authorized, { from: authorized });
        await expectEvent.not.inTransaction(receipt.tx, RolesMock, 'RoleRevoked');
      });

      context('with granted role', function () {
        beforeEach(async function () {
          await this.contract.grantRole(ROLE, authorized, { from: admin });
        });

        it('bearer can renounce role', async function () {
          const receipt = await this.contract.renounceRole(ROLE, authorized, { from: authorized });
          expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: authorized });

          expect(await this.contract.hasRole(ROLE, authorized)).to.equal(false);
        });

        it('only the sender can renounce their roles', async function () {
          await expectRevert(
            this.contract.renounceRole(ROLE, authorized, { from: admin }),
            'AccessControl: can only renounce roles for self',
          );
        });

        it('a role can be renounced multiple times', async function () {
          await this.contract.renounceRole(ROLE, authorized, { from: authorized });

          const receipt = await this.contract.renounceRole(ROLE, authorized, { from: authorized });
          await expectEvent.not.inTransaction(receipt.tx, RolesMock, 'RoleRevoked');
        });
      });
    });

    describe('enumerating', function () {
      it('role bearers can be enumerated', async function () {
        await this.contract.grantRole(ROLE, authorized, { from: admin });
        await this.contract.grantRole(ROLE, otherAuthorized, { from: admin });

        const memberCount = await this.contract.getRoleMemberCount(ROLE);
        memberCount.should.be.bignumber.equal('3'); // two added above plus admin

        const bearers = [];
        for (let i = 0; i < memberCount; ++i) {
          bearers.push(await this.contract.getRoleMember(ROLE, i));
        }

        expect(bearers).to.have.members([admin, authorized, otherAuthorized]);
      });
    });

    describe('setting role admin', function () {
      beforeEach(async function () {
        await this.contract.setRoleAdmin(ROLE, OTHER_ROLE);
        await this.contract.grantRole(OTHER_ROLE, otherAdmin, { from: admin });
      });

      it('a role\'s admin role can be changed', async function () {
        expect(await this.contract.getRoleAdmin(ROLE)).to.equal(OTHER_ROLE);
      });

      it('the new admin can grant roles', async function () {
        const receipt = await this.contract.grantRole(ROLE, authorized, { from: otherAdmin });
        expectEvent(receipt, 'RoleGranted', { account: authorized, role: ROLE, sender: otherAdmin });
      });

      it('the new admin can revoke roles', async function () {
        await this.contract.grantRole(ROLE, authorized, { from: otherAdmin });
        const receipt = await this.contract.revokeRole(ROLE, authorized, { from: otherAdmin });
        expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: otherAdmin });
      });

      it('a role\'s previous admins no longer grant roles', async function () {
        await expectRevert(
          this.contract.grantRole(ROLE, authorized, { from: admin }),
          'AccessControl: sender must be an admin to grant',
        );
      });

      it('a role\'s previous admins no longer revoke roles', async function () {
        await expectRevert(
          this.contract.revokeRole(ROLE, authorized, { from: admin }),
          'AccessControl: sender must be an admin to revoke',
        );
      });
    });

    describe('testing modifier', function () {
      beforeEach(async function () {
        await this.contract.grantRole(ROLE, authorized, { from: admin });
      });

      context('from authorized account', function () {
        const from = authorized;

        it('allows access', async function () {
          await this.contract[`only${roleName}Mock`]({ from });
        });
      });

      context('from unauthorized account', function () {
        const from = other;

        it('reverts', async function () {
          await expectRevert(
            this.contract[`only${roleName}Mock`]({ from }),
            `Roles: caller does not have the ${roleName} role`,
          );
        });
      });
    });
  }
});
