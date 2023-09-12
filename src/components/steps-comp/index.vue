<template>
  <div class="steps-container">
    <van-steps :active="active" active-color="#dd524d">
      <van-step>一</van-step>
      <van-step>二</van-step>
      <van-step>三</van-step>
      <van-step>四</van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  name: "Steps",
  props: {
    active: Number,
    default: 1,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.steps-container {
  margin-top: 8px;
  /deep/.van-steps {
    width: 320px;
    margin: 0 auto;
  }
}

</style>
