export default {
  methods: {
    isMobile () {
      try {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      } catch (e) {
        return false;
      }
    },
    makeToast (title, text, variant = null) {
      this.$bvToast.toast(text, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  },
};
