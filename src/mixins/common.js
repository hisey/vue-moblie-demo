import {
  SUB_FIX,
  APP_URL
} from "@/config";
const commonMixin = {
  data() {
    return {
      APP_URL,
      SUB_FIX,
    };
  },
  methods: {
    router_back() {
      if (window.history.length <= 1) {
        this.$router.push({
          name: "Index"
        });
      } else {
        this.$router.back(-1);
      }
    },
    //限制文字显示字数
    limit: function (val, param, subfix) {
      let result = val;
      if (result && result.length > param) {
        result = result.substring(0, param);
        if (subfix != undefined) {
          result += subfix;
        } else {
          result += "...";
        }
      }
      return result;
    },
    removeHtmlTag: function (val) {
      return val.replace(/<[^>]+>/g, "");
    }
  },
  filters: {
    //时间戳转换为时间 yy-mm-dd ss
    dateFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    //移除文本中的html
    removeHtmlTag(val) {
      // let result = utils.replaceHtmlTag(val);
      // return result;
      return val.replace(/<[^>]+>/g, "");
    },
  }
};

export default commonMixin;
