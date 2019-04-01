<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {

        }
    }
}
</script>
<style lang="less">
@import './assets/css/common.css';
@import './assets/css/reset.css';
@import './assets/font-icon/iconfont.less';
@import './assets/font-icon/iconfont1.less';
@import './assets/less/sprite.css';

#app {
    font-family: Helvetica, Arial, sans-serif, 'Avenir';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: inherit;
}

@font-face {
    font-family: 'WebRupee'; // src: url('/dist/fonts/WebRupee.V2.0.ttf');
    src: url('./assets/font/WebRupee.V2.0.ttf');
}
a{display:inline-block;}
#app>div {
    height: 100%;
}

.rs {
    font-family: 'WebRupee';
    font-weight: normal;
    margin-right: 0.2em;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

input,
select {
    border: none;
    border-radius: 4px;
}

.mt-range-progress {
    background-color: #ffad3d !important;
}

.mint-indicator-text {
    color: #ffad3d!important;
    font-size: 0.6rem!important;
    line-height: 1rem;
}

.mint-popup {
    border-radius: 4px;
}
.mint-toast-text{
    line-height: 0.8rem;
}
.mint-indicator {
    position: fixed;
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba(0, 0, 0, .1)!important;
}

.mint-radio-input:checked+.mint-radio-core {
    background-color: #fff!important;
    border-color: #ccc!important;
}

.mint-radio-input:checked+.mint-radio-core::after {
    background-color: #ffa033!important;
}

.mint-radiolist,
.mint-cell-wrapper,
.mint-radiolist-label {
    padding: 0!important;
}

.mint-radio-label {
    font-size: 0.52rem;
}

.swiper-slide {
    width: 100%!important;
}
</style>
