<template>
  <pop-up-body @close="close_picker" :title="title" @confirm="confirm_picker">
    <div class="picker_item" v-for="(item,index ) in columns" :key="index" @click="preClick(index+1)">
      <span class="picker_text">{{item.text}}</span>
      <span v-if="((pickerIndexInner||pickerIndex)-1)==index" class="picker_selected">
        <img src="../assets/img/icon/btn_chb_selected.png" alt="" />
      </span>
    </div>

  </pop-up-body>

</template>

<script>
import popUpBody from "./popUpBody.vue";
export default {
  name: "picker",
  components:{
    popUpBody
  },
  props: {

    title: {
      type: [String, Number],
      default: ""
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
  },
  data() {
    return {
      pickerIndexInner: "",
      pickerIndex: 1,
    };
  },
  watch: {
    columns(val) {
      this.pickerIndexInner = "";
      this.pickerIndex = 1;
    }
  },
  methods: {
    preClick(index) {
      this.pickerIndexInner = index;
    },
    close_picker() {
      
      this.pickerIndexInner = "";
      this.$emit("cancel");
    },
    confirm_picker() {
      
      if (this.pickerIndexInner) {
        this.pickerIndex = this.pickerIndexInner;
      }
      // console.log(this.pickerIndex,this.pickerIndexInner );
      this.$emit("confirm", this.columns[this.pickerIndex - 1], this.pickerIndex - 1);
    }
  },
};

</script>

<style lang="less" scoped>
  

</style>
