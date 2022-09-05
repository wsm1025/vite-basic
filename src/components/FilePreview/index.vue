<template>
  <div style="display: inline; margin: 0 10px">
    <a @click="preview(url, name)" v-if="types.includes(fileType)">预览</a>
    <a v-else @click="download(url, name)" style="cursor: pointer">下载</a>
    <a-modal
      v-model:visible="previewModalVisible"
      :maskClosable="true"
      title="预览"
      width="660px"
      centered
      style="text-align: center"
      :footer="null"
    >
      <div class="download" v-if="previewFile" @click="download(previewFile.url, previewFile.name)">
        <a-space>
          <img
            src="http://gt-fe.oss-cn-beijing.aliyuncs.com/img/f56a927062ce11ec91b0bd62ab559b00.png"
            style="display: block"
          />
          <span>下载图片</span>
        </a-space>
      </div>
      <img
        :src="previewFile.url"
        alt="预览图片"
        style="max-width: 400px; display: block; margin: 0 auto; min-width: 200px"
      />
    </a-modal>
  </div>
</template>
<script setup>
  import download from '@/utils/downloadFileByUrl.js';
  const props = defineProps({
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  });
  const previewModalVisible = ref(false);
  const previewFile = ref({});
  const types = ref([
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'jpg',
      'jpeg',
      'png',
      'gif',
      'html',
      'htm',
      'mp4',
    ]),
    fileType = computed(() => {
      return props.name.split('.').pop();
    });
  const preview = (url, name) => {
    if (['pdf', 'html', 'htm', 'mp4'].includes(fileType.value)) {
      window.open(`${url}`, name);
    } else if (['doc', 'docx', 'xls', 'xlsx'].includes(fileType.value)) {
      window.open(`https://view.officeapps.live.com/op/view.aspx?src=${url}`, name);
    } else {
      previewFile.value = {
        url,
        name,
      };
      previewModalVisible.value = true;
    }
  };
</script>

<style scoped lang="less">
  /deep/.ant-modal-content {
    text-align: center;
  }
  /deep/ .ant-modal-body {
    text-align: center;
    position: relative;
    display: inline-block;
  }
  .download {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 110px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-radius: 15px;
    right: 15px;
    bottom: 35px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
      transition: all 0.5s;
    }
    span {
      font-size: 13px;
      line-height: 34px;
    }
  }
</style>
