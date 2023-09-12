<template>
  <van-sticky>
    <div class="navbar-container">
      <div class="navbar-arrow-left" @click="arrowLeft()"></div>
      <div class="navbar-arrow-title">{{ title }}</div>
      <div class="navbar-arrow-right" @click="arrowRight()"></div>
    </div>
  </van-sticky>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    title: {
      type: String,
      default: "测试",
    },
  },
  data() {
    return {};
  },
  methods: {
    arrowLeft() {
      this.$emit("arrowLeft");
    },
    arrowRight() {
      this.$emit("arrowRight");
    },
  },
};
</script>
<style lang="less" scoped>
.navbar-container {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: @color;
  .navbar-arrow-left,
  .navbar-arrow-right {
    width: 18px;
    height: 18px;
  }
  // .navbar-arrow-left {
  //   background-image: url("../../assets/image/arrow-left.png");
  //   background-repeat: no-repeat;
  //   background-size: 100% 100%;
  // }
  .navbar-arrow-title {
    font-size: 16px;
    color: @defaultColor;
  }
}
</style>
