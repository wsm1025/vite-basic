<template>
  {{ code }}
  <img-upload
    :doneCallback="http"
    baseURL="/base/files/upload"
    :headers="headers()"
    ref="upload"
    value="https://lcscoss.xytzjt.com/35578c9940f4e1c9e7119390e248cea5.png"
  />
  <div><a-button @click="http">请求</a-button></div>
</template>
<script setup>
  import demo from '@/api/demo';
  const code = ref(null);
  const upload = ref();
  const http = () => {
    demo.hitoapi().then((res) => {
      code.value = res.hitokoto;
    });
  };
  const headers = () => {
    return {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJhZG1pbiIsInVzZXJfbmFtZSI6IjEzOTAwMDAwMDAzIiwibG9naW5fdGltZSI6MTY2MTk1NjczNTIwNCwic2NvcGUiOlsiICBhZG1pbiAiLCIgY29tbXVuaXR5ICIsIiBhcHAgIl0sImNsaWVudCI6ImFwcCIsImlkIjoxNTE5MjU4NDUxOTgxNTQxMzc3LCJleHAiOjE2NjE5OTk5MzUsImF1dGhvcml0aWVzIjpbIjE0MTcxMDA4NzcyOTQ1MzA1NjEiLCIxNDE3MTAwODc3MzAyOTE5MTcwIl0sImp0aSI6Ijg4N2Y0ZDYyLWNjZDMtNGE0Yy04ZGY0LWFjMTdiMDZmMTM4OCIsImNsaWVudF9pZCI6ImFkbWluIn0.IokIh5-Bf2q8VRW4ZiFgPhZ4bMyGcT1dvmeZUoir8fKcJNmkusNYICWoFTM90Z1gOCF5Lte-ddgCw0DfTGruOlSQF3O2pcxqqLpGqC8-cQwn9c1yIGsIhu4Fp3msunRplgzZXhfbSyaumV-9ouPN57BK0XfWA1yx8Zm_GWg2t1m90JiRuMUecZZdSd2tcKkQSrcVkeoMWLWFWIEVQAgMpMt6JN4kxnYQY93fRE03sFm_if2Z1qYKS4Ngx5k57n8yPCHLIE-ANTZLQHdycTij_spALGCvtWlWKlJgz1aBh_3sYF4gdYeW9hzxcAm2FnITuZrKnj5NhWiKtGsqiO6avA',
    };
  };
</script>
<style lang="less" scoped>
  .title {
    padding-bottom: 12px;
    font-size: 24px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
</style>
