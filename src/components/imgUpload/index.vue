<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :action="baseURL"
      :headers="headers"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      :accept="accept"
      @change="handleChange"
    >
      <img v-if="url" :src="url" alt="avatar" style="width: 80px" />
      <div v-else>
        <loading-outlined v-if="loading" />
        <plus-outlined />
      </div>
    </a-upload>
    <div class="tip"
      >只支持 {{ accept }} 格式，大小限制{{
        minSize >= 1 ? `${minSize}MB` : `${maxSize}M`
      }}以内</div
    >
    <div class="tip"> 尺寸大小限制{{ minWidth }}px~{{ maxWidth }}px </div>
  </div>
</template>
<script setup>
  import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
  let message = inject('$message');
  const props = defineProps({
    baseURL: {
      type: String,
      default: '',
    },
    value: {
      type: String,
    },
    headers: {
      type: Object,
      default: () => {},
    },
    accept: {
      type: String,
      default: '.png,.jpg,.jpeg,.gif',
    },
    minSize: {
      type: Number,
      default: 0.001,
    },
    maxSize: {
      type: Number,
      default: 100,
    },
    maxWidth: {
      type: Number,
      default: 99999,
    },
    maxHeight: {
      type: Number,
      default: 99999,
    },
    minWidth: {
      type: Number,
      default: 50,
    },
    minHeight: {
      type: Number,
      default: 50,
    },
    doneCallback: {
      type: Function,
      default: () => {},
    },
  });
  const fileList = ref([]);
  const url = ref('');
  const loading = ref(false);
  const beforeUpload = (file) => {
    fileList.value = [];
    return new Promise((resolve, reject) => {
      if (!props.baseURL.length) {
        message.error('未配置上传接口');
        return reject(false);
      }
      const acceptArray = props.accept.split(',');
      const nameArr = file.name.split('.');
      const fileType = '.' + nameArr[nameArr.length - 1].toLowerCase();
      const isLtType = acceptArray.includes(fileType);
      // 限制格式
      if (!isLtType) {
        message.error('文件格式不符！');
        return reject(false);
      }
      // 限制大小
      const isThan = file.size / 1024 / 1024 >= props.minSize;
      const isLt2M = file.size / 1024 / 1024 <= props.maxSize;
      if (!isThan) {
        message.error(
          `文件大小不得小于 ${props.minSize >= 1 ? props.minSize : props.minSize * 1024}${
            props.minSize >= 1 ? 'MB' : 'KB'
          }！`
        );
        return reject(false);
      }
      if (!isLt2M) {
        message.error(
          `文件大小不得超过 ${props.maxSize >= 1 ? props.maxSize : props.maxSize * 1024}${
            props.maxSize >= 1 ? 'MB' : 'KB'
          }！`
        );
        return reject(false);
      }
      // 限制尺寸大小
      if (props.maxWidth || props.maxHeight || props.minWidth || props.minHeight) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = () => {
            const w = image.width;
            const h = image.height;
            if (
              w > props.maxWidth ||
              w < props.minWidth ||
              h > props.maxHeight ||
              h < props.minHeight
            ) {
              message.error(
                `请上传宽度不小于 ${props.minWidth}px、不超过 ${props.maxWidth}px，高度不小于 ${props.minHeight}px、不超过 ${props.maxHeight}px 的图片`
              );
              reject(false);
            } else {
              resolve(file);
            }
          };
        };
      }
    });
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return (loading.value = true);
    }
    if (info.file.status === 'done') {
      loading.value = false;
      url.value = info.file.response.data.url;
      props.doneCallback();
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('上传失败！');
    }
  };
  onMounted(() => {
    if (props.value?.length) {
      if (Object.prototype.toString.call(props.value) === '[object Object]') {
        fileList.value = [
          {
            uid: props.value.id || Date.now(),
            name:
              props.value.name || props.value.url.substring(props.value.url.lastIndexOf('/') + 1),
            status: 'done',
            url: props.value.url,
          },
        ];
      } else if (Object.prototype.toString.call(props.value) === '[object String]') {
        fileList.value = [
          {
            uid: Date.now(),
            name: props.value.substring(props.value.lastIndexOf('/') + 1),
            status: 'done',
            url: props.value,
          },
        ];
      }
      url.value = props.value;
    }
  });
  defineExpose({
    fileList,
  });
</script>
<style lang="less" scoped>
  .tip {
    margin-bottom: 4px;
    color: rgb(0 0 0 / 65%);
    font-size: 12px;
    line-height: initial;
  }
</style>
