import request from '@/utils/request';

export default {
  hitoapi: () => request.get('https://v1.hitokoto.cn'),
  getURL: (key, methods, data) => request[methods](key, data),
};
