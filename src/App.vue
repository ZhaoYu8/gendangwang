<template>
  <div id="app">
    <tabs> </tabs>
    <div class="concat">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      vuex: (state) => state,
    }),
  },
  methods: {
    ...mapActions({
      getUser: "getUser",
    }),
  },
  created() {
    let obj = {
      getUser: this.getUser,
    };
    Object.assign(Vue.prototype, {
      $vuexFn: obj,
      $vuexData: { x: this.vuex },
    });
  },
};
</script>
<style lang="scss">
</style>
