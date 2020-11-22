<template>
    <div class="features-table">
        <b-card-group deck class="mt-5">
            <b-card class="mb-3" sub-title="Detailed">
                <b-card-text>
                    Your Token will be fully compliant with the ERC20 definition and
                    compatible with any ERC20 wallet all around the world.
                    It will have a name, a symbol and a decimals amount.
                </b-card-text>
            </b-card>
            <b-card class="mb-3" sub-title="Capped">
                <b-card-text>
                    You won't be able to generate more tokens than the defined token cap.
                    This ensure people that you will not generate more tokens than declared.
                </b-card-text>
            </b-card>
            <b-card class="mb-3" sub-title="Mintable">
                <b-card-text>
                    You will be able to generate tokens by minting them.
                    Only token owner will be able to mint.
                    You can also disable minting if you don’t want to generate tokens anymore.
                </b-card-text>
            </b-card>
        </b-card-group>
        <b-card-group deck>
            <b-card class="mb-3" sub-title="Burnable">
                <b-card-text>
                    Your Token can be burnt.
                    It means that you can choose to reduce the circulating supply by destroying some of your
                    tokens.
                </b-card-text>
            </b-card>
            <b-card class="mb-3" sub-title="ERC1363 Payable Token">
                <b-card-text>
                    The ERC1363 is an ERC20 compatible Token that can make a
                    callback on the receiver contract to notify token transfers or token approvals.
                </b-card-text>
            </b-card>
            <b-card class="mb-3" sub-title="Token Recover">
                <b-card-text>
                    There are lots of tokens lost forever into Smart Contracts.
                    It allows the contract owner to recover any ERC20 token sent into the contract for error.
                </b-card-text>
            </b-card>
        </b-card-group>
        <b-row>
            <b-col lg="12">
                <b-alert class="mb-3" variant="warning" show>
                    <h4 class="alert-heading">Copyright</h4>
                    <p>
                        Deploying SimpleERC20 for FREE, a link pointing to this page will be added to your contract.
                        Your Token will be fully compliant with the ERC20 Standard and you can use it without issues.
                        It is only a little credit to advertise ERC20 Token Generator.
                        You can remove it by choosing an advanced Token type.
                    </p>
                </b-alert>
            </b-col>
            <b-col lg="6" offset-lg="3" class="mt-4">
                <p class="text-center text-light">
                    Learn more in
                    <a href="#faq"
                       class="text-reset"
                       v-smooth-scroll="{ duration: 1000, offset: 0, updateHistory: false }">
                        Frequently Asked Questions
                    </a>
                </p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  export default {
    name: 'Features',
  };
</script>
