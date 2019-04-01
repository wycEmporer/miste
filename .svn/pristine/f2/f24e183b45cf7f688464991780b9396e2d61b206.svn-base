<template>
    <div class="action">
        <div class="form-group flex space-between align-items-center">
            <a>Cancellation</a>
            <div class="select-wrap">
                <input class="select" type="radio" name="type" id="" value='0' v-model="selectWay">Depart

            </div>
            <div class="select-wrap">
                <input class="select" type="radio" name="type" id="" value='1' v-model="selectWay">Return
            </div>
            <span class="ico" @click="select"></span>
        </div>
        <div class="form-group flex space-between align-items-center">
            <a>Reschedule</a>
            <span class="ico" @click="$router.push('/order/change')"></span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        orders: {
            type: Array
        },
        fee: {
            type: null
        }
    },
    data() {
        return {
            selectWay: 0
        }
    },
    methods: {
        select() {
            sessionStorage.setItem('cancelType', this.selectWay);
            this.$router.push('/order/cancel');
        }
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