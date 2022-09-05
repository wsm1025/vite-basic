<script setup>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');
</script>
<template>
  <a-config-provider :locale="zhCN">
    <div class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">about</router-link>
    </div>
    <router-view />
  </a-config-provider>
</template>
<style lang="less" scoped>
  .nav {
    padding: 16px 32px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    background-color: #24292f;

    a {
      margin: 0 8px;
      color: #fff;

      &.router-link-active {
        color: #409aff;
      }
    }
  }
</style>
