import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { message, notification } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/es/message/style';
import 'ant-design-vue/es/notification/style';

const app = createApp(App);
app.config.errorHandler = (err) => {
  console.log(err);
  window.open(`https://www.baidu.com/s?wd=${err.message}`, '_blank');
};
app
  .use(router)
  .use(createPinia())
  .provide('$message', message)
  .provide('$notification', notification)
  .mount('#app');
