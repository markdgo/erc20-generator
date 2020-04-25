import BootstrapVue from 'bootstrap-vue';
import vueSmoothScroll from 'vue2-smooth-scroll';

import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';

export default ({ Vue }) => {
  Vue.use(BootstrapVue);
  Vue.use(vueSmoothScroll);

  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);
};
