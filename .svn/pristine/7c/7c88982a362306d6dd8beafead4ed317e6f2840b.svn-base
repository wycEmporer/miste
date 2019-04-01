<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="item in imgList" :key="item.id">
            <div class="imglist">
                <img :src="item.href" alt="">
                <!--@click="$router.push(item.route)"-->
            </div>
        </swiper-slide>
        <!-- Optional controls -->
        <!--<div class="swiper-pagination"  slot="pagination"></div>-->
        <div v-show="imgList.length!=1" class="swiper-button-prev" slot="button-prev"></div>
        <div v-show="imgList.length!=1" class="swiper-button-next" slot="button-next"></div>
        <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
</template>
<script>
export default {
    name: 'carrousel',
    data() {
        return {
            swiperOption: {
                //                notNextTick: true,
                //                autoplay: 2000,
                //                direction: 'horizontal',
                //                grabCursor: true,
                //                setWrapperSize: true,
                //                autoHeight: true,
                //                pagination: 'null',
                //                paginationClickable: true,
                //                prevButton: '.swiper-button-prev',
                //                nextButton: '.swiper-button-next',
                // loop: true,
                //                mousewheelControl: false,
                //                observeParents: true,
                //                debugger: true,
            },
            imgList: [
                {
                    href: require('../../../../assets/images/home/hw.jpg'),
                    route: '/wallet'
                }

            ]
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {

    }
}
</script>
<style lang='less' scoped>
.imglist {
    height: 12.8rem;
    overflow: hidden;
    img {
        width: 100%;
    }
}

.swiper-button-prev,
{
    background: url('../../../../assets/images/prev.png') center 10px no-repeat;
}

.swiper-button-next {
    background: url('../../../../assets/images/ic-btn-one.png') center 10px no-repeat;
}
</style>


<!-- <div class="flight-detail-track-depart clear" v-for="(item, index) in displayedDepartFlights()" :key="item.id" :class="['flight-detail-list', (selectedDepartFlightIndex)==index?'item-act':'item-def']" @click='onDepartItemClick(index)'>
        <div class="flight-detail-ico left">
            <img :src="item.airline.iconPath" alt="">
        </div>
        <div class="flight-detail-info left">
            <div class="flight-number">
                <span>{{item.flightNumber}}</span>
            </div>
            <div class="flight-time flex space-between">
                <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.departDate)}}</span>
                <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.returnDate)}}
                    <i v-show="item.durationDays!=0">&nbsp;+{{item.durationDays}}</i>
                </span>
            </div>
            <div class="flight-aside">
                <div class="line">
                    <span class="round"></span>
                    <span class="round"></span>
                </div>
            </div>
            <div class="flight-mileage flex space-between">
                <span>{{TimeFormatUtil.getDurationDescription(item)}}</span>
                <span>{{(item.stops.length-1 == 0)? 'non-stop' : item.stops.length-1 + 'stop'}}</span>
            </div>
            <div class="flight-price clear">
                <div class="present-price left">
                    <span class="rs">Rs.</span>
                        <span v-if="selectedDepartFlightIndex==index">{{item.showPrice | formatDate}}</span> 
                    <span>{{item.bfp+item.gst | formatDate}}</span>
                </div>
                <div class="past-price left">
                    <span class="rs">Rs.</span>
                    <span>{{item.obfp + item.gst | formatDate}}</span>
                </div>
            </div>
        </div>
    </div> -->


    <!-- <div class="flight-detail-track-return clear" v-for="(item, index) in displayedReturnFlights()" :key="item.id" :class="['flight-detail-list', (selectedReturnFlightIndex)==index?'item-act':'item-def']" @click='onReturnItemClick(index)'>
        <div class="flight-detail-ico left">
            <img :src="item.airline.iconPath" alt="">
        </div>
        <div class="flight-detail-info left">
            <div class="flight-number">
                <span>{{item.flightNumber}}</span>
            </div>
            <div class="flight-time flex space-between">
                <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.departDate)}}</span>
                <span>{{TimeFormatUtil.getDisplayHourAndMinute(item.returnDate)}}
                    <i v-show="item.durationDays!=0">&nbsp;+{{item.durationDays}}</i>
                </span>
            </div>
            <div class="flight-aside">
                <div class="line">
                    <span class="round"></span>
                    <span class="round"></span>
                </div>
            </div>
            <div class="flight-mileage flex">
                <span>{{TimeFormatUtil.getDurationDescription(item)}}</span>
                <span>{{(item.stops.length-1 == 0)? 'non-stop' : item.stops.length-1 + 'stop'}}</span>
            </div>
            <div class="flight-price flex content-start">
                <div class="present-price">
                    <span class="rs">Rs.</span>
                    <span>{{item.bfp+item.gst | formatDate}}</span>
                </div>
                <div class="past-price">
                    <span class="rs">Rs.</span>
                    <span>{{item.obfp + item.gst}}</span>
                </div>
            </div>
        </div>
    </div>