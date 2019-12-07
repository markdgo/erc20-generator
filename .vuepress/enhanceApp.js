import BootstrapVue from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';

export default ({ Vue }) => {
  Vue.use(BootstrapVue);
  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);
};
