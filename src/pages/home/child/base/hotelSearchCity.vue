<template>
  <div class="wrapper">
    
    <head-top :operate="closeThis">
				<i slot="left" class="prev iconfont icon-back"></i>
				<div slot="title" class="title">Search</div>
				<i slot="right" class="sp iconfont"></i>
		</head-top>
    <div class="main" style="margin-top: 2.04rem;">
      <div class="form-group">
        <!--<label for="areaName">City,Hotel</label>-->
        <input type="text"
               v-model="areaName"
               id="areaName"
               @input="getCity"
               placeholder="Enter City or Hotel"
               v-focus
               @focus="focus()"
               @blur="blur()"
               :class="isFocus"
        >
        <i v-if="areaName" @click="clear()"></i>
      </div>
      <div style="overflow: scroll;height:23rem">
        <ul v-if="searchShow">
          <li
            v-for="(item, index) in list"
            :key="index"
            :data-index="index"
            @click='go(index)'>
            <!--<p class="txt">{{ item.name }}</p>-->
            <p class="txt" v-html="item.html"></p>
            <span>{{ item.flag }}</span>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
import headTop from '../../../../components/head/head.vue';
  const nodeDom = (str, tem) => {

    var regStr = '(' + tem + ')([\\s\\S]*)';
    var reg = new RegExp(regStr, 'i');
    var regMatch = str.match(reg);
    if (regMatch !== null) {
        var replaceReturn = '';
        for (var j = 1, lenJ = regMatch.length; j < lenJ; j++) {
            if (regMatch[j].toLowerCase() == tem.toLowerCase()) {
                if (str.toLowerCase() == 'new delhi' && 'new delhi'.indexOf(tem.toLowerCase()) == 0) {
                    replaceReturn += 'Delhi(<b style="color:#f34f4f;">$' + j;
                }
                else {
                    replaceReturn += '<b style="color:#f34f4f;">$' + j + '</b>';
                }
            } else {
                replaceReturn += '$' + j;
            }
        }
        var repl = str.replace(reg, replaceReturn);
        if (str.toLowerCase() == 'new delhi' && 'delhi'.indexOf(tem.toLowerCase()) > -1) {
            repl = repl.replace(/new/ig, '') + '(New Delhi)';
        }
        if (str.toLowerCase() == 'new delhi' && 'new delhi'.indexOf(tem.toLowerCase()) == 0) {
            replaceReturn = replaceReturn.replace(/\$2/ig, '').replace(/\$1/ig, '$1</b>' + '$2)');
            repl = str.replace(reg, replaceReturn);
        }
        return repl;
    } else {
        return str;
    }
  }
  

  export default {
    name: "search",
    components:{
      headTop
    },
    data() {
      return {
        areaName: '',
        list: [],
        index: 0,
        isFocus: '',
        searchShow: false,
      }
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    },
    methods: {
      getCity() {
        this.index++
        if (this.areaName.trim().length < 3) {
          this.searchShow = false;
          return;
        }
        this.searchShow = true;
        this.$axios({
          url: '/api/web/city?name=' + this.areaName + '&index=' + this.index,
          methods: 'get'
        }).then(res => {
     
          if (+res.index === this.index) {
            let list = res.cityHotelList;
            for (let val of list) {
              val.html = nodeDom(val.name, this.areaName);
              if(val.flag !== 'city'){
                val.html = val.html + ',' + val.cityName;
              }
            }
            this.list = list;
          }
        }).catch(err => {
          console.log(err)
          this.searchShow = false;
        })
      },
      go(index) {
        // console.log(this.list[index]);
        // this.$store.commit('setSearchInfo', this.list[index])
        this.$emit('getCity', this.list[index]);
        // sessionStorage.clear();
        // setSession('searchInfo', JSON.stringify(this.list[index]))
        // this.$router.push('/')
      },
      closeThis() {
        this.$emit('close');
      },
      clear() {
        this.areaName = ''
        this.list = []
      },
      focus() {
        this.isFocus = 'active'
      },
      blur() {
        this.isFocus = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
  .wrapper{
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 100;
    background-color: #fff;
  }

  .main {
    padding: 0.6rem;
    width: 100%;
    .form-group {
      display: flex;
      flex-direction: column;
      position: relative;
      label {
        font-size: 12px;
        text-align: left;
        line-height: 16px;
        margin-bottom: 5px;
        width: 100%;
      }
      input {
        border: 1px solid #CDCDCD;
        border-radius: 2px;
        padding: 0 0.2rem;
        height: 1.8rem;
        width: 100%;
        padding-right: 1.6rem;
        &.active {
          border-color: #0B9D78;
        }
      }
      i {
        position: absolute;
        width: 0.68rem;
        height: 0.68rem;
        top: 0.56rem;
        right: 0.56rem;
        background: url('../../../../assets/images/close.png') no-repeat center/contain;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      border-top: none;
      li {
        width: 100%;
        height: 1.6rem;
        line-height: 1.6rem;
        border-bottom: 1px solid #CDCDCD;
        color: #666;
        display: flex;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 85%;
          text-align: left;
          font-size: 0.56rem;
        }
        span {
          width: 15%;
          text-align: right;
          font-size: 0.44rem;
        }
      }
    }
  }

</style>
