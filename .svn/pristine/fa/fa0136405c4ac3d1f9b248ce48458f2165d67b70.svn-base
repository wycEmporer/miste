<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="prev iconfont icon-back"></i>
            <div slot="title" class="title">Paersonal Identity Verification</div>
            <i slot="right" class="sp iconfont icon-back"></i>
        </head-top>
        <div class="content">
            <div class="text">
                <p>Dear member,</p>
                <p>According to the policy of Reserve Bank of India, we will verify your Personal Identity at the 1st time you top up or withdraw on our website.</p>
                <p>Please complete your verification by steps below.</p>
            </div>
            <div class="verification">
                <div class="tips">
                    <ol>
                        <li>Please take a photo of your personal Identity Card and upload it.</li>
                    </ol>
                </div>
                <div class="verify-part">
                    <div class="front">
                        <span>Front</span>
                        <input type="file" class="cardFront" name="cardFront" @change="onFileChange">
                        <img :src="cardFront" alt="" v-if="cardFront.length">
                    </div>
                    <div class="back">
                        <span>Back</span>
                        <input type="file" class="cardBack" name="cardBack" @change="onFileChange">
                        <img :src="cardBack" alt="" v-if="cardBack.length">
                    </div>
                </div>
                <div class="phone-info">
                    <span>Mobile:{{phone}}</span>
                </div>
                <div class="otp">
                    <div class="form-group flex space-between">
                        <input type="text" class="otp" placeholder="Enter your OTP code" name="code" v-model="code">
                        <a @click="getOtp()">Send</a>
                    </div>
                </div>
                <div class="button">
                    <a @click="sendInfo()">Confirm</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { Toast } from 'mint-ui'
import { User } from '../../models/user'

export default {
    components: {
        headTop
    },
    data() {
        return {
            cardFront: '',
            cardBack: '',
            cardFrontFile: '',
            cardBackFile: '',
            phone: '',
            code: '',
            width: 0,
            height: 0
        }
    },
    methods: {
        sendInfo() {
            var img = new FormData();
            img.append('image0', this.cardFrontFile);
            img.append('image1', this.cardBackFile);
            img.append('code', this.code);

            User.idcardUpload(this, img).then(res => {
                if (res.code == 2) {
                    Toast(res.msg)
                }
            })
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            var type = files[0].type.split('/')[1];
            if (!files.length) { return }
            else if (!/(jpg|jpeg|png|JPG|PNG)$/.test(type)) {
                Toast('you can upload image only')
            } else {
                var pic = e.target.className;
                this.createImage(files[0], pic);
            }
        },
        createImage(file, pic) {
            if (typeof FileReader === 'undefined') {
                Toast('The browser version does not support this feature');
                return false;
            }

            var size = file.size / 1024;
            console.log(Math.round(size) + 'kb')

            var reader = new FileReader();

            reader.readAsDataURL(file)

            this[pic + 'File'] = file;

            reader.onload = (e) => {
                this[pic] = e.target.result;

                var image = new Image();
                image.onload = function() {
                    this.width = image.width;
                    this.height = image.height;
                }
            }
        },
        getOtp() {
            User.sendAuthenOTP(this).then(res => {
                console.log(res)
            })
        }
    },
    created() {
        if (sessionStorage.user) {
            this.phone = JSON.parse(sessionStorage.user).cellphone;
        }
    }
}
</script>
<style lang='less' scoped>
.header {
    background: #17a27f;
    .title {
        line-height: 2.04rem;
        font-size: 0.768rem;
        color: #fff;
    }
    .sp {
        opacity: 0;
    }
}

.content {
    padding: 2.893rem 0.64rem 0 0.64rem;
    .text {
        text-align: left;
        p {
            font-size: 0.512rem;
            line-height: 1.5;
            color: #666;
        }
    }
    .verification {
        padding-top: 0.853rem;
        .tips {
            font-size: 0.512rem;
            color: #333;
            text-align: left;
            padding: 0 0.64rem;
        }
        .verify-part {
            margin: 0.853rem 0;
            .front,
            .back {
                width: 11.95rem;
                height: 6.57rem;
                line-height: 6.57rem;
                box-sizing: border-box;
                border: 1px dashed #666;
                margin: 0 auto;
                position: relative;
                input {
                    display: block;
                    height: 100%;
                    width: 100%;
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 10;
                }
                img {
                    display: block;
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 9;
                }
            }
            .front {
                margin-bottom: 0.64rem;
            }
        }
        .phone-info {
            text-align: left;
            font-size: 0.64rem;
            padding-bottom: 0.64rem;
        }
        .otp {
            padding-bottom: 2.98rem;
            .form-group {
                input {
                    width: 70%;
                    height: 1.877rem;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-radius: 2px;
                    padding: 0.32rem;
                    border-right: 0;
                    font-size: 0.64rem;
                }
                 ::-webkit-input-placeholder {
                    font-size: 0.64rem;
                }
                a {
                    display: block;
                    width: 30%;
                    line-height: 1.877rem;
                    height: 1.877rem;
                    background: #0b9d78;
                    color: #fff;
                    font-size: 0.512rem;
                }
            }
        }
        .button {
            display: block;
            width: 13.86rem;
            height: 1.7rem;
            line-height: 1.7rem;
            font-size: 0.554rem;
            text-align: center;
            background: #ffad3d;
            color: #fff;
            margin: 0 auto;
            border-radius: 4px;
            margin-bottom: 2.47rem;
        }
    }
}
</style>