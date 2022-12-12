import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { message, notification } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/es/message/style';
import 'ant-design-vue/es/notification/style';
import Loading from './components/dialog';
import { MyUse } from './hooks/myuse';
import './index.css';
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
app
  .use(router)
  .use(createPinia())
  .provide('$message', message)
  .provide('$notification', notification)
  .mount('#app');
