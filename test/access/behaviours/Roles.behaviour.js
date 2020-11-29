const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

function shouldBehaveLikeRoles ([admin, other, thirdParty]) {
  context('testing MINTER role', function () {
    shouldBehaveLikeAccessControl([admin, other, thirdParty], 'MINTER');
  });

  function shouldBehaveLikeAccessControl ([admin, other, thirdParty], roleName) {
    const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const ROLE = web3.utils.soliditySha3(roleName);

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
        const receipt = await this.contract.grantRole(ROLE, other, { from: admin });
        expectEvent(receipt, 'RoleGranted', { account: other, role: ROLE, sender: admin });

        expect(await this.contract.hasRole(ROLE, other)).to.equal(true);
      });

      it('non-admin cannot grant role to other accounts', async function () {
        await expectRevert(
          this.contract.grantRole(ROLE, other, { from: thirdParty }),
          'AccessControl: sender must be an admin to grant',
        );
      });

      it('accounts can be granted a role multiple times', async function () {
        await this.contract.grantRole(ROLE, other, { from: admin });
        const receipt = await this.contract.grantRole(ROLE, other, { from: admin });
        expectEvent.notEmitted(receipt, 'RoleRevoked');
      });
    });

    describe('revoking', function () {
      it('roles that are not had can be revoked', async function () {
        expect(await this.contract.hasRole(ROLE, other)).to.equal(false);

        const receipt = await this.contract.revokeRole(ROLE, other, { from: admin });
        expectEvent.notEmitted(receipt, 'RoleRevoked');
      });

      context('with granted role', function () {
        beforeEach(async function () {
          await this.contract.grantRole(ROLE, other, { from: admin });
        });

        it('admin can revoke role', async function () {
          const receipt = await this.contract.revokeRole(ROLE, other, { from: admin });
          expectEvent(receipt, 'RoleRevoked', { account: other, role: ROLE, sender: admin });

          expect(await this.contract.hasRole(ROLE, other)).to.equal(false);
        });

        it('non-admin cannot revoke role', async function () {
          await expectRevert(
            this.contract.revokeRole(ROLE, other, { from: thirdParty }),
            'AccessControl: sender must be an admin to revoke',
          );
        });

        it('a role can be revoked multiple times', async function () {
          await this.contract.revokeRole(ROLE, other, { from: admin });

          const receipt = await this.contract.revokeRole(ROLE, other, { from: admin });
          expectEvent.notEmitted(receipt, 'RoleRevoked');
        });
      });
    });

    describe('renouncing', function () {
      it('roles that are not had can be renounced', async function () {
        const receipt = await this.contract.renounceRole(ROLE, other, { from: other });
        expectEvent.notEmitted(receipt, 'RoleRevoked');
      });

      context('with granted role', function () {
        beforeEach(async function () {
          await this.contract.grantRole(ROLE, other, { from: admin });
        });

        it('bearer can renounce role', async function () {
          const receipt = await this.contract.renounceRole(ROLE, other, { from: other });
          expectEvent(receipt, 'RoleRevoked', { account: other, role: ROLE, sender: other });

          expect(await this.contract.hasRole(ROLE, other)).to.equal(false);
        });

        it('only the sender can renounce their roles', async function () {
          await expectRevert(
            this.contract.renounceRole(ROLE, other, { from: admin }),
            'AccessControl: can only renounce roles for self',
          );
        });

        it('a role can be renounced multiple times', async function () {
          await this.contract.renounceRole(ROLE, other, { from: other });

          const receipt = await this.contract.renounceRole(ROLE, other, { from: other });
          expectEvent.notEmitted(receipt, 'RoleRevoked');
        });
      });
    });

    describe('enumerating', function () {
      it('role bearers can be enumerated', async function () {
        await this.contract.grantRole(ROLE, other, { from: admin });
        await this.contract.grantRole(ROLE, thirdParty, { from: admin });

        const memberCount = await this.contract.getRoleMemberCount(ROLE);
        memberCount.should.be.bignumber.equal('3'); // two added above plus admin

        const bearers = [];
        for (let i = 0; i < memberCount; ++i) {
          bearers.push(await this.contract.getRoleMember(ROLE, i));
        }

        expect(bearers).to.have.members([admin, other, thirdParty]);
      });
    });
  }
}

module.exports = {
  shouldBehaveLikeRoles,
};
