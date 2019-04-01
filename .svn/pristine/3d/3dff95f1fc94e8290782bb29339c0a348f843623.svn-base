<template>
	<div class="header flex space-between" v-if="showHeader">
		<div class="head-ico flex align-items-center" @click="navigate">
			<slot name="left"></slot>
		</div>
		<div class="head-title flex align-items-center">
			<slot name="title"></slot>
		</div>
		<div class="user flex align-items-center content-end">
			<slot name="right"></slot>
		</div>
	</div>
</template>
<script>
import {AppBridge} from '../../models/appbridge/appbridge.js';
export default {
  data() {
    return {
      showHeader: false,
      navigate: null,
    };
  },
  props: {
    operate: {
      type: [Function, Object],
      default: null
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  async created() {
    this.showHeader = await AppBridge.getNativeSource(this);
    this.navigate = this.operate || this.goback;
  },
};
</script>
<style lang='less' scoped>
.ios {
  display: none;
}
.header {
  width: 100%;
  height: 2.04rem;
  line-height: 2.04rem;
  position: fixed;
  top: 0;
  z-index: 10;
  background: #0b9d78;
  .title {
    font-size: 0.768rem;
    color: #fff;
  }
  .head-ico {
    i {
      padding: 0 0.64rem;
      color: #fff;
      display: block;
    }
  }

  .user {
    line-height: 2.04rem;
    i {
      padding: 0 0.64rem;

      color: #fff;
    }
    img {
      padding: 0.64rem;
      width: 0.8rem;
      flex: 0 0 0.5rem;
      display: block;
    }
  }
  .head-title {
    font-size: 1.02rem;
    height: 2.04rem;
    line-height: 2.04rem;
    color: #fff;
  }
}
</style>