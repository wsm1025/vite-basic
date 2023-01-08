<template>
  {{ code }}
  <img-upload
    :doneCallback="http"
    :baseURL="config?.baseURL"
    :headers="{
      Authorization: config?.Authorization,
    }"
    ref="upload"
    value="https://lcscoss.xytzjt.com/35578c9940f4e1c9e7119390e248cea5.png"
  >
    <p class="slot">插槽选择器</p>
  </img-upload>
  <div><a-button @click="http">请求</a-button></div>
  <!-- <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img
          class="h-48 w-full object-cover md:w-48"
          src="http://n.sinaimg.cn/translate/20170815/OoVn-fyixtym5144510.jpg"
          alt="Man looking at item at a store"
        />
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >Finding customers for your new business</a
        >
        <p class="mt-2 text-gray-500"
          >Getting a new business off the ground is a lot of hard work. Here are five ideas you can
          use to find your first customers.</p
        >
      </div>
    </div>
  </div> -->
</template>
<script setup>
  import demo from '@/api/demo';
  const code = ref(null);
  const upload = ref();
  const config = ref();
  const http = () => {
    demo.hitoapi().then((res) => {
      code.value = res.hitokoto;
    });
  };
  const headers = async () => {
    let {
      data: { token, url, path },
    } = await demo.getURL(import.meta.env.VITE_UPLOAD_URL, 'post', {
      appKey: import.meta.env.VITE_UPLOAD_APPKEY,
    });
    config.value = {
      Authorization: token,
      baseURL: url + path,
    };
  };
  onMounted(() => {
    headers();
  });
</script>
<style lang="less" scoped>
  .title {
    padding-bottom: 12px;
    font-size: 24px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
</style>
