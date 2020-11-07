<template>
    <b-container fluid>
        <b-row id="token-docs">
            <b-col lg="10" offset-lg="1" class="my-4 p-0">
                <div v-if="loading" class="text-center p-5">
                    <ui--loader :loading="true"></ui--loader>
                </div>
                <b-card v-if="!loading" bg-variant="transparent" border-variant="0">
                    <b-row>
                        <b-col lg="12">
                            <b-card bg-variant="light"
                                    header="Token Type"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <b-row>
                                    <b-col lg="12">
                                        <b-form-group
                                                description="Choose your Token."
                                                label="Token Type *"
                                                label-for="tokenType">
                                            <b-form-select id="tokenType"
                                                           v-model="tokenType"
                                                           size="lg"
                                                           @input="loadToken">
                                                <option v-for="(n, k) in tokenList" :value="k">{{ n.contractName }}
                                                </option>
                                            </b-form-select>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="4">
                            <b-card no-body
                                    bg-variant="light"
                                    header="Token Features"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <b-list-group flush>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        ERC20 Compliant <ui--checkmark :value="token.standard"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Detailed <ui--checkmark :value="token.detailed"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Customizable Decimals
                                        <ui--checkmark :value="token.customizeDecimals"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Supply Type <b-badge variant="info">{{ token.supplyType}}</b-badge>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Mintable <ui--checkmark :value="token.mintable"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Burnable <ui--checkmark :value="token.burnable"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        ERC1363 <ui--checkmark :value="token.erc1363"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Token Recover <ui--checkmark :value="token.tokenRecover"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        Remove Copyright <ui--checkmark :value="token.removeCopyright"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item
                                            variant="warning"
                                            :to="{ path: '/create-token/', query: { tokenType: token.name }}"
                                            class="justify-content-between align-items-center text-center py-3">
                                        Create
                                    </b-list-group-item>
                                </b-list-group>
                            </b-card>
                        </b-col>
                        <b-col lg="8">
                            <b-card bg-variant="light"
                                    header="Token Details"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <p>
                                    <b-link :href="`https://github.com/vittominacori/erc20-generator/tree/v${token.version}`" target="_blank">
                                        <b-img :src="`https://img.shields.io/badge/version-${token.version}-blue`"></b-img>
                                    </b-link>
                                    <b-link href="https://travis-ci.com/github/vittominacori/erc20-generator" target="_blank">
                                        <b-img src="https://travis-ci.com/vittominacori/erc20-generator.svg?branch=master"></b-img>
                                    </b-link>
                                    <b-link href="https://coveralls.io/github/vittominacori/erc20-generator?branch=master" target="_blank">
                                        <b-img src="https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master"></b-img>
                                    </b-link>
                                    <b-link href="https://github.com/vittominacori/erc20-generator/blob/master/LICENSE" target="_blank">
                                        <b-img src="https://img.shields.io/github/license/vittominacori/erc20-generator.svg"></b-img>
                                    </b-link>
                                </p>
                                <ul>
                                    <li>
                                        Source Code:
                                        <b-link :href="sourceCode"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.dist.sol</b>
                                        </b-link>
                                    </li>
                                    <li>Contract Name: <b>{{ contracts.token.contractName }}</b></li>
                                    <li>Compiler: <b>{{ contracts.token.compiler.version }}</b></li>
                                    <li>Optimization: <b>Yes</b></li>
                                    <li>Runs (Optimizer): <b>200</b></li>
                                    <li>Constructor Arguments: <b>your ABI-encoded arguments</b></li>
                                    <li>
                                        Control Flow:
                                        <b-link :href="controlFlow"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.png</b>
                                        </b-link>
                                    </li>
                                    <li>
                                        Inheritance Tree:
                                        <b-link :href="inheritanceTree"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.png</b>
                                        </b-link>
                                    </li>

                                    <li>
                                        UML:
                                        <b-link :href="uml"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.svg</b>
                                        </b-link>
                                    </li>
                                </ul>
                                <div class="form-group">
                                    <label><b>ABI</b></label>
                                    <textarea class="form-control"
                                              readonly="readonly" rows="5"
                                              v-model="contracts.token.stringifiedAbi"></textarea>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-card bg-variant="light"
                            header="Methods"
                            header-bg-variant="dark"
                            header-text-variant="white"
                            class="mt-3">
                        <b-card v-for="(method, key) in contracts.token.abi"
                                :key="key"
                                v-if="method.name"
                                no-body
                                bg-variant="light"
                                class="mt-4">
                            <b-card-header>
                                <a v-b-toggle
                                   :href="`#method-${key}`"
                                   @click.prevent
                                   class="stretched-link text-reset text-decoration-none">
                                    {{ method.name }}
                                </a>
                            </b-card-header>
                            <b-collapse :id="`method-${key}`" class="p-4">
                                <b-card-sub-title>
                                    Type: {{ method.type }}
                                </b-card-sub-title>
                                <b-card-text v-if="method.stateMutability">
                                    State Mutability: {{ method.stateMutability }}
                                </b-card-text>
                                <b-card-text v-if="method.inputs && method.inputs.length > 0">
                                    <p>Inputs:</p>
                                    <ul>
                                        <li v-for="(param, key) in method.inputs" :key="key">
                                            <b>{{ param.type }}</b> {{ param.name }}
                                        </li>
                                    </ul>
                                </b-card-text>
                                <b-card-text v-if="method.outputs && method.outputs.length > 0">
                                    <p>Outputs:</p>
                                    <ul>
                                        <li v-for="(param, key) in method.outputs" :key="key">
                                            <b>{{ param.type }}</b> {{ param.name }}
                                        </li>
                                    </ul>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                    </b-card>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="bg-light text-dark mx-0">
            <b-col lg="10" offset-lg="1" class="mb-3 text-center">
                <h2 class="pt-5 mb-4 font-weight-lighter text-dark">Ready to deploy your Token?</h2>
                <p class="font-weight-light">
                    Try building your Token in less than a minute. You can try on Test Network before to go live.
                </p>
                <b-button to="/create-token/" size="lg" variant="success" class="my-5 py-3 px-5 text-uppercase">
                    Create your Token
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import dapp from '../mixins/dapp';
  import tokenDetails from '../mixins/tokenDetails';

  export default {
    name: 'Docs',
    mixins: [
      dapp,
      tokenDetails,
    ],
    data () {
      return {
        loading: true,
        currentNetwork: null,
        tokenType: 'SimpleERC20',
        token: {},
      };
    },
    computed: {
      sourceCode: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/dist/${this.contracts.token.contractName}.dist.sol`;
      },
      controlFlow: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/analysis/control-flow/${this.contracts.token.contractName}.png`;
      },
      inheritanceTree: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/analysis/inheritance-tree/${this.contracts.token.contractName}.png`;
      },
      uml: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/analysis/uml/${this.contracts.token.contractName}.svg`;
      },
    },
    mounted () {
      this.initDapp();
    },
    methods: {
      async initDapp () {
        try {
          await this.loadToken();
        } catch (e) {
          console.log(e);
          this.makeToast(
            'Some error occurred',
            e,
            'danger',
          );
          // document.location.href = this.$withBase('/');
        }
      },
      async loadToken () {
        this.initToken(this.tokenType);

        this.token = this.tokenDetails.find((elem) => elem.name === this.tokenType);

        this.loading = false;
      },
    },
  };
</script>
