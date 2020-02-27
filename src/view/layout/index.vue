<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  computed: {
    loadingShow() {
      return this.$store.state.app.loading;
    }
  },
  watch: {
    loadingShow(val) {
      if (val) {
        Toast.loading({
          message: "加载中..."
        });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  }
};
</script>
<style lang="less" scoped>
.float-home-icon {
  width: 20 * 5.4/75rem;
  height: 20 * 5.4/75rem;
  // border: 1px solid #333;
  box-shadow: -1px 0px 15px #ddd;
  border-radius: 50%;
  background-color: #fff;
  position: fixed;
  text-align: center;
  right: 20 * 3/75rem;
  bottom: 20 * 3/75rem;
  img {
    width: 20 * 3.2/75rem;
    display: inline-block;
    padding-top: 20 * 0.9/75rem;
    padding-bottom: 20 * 0.7/75rem;
  }
  &:active {
    box-shadow: -1px 0px 15px #999;
  }
}
</style>


