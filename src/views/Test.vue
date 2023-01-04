<template>
  {{ appStore.name }}<br />{{ appStore.number }}<br />{{ appStore.newVal }}
  <a-button @click="change">change</a-button>
  <a-button @click="reset">reset</a-button>
</template>
<script setup lang="ts">
  import { render, createVNode } from 'vue';
  import { useAppStore } from '@/store';
  const appStore = useAppStore();
  import message from '../components/dialog/index.vue';

  let { number, name } = storeToRefs(appStore);
  render(createVNode(message), document.body);
  const change = () => {
    console.log(number.value, name.value);
    // appStore.number++;
    // appStore.$patch({
    //   number: 10,
    // });
    // appStore.$patch((state) => {
    //   state.number++;
    // });
    appStore.change(Math.random());
  };
  const reset = () => appStore.$reset();

  appStore.$subscribe((a, b) => {
    console.log(a);
    console.log(b);
  });

  appStore.$onAction((e) => {
    console.log(e);
    e.after((c) => {
      console.log(1);
    });
  });
</script>
<style lang="less" scoped></style>
