<template>
  
</template>
<script>
export default {
  created() {// 空白页用来重新刷新当前页面
    this.$router.replace({
      path:"/trip",
    })
  },
}
</script>
