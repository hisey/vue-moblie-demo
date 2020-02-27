<template>
  <div class="upload-icon-box" :style="styleObj">
    <div class="img-box" v-if="value&&value!=''" :style="styleObj">
      <!-- <img class="pic-self" :src="value"  alt :style="{height:height}" /> -->
      <van-image class="pic-self" :style="styleObj" fit="contain" @click="showPreview = true" :src="value">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
      <van-loading v-if="loading" type="spinner" size="20" :style="{'line-height': height / 37.5 + 'rem'}" />
      <img class="del-btn" @click="handleDel" src="@/assets/img/icon/pic_del_btn.png" alt />
    </div>
    <div v-else class="upload-box" :style="styleObj">
      <input :style="styleObj" type="file" :name="name" accept="image/*" class="input-file" :ref="`input${name}`"
        @change="handleChange($event)" />
      <img class="upload-icon" src="@/assets/img/icon/upload_btn.png" alt />
      <span class="upload-text">{{word}}</span>
    </div>
    <van-image-preview v-model="showPreview" :images="images">
      <template v-slot:index>第{{ index+1 }}页</template>
    </van-image-preview>
    <van-dialog v-model="showDialog" title="图片过大" confirm-button-text="知道了" :message="`您选择的图片过大，请选择小于${maxSize}M的图片`">
    </van-dialog>
  </div>
</template>
<script>
let lrz = require("lrz");
import {
  Dialog
} from "vant";
import {
  Toast
} from "vant";
import {
  API_URL
} from "@/config";
import axios from "axios";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    value: String,
    name: {
      type: [String, Number],
      default: ""
    },

    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    word: {
      type: String,
      default: ""
    },
    maxSize: {
      type: Number,
      default: 8
    },
    action: {
      type: String,
      default: `${API_URL}/file/uploadImg`
    }
  },
  data() {
    return {
      showDialog: false,
      showPreview: false,
      index: 0,
      loading: false
    };
  },
  computed: {
    images() {
      return [this.value];
    },
    styleObj() {
      return {
        width: this.width / 37.5 + "rem",
        height: this.height / 37.5 + "rem"
      };
    }
  },
  methods: {
    handleChange(e) {
      let file = e.target.files[0];
      this.$refs[`input${this.name}`].value = "";
      if (file) {
        const isLtMaxSize = file.size / 1024 / 1024 < this.maxSize;
        if (!isLtMaxSize) {
          this.showDialog = true;
          return false;
        } else {
          lrz(file, {
            quality: 0.3,
            width: 800
          })
            .then(rst => {
              let blob = rst.file;
              this.handleUpload(blob);
            })
            .catch(err => {
              // 处理失败会执行
              Toast(err);
            })
            .always(() => {
              // 不管是成功失败，都会执行
            });
        }
      }
    },
    handleUpload(file) {
      this.loading = true;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
        //提交到服务器
      var fd = new FormData();
      fd.append("file", file);
      axios.post(this.action, fd, config).then(res => {
        this.loading = false;
        if (res.status == 200) {
          this.$emit("input", res.data.data.url);
        } else {
          Toast(res.message);
        }
      });
    },
    handleDel() {
      this.$emit("input", "");
    }
  }
};

</script>

<style lang="less" scoped>
  .upload-icon-box {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background: rgba(246, 248, 251, 1);
    border-radius: 4px;
    position: relative;

    .input-file {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      // z-index: 2;
    }

    .upload-icon {
      width: 24px;
      margin: 0 auto;
    }

    .upload-text {
      display: block;
      margin-top: 6px;
      font-size: 12px;
      color: #cfcfcf;
    }

    .upload-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 4px;
      border: 1px dashed rgba(214, 214, 214, 1);
    }

    .img-box {
      border: 2px solid rgba(214, 214, 214, 1);
      border-radius: 4px;
      position: relative;

      // overflow: hidden;
      .pic-self {
        // width: 102px;
        height: 136px;
        max-width: 136px;
        display: block;
        margin: 0 auto;
      }

      .del-btn {
        position: absolute;
        right: -2px;
        top: -2px;
        width: 24px;
        height: 24px;
      }
    }
  }

</style>
