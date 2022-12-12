import { createVNode, render, App, VNode } from 'vue';

import Loading from './index.vue';
export default {
  install(app: App): VNode {
    const Vnode = createVNode(Loading);
    render(Vnode, document.body);
    // 注册组件
    // app.component('Loading', Loading);

    // 注册方法;
    app.config.globalProperties.$loading = {
      show: () => Vnode.component?.exposed?.show(),
      hide: () => Vnode.component?.exposed?.hide(),
    };
  },
};
