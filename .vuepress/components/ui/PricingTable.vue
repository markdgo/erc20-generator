<template>
    <div class="pricing-table">
        <b-row>
            <b-col sm="6" md="4" v-for="(t, index) in tokenDetails">
                <b-card no-body class="mb-3">
                    <b-card-title class="pt-5 font-weight-light text-center">
                        {{ t.name }}
                    </b-card-title>
                    <p class="card-price text-center">
                        {{ t.price }} <small class="term">ETH</small>
                    </p>

                    <b-list-group flush>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            ERC20 Compliant <ui--checkmark :value="t.standard"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Verified Source Code <ui--checkmark :value="t.verified"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Detailed <ui--checkmark :value="t.detailed"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Customizable Decimals <ui--checkmark :value="t.customizeDecimals"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Remove Copyright <ui--checkmark :value="t.removeCopyright"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Supply Type <b-badge variant="info">{{ t.supplyType}}</b-badge>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Burnable <ui--checkmark :value="t.burnable"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Mintable <ui--checkmark :value="t.mintable"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            ERC1363 <ui--checkmark :value="t.erc1363"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Token Recover <ui--checkmark :value="t.tokenRecover"></ui--checkmark>
                        </b-list-group-item>

                        <b-list-group-item variant="warning"
                                :to="{ path: '/create-token/', query: { tokenType: t.name }}"
                                class="justify-content-between align-items-center text-center py-3">
                            Create
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="6" offset-lg="3" class="mt-4">
                <p class="text-center text-light">
                    * GAS fee will be added to final amount
                </p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import tokenDetails from '../../mixins/tokenDetails';

  export default {
    name: 'PricingTable',
    mixins: [
      tokenDetails,
    ],
  };
</script>
