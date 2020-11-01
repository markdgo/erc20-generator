<template>
    <b-container fluid>
        <b-row id="token-docs">
            <b-col lg="10" offset-lg="1" class="my-4 p-0">
                <div v-if="loading" class="text-center p-5">
                    <ui--loader :loading="true"></ui--loader>
                </div>
                <b-card v-if="!loading" :title="$site.title" bg-variant="transparent" border-variant="0">
                    <b-card bg-variant="light"
                            header="Token Type"
                            header-bg-variant="dark"
                            header-text-variant="white">
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
                    <b-card bg-variant="light"
                            header="Token Details"
                            header-bg-variant="dark"
                            header-text-variant="white"
                            class="mt-3">
                        <p>
                            <b-link :href="`https://github.com/vittominacori/erc20-generator/tree/v${this.version}`" target="_blank">
                                <b-img :src="`https://img.shields.io/badge/version-${this.version}-blue`"></b-img>
                            </b-link>
                            <b-link href="https://travis-ci.com/github/vittominacori/erc20-generator" target="_blank">
                                <b-img src="https://travis-ci.com/vittominacori/erc20-generator.svg?branch=master"></b-img>
                            </b-link>
                            <b-link href="https://coveralls.io/github/vittominacori/erc20-generator" target="_blank">
                                <b-img src="https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master"></b-img>
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
                        </ul>
                        <div class="form-group">
                            <label><b>ABI</b></label>
                            <textarea class="form-control"
                                      readonly="readonly" rows="5"
                                      v-model="contracts.token.stringifiedAbi"></textarea>
                        </div>
                    </b-card>
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
    </b-container>
</template>

<script>
  import dapp from '../mixins/dapp';

  export default {
    name: 'Docs',
    mixins: [
      dapp,
    ],
    data () {
      return {
        version: '4.0.0',
        loading: true,
        currentNetwork: null,
        tokenType: 'SimpleERC20',
      };
    },
    computed: {
      sourceCode: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.version}/dist/${this.contracts.token.contractName}.dist.sol`;
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

        this.loading = false;
      },
    },
  };
</script>
