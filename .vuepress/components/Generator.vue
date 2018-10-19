<template>
    <b-row>
        <b-col lg="8" offset-lg="2" class="mt-4 p-0">
            <generator-box v-if="!loading"></generator-box>
        </b-col>
    </b-row>
</template>

<script>
  import GeneratorBox from "./elements/GeneratorBox";

  export default {
    components: { GeneratorBox },
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      web3Ready() {
        //this.token.id = this.getParam('id');

        // this.getToken();

        this.loading = false;
      },
      getParam(param) {
        const vars = {};
        window.location.href.replace(location.hash, '').replace(
          /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
          function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
          }
        );

        if (param) {
          return vars[param] ? vars[param] : null;
        }
        return vars;
      },
    },
  }
</script>
