<template>
    <div id="trip-banner">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-if="banners?banners:[]" v-for="item in banners" :key="item.id">
                <a :href="item.landingPageUrl">
                    <img :src="item.url" :alt="item.landingPageAlt" :title="item.landingPageTitle">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
import { Swipe,SwipeItem } from 'mint-ui';
import { User } from '../../../../models/user';
export default {
    components:{
        'mt-swipe': Swipe,
  		'mt-swipe-item': SwipeItem
    },
    data (){
        return {
            banners:[]
        }
    },
    created(){
        let parm2 = 'type=11&device=0&businessType=1';
		User.advList(this, parm2).then(res => {
			if (res.success) {
                this.banners = res.list
			}
		}).catch(err => {
			console.log(err.msg)
		})
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
#trip-banner{
	img{
		width: 100%;
		height: 7rem;
		vertical-align: top;
	}
	.mint-swipe {
		height: 7rem;
	}
}
</style>
