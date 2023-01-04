import { createApp, toRaw } from 'vue';
import { createPinia, PiniaPluginContext } from 'pinia';
import { message, notification } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/es/message/style';
import 'ant-design-vue/es/notification/style';
import Loading from './components/dialog';
import { MyUse } from './hooks/myuse';
import './index.css';
import 'uno.css';
export const app = createApp(App);
app.config.errorHandler = (err) => {
  console.log(err);
  // window.open(`https://www.baidu.com/s?wd=${err.message}`, '_blank');
};
MyUse(Loading);
MyUse(Loading);
MyUse(Loading);

type Lod = {
  show: () => void;
  hide: () => void;
};
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: Lod;
  }
}
const setStorege = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getStorege = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {};
};
const piniaPlugin = (options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    const data = getStorege(`${options?.key ?? 'tuolaji'}--${store.$id}`);
    store.$subscribe(() => {
      setStorege(`${options?.key ?? 'tuolaji'}--${store.$id}`, toRaw(store.$state));
    });
    return {
      ...data,
    };
  };
};
const pinia = createPinia();
// pinia.use(piniaPlugin({ key: 'wsm' }));
app
  .use(router)
  .use(pinia)
  .provide('$message', message)
  .provide('$notification', notification)
  .mount('#app');
