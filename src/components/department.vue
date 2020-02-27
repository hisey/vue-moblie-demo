<template>
  <pop-up-body @close="close_picker" :title="title" @confirm="confirm_picker">
    <div class="dpt_con">
      <div class=" form-box">
        <div class="form-item">
          <div style="position: relative">
            <input
              type="text"
              ref="department_input"
              v-model="departmentText"
              placeholder="输入关键字搜索科室"
              class="name_input"
              id="name_input"
            />
            <img
              v-show="departmentText"
              src="@/assets/img/icon/colse.png"
              class="close"
              @click="departmentText = ''"
              alt=""
            />
            <img
              src="@/assets/img/icon/icon_search@2x.png"
              class="search"
              alt=""
            />
          </div>
          <ul class="hospital-list" v-if="departments.length > 0">
            <li
              v-for="(item, index) in departments"
              :key="index"
              @click.prevent="addDepartment(item)"
              v-html="item.highlight"
            ></li>
          </ul>
        </div>
      </div>
      <div class="dpt_list">
        <div class="dpt_list_title">
          已选科室
        </div>
        <div class="dpt_list_tags">
          <div class="tag" v-for="(item, index) in list" :key="item.id">
            <div
              class="tag_name"
              :class="{ on: item.showDelete }"
              @click="tagClick(index)"
            >
              {{ item.name }}
            </div>
            <div
              class="tag_del"
              v-if="item.showDelete"
              @click="deleteList(index)"
            >
              删除
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
  </pop-up-body>
</template>

<script>
import popUpBody from "./popUpBody.vue";
import authService from "@/services/auth";
import { Toast } from "vant";
export default {
  name: "department",
  components: {
    popUpBody
  },
  props: {
    title: {
      type: [String, Number],
      default: ""
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      departmentText: "",
      departments: [],
      list: []
    };
  },

  watch: {
    departmentText(val) {
      if (val != "") {
        this.departmentFuzzySearch(val);
      } else {
        this.departments = [];
      }
    },
    columns: {
      handler(val, oldval) {
        this.list = val;
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  methods: {
    tagClick(index){
      for(let idx in this.list){
        if(idx==index){
          this.list[idx].showDelete=!this.list[idx].showDelete;
        }else{
          this.list[idx].showDelete=false;
        }
      }
    },
    deleteList(index) {
      this.list.splice(index, 1);
    },
    departmentFuzzySearch(content) {
      authService
        .departmentFuzzySearch({
          content,
          from: "H5"
        })
        .then(res => {
          if (res.status == 200 && res.data) {
            this.departments =  this.regStr([...res.data]);
          }
        });
    },
    regStr(arr) {
      let str = this.departmentText.trim();
      let attr = "name";
      return arr.map(item => {
        item.highlight = Object.values(item[attr])
          .map(item => {
            if (Object.values(str).indexOf(item) > -1) {
              item = `<b>${item}</b>`;
            }
            return item;
          })
          .join("");

        return item;
      });
    },
    addDepartment(item) {
      let newItem = JSON.parse(JSON.stringify(item));
      let rslt = this.list.some(val => {
        return val.id == item.id;
      });
      if (!rslt) {
        if (this.list.length < 15) {
          newItem.showDelete = false;
          this.list.push(newItem);
          this.departments = [];
          this.departmentText="";
        }else{
          Toast("最多只能选择15个科室");
        }
      }else{
        Toast("已经添加过了");
      }
    },
    close_picker() {
      this.pickerIndexInner = "";
      this.$emit("cancel");
    },
    confirm_picker() {
      // console.log(this.pickerIndex,this.pickerIndexInner );
      this.$emit("confirm", this.list);
    }
  }
};
</script>

<style lang="less" scoped>
.dpt_con {
  height: 80vh;
  .form-box {
    padding: 24px;

    .form-item {
      position: relative;

      .lable {
        margin-bottom: 10px;
      }

      .lable,
      .input-value {
        font-size: 17px;
        display: block;
        color: #282828;
      }

      input,
      .input-box {
        
        &::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #999;
          font-weight: 400;
          font-size: 13px;
          line-height: 26px;
          
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #999;
          font-weight: 400;
          font-size: 13px;
          line-height: 26px;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #999;
          font-weight: 400;
          font-size: 13px;
          line-height: 26px;
        }
        display: block;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 16px;
        
        padding: 11px 30px 11px 30px;
        border: 1px solid #efefef;
        font-weight: bold;
        color: #282828;
      }

      .name_input {
        padding-right: 42px;
        height: 36px;

        background: rgba(246, 248, 251, 1);
        border-radius: 3px;
        border: 1px solid rgba(239, 242, 247, 1);
      }
      .placeholder {
        color: #cfcfcf;
        font-weight: 400;
      }
      .error {
        position: absolute;
        bottom: -20px;
        left: 0px;
        color: #eb1c1d;
      }
      .close {
        width: 16px;
        height: 16px;

        position: absolute;
        right: 7px;
        top: 11px;
        display: inline-block;
      }
      .search {
        position: absolute;
        left: 9px;
        top: 11px;
        height: 16px;
        width: 16px;
      }

      .map-location {
        width: 15px;
        position: absolute;
        bottom: 13px;
        right: 11px;
      }

      .hospital-list {
        position: absolute;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 12px 1px rgba(240, 240, 240, 1);
        border-radius: 2px 2px 0px 0px;
        border: 1px solid rgba(235, 237, 240, 1);
        font-size: 15px;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
        max-height: 140px;
        overflow: auto;

        li {
          color: #999;
          padding: 10px 30px;

          /deep/ b {
            color: #3e9bf9;
          }

          & + li {
            border-top: 1px solid #efefef;
          }
        }
      }
    }
    .location-form-item {
      input {
        padding-right: 30px;
      }
    }
  }
  .dpt_list {
    padding: 0 24px;

    .dpt_list_title {
      font-size: 16px;
      color: #666;
      margin-bottom: 16px;
    }
    .dpt_list_tags {
      max-height: 50vh;
      .tag {
        position: relative;
        margin-right: 10px;
        display: inline-block;
        margin-bottom: 10px;
        .tag_name {
          height: 28px;
          line-height: 29px;
          padding: 0 14px;
          background: rgba(246, 248, 251, 1);
          color: #666;
          border-radius: 14px;
          border: 1px solid rgba(239, 242, 247, 1);
          &.on {
            border: 1px solid rgba(38, 136, 252, 1);
            color: rgba(38, 136, 252, 1);
            background: rgba(240, 247, 255, 1);
          }
        }
        .tag_del {
          position: absolute;
          background: url("../assets/img/icon/del_shape @2x.png");
          background-size: cover;
          width: 50px;
          height: 38px;
          top: -38px;
          left: 50%;
          color: #fff;
          font-size: 13px;
          line-height: 34px;
          text-align: center;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
