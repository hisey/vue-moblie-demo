<template>
  <div class="picker_con">
    <div class="header">
      <div @click="close_picker" class="left">
        取消
      </div>
      <div class="title">{{title}}</div>
      <div @click="comfirm_picker" class="right">
        确认
      </div>
    </div>
    <div class="picker_body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "popUpBody",
  props: {

    title: {
      type: [String, Number],
      default: ""
    },
    
  },
  data() {
    return {

    };
  },
  watch: {
   
  },
  methods: {
    
    close_picker() {
     
      this.$emit("close");

    },
    comfirm_picker() {
      
      // console.log(this.pickerIndex,this.pickerIndexInner );
      this.$emit("confirm");
    }
  },
};

</script>

<style lang="less" >
  .van-popup--bottom{
    background:rgba(0,0,0,0);
  }
  .picker_con {
    background: #fff;
    width: 100vw;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    .header {
      height: 14.4vw;
      box-sizing: border-box;
      padding: 0 4.2666666vw;
      line-height: 14.4vw;
      display: flex;
     
      border-bottom: 1px solid #F3F4F5;
      .left {
        font-size: 4.2666666vw;
        color: #999999;
      }
      .right {
        color: #2688FC;
        font-size: 4.2666666vw;
      }
      .title {
        font-size: 4.8vw;
        flex: auto;
        text-align: center;
        color: #282828;
      }
    }
    .picker_body {
      width: 100vw;
      .picker_item {
        margin-left: 6.4vw;
        line-height: 14.4vw;
        padding-right: 4.2666666vw;
        border-bottom: 1px solid #F3F4F5;
        .picker_text {
          font-size: 4.2666666vw;
          color: #282828FF;
        }
        .picker_selected {
          float: right;
          img {
            vertical-align: middle;
            width: 5.333333vw;
            display: inline-block;
          }
        }
      }
    }
  }

</style>
