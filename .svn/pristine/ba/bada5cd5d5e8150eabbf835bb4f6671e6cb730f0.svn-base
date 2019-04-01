<template>
    <div class="action">
        <span>
        </span>
        <div class="form-group flex space-between align-items-center" v-if="orders[1]">
            <a>Cancellation</a>
            <div class="select-wrap" v-show="ow">
                <input class="select" type="radio" name="cancel" id="" value='0' v-model="cancelWay">Depart

            </div>
            <div class="select-wrap" v-show="rt">
                <input class="select" type="radio" name="cancel" id="" value='1' v-model="cancelWay">Return
            </div>
            <span class="ico" @click="cancel()"></span>
        </div>
        <div class="form-group flex space-between align-items-center" v-else>
            <a>Cancellation</a>
            <span class="ico" @click="$router.push('/order/cancel')"></span>
        </div>
        <div class="form-group flex space-between align-items-center" v-if="orders[1]">
            <a>Reschedule</a>
            <div class="select-wrap" v-show="ow">
                <input class="select" type="radio" name="change" id="" value='0' v-model="changeWay">Depart
            </div>
            <div class="select-wrap" v-show="rt">
                <input class="select" type="radio" name="change" id="" value='1' v-model="changeWay">Return
            </div>
            <span class="ico" @click="change()"></span>
        </div>
        <div class="form-group flex space-between align-items-center" v-else>
            <a>Reschedule</a>
            <span class="ico" @click="$router.push('/order/change')"></span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
    },
    data() {
        return {
            orders: [],
            selectWay: 0,
            cancelWay: 0,
            changeWay: 0,
            ow: false,
            rt: false
        }
    },
    methods: {
        cancel() {
            sessionStorage.setItem('cancelType', this.cancelWay);
            this.$router.push('/order/cancel')
        },
        change() {
            sessionStorage.setItem('cancelType', this.changeWay);
            this.$router.push('/order/change')
        },
        showType() {
            for (var x in this.orders[0].travellerinfo) {
                if (this.orders[0].travellerinfo[x].status == 1) {
                    this.ow = true
                }
            }
            if (this.orders[1]) {
                for (var y in this.orders[1].travellerinfo) {
                    if (this.orders[1].travellerinfo[y].status == 1) {
                        this.rt = true
                    }
                }
            }
        }
    },
    created() {
        this.orders = JSON.parse(sessionStorage.getItem('orders'));
    },
    mounted() {
        console.log(this.orders)
        this.showType();
    }
}
</script>
<style lang="less" scoped>
.action {
    padding: 0.32rem 0;
    .form-group {
        margin: 0 0.4rem;
        padding: 0.2rem 0;
        border-bottom: 1px solid #ddd;
        font-size: 0.6rem;
        a {
            display: block;
            text-align: left;
            font-size: 0.6rem;
            width: 25%;
            line-height: 1.5rem;
        }
        .select-wrap {
            font-size: 0.6rem;
            display: block;
            width: 25%;
        }
        .ico {
            width: 1.6rem;
            padding: 0.6rem 0; // display: list-item;
            background: url('../../../../assets/images/ic-btn-one.png') center no-repeat;
            background-size: 0.4rem;
        }
    }
}
</style>