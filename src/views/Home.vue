<template>
  <component :is="wButton"></component>
  <br />
  <component :is="alink"></component>

  <br />
  配置项目
  <div id="aaa">{{ appStore.button }}</div>
  <div id="aaa1">{{ appStore.a }}</div>
</template>
<script setup>
  import wButton from '../components/button';
  import alink from '../components/alink';

  import { useAppStore } from '@/store';
  const appStore = useAppStore();
</script>
<style lang="less" scoped>
  .title {
    padding-bottom: 12px;
    font-size: 24px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
</style>
