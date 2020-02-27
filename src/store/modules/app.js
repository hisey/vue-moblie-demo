var storeStorage = require("store");
import {
  UPDATA_USER_INFO,
  UPDATA_LOADING,
  UPDATA_COMTY_INFO
} from "../mutation-types.js";
// import register from "@/services/register";

const app = {
  state: {
    userInfo: storeStorage.get("userInfo"),
    comtyInfo: storeStorage.get("comtyInfo"),
    loading: false
  },
  mutations: {
    [UPDATA_USER_INFO](state, userInfo) {
      state.userInfo = userInfo;
      storeStorage.set("userInfo", userInfo);
    },
    [UPDATA_COMTY_INFO](state, comtyInfo) {
      state.comtyInfo = comtyInfo;
      storeStorage.set("comtyInfo", comtyInfo);
    },
    [UPDATA_LOADING](state, loading) {
      state.loading = loading;
    }
  },
  // actions: {
  //   UPDATE_USERINFO({
  //     commit,
  //   }, user) {
  //     return register.userInfo({
  //       uid: user.uid,
  //       userId: user.id || user.userId
  //     }).then(res => {
  //       if (res.status == 200 && res.data) {
  //         let userInfo = res.data;
  //         commit(UPDATA_USER_INFO, userInfo);
  //         return userInfo;
  //       }
  //     });
  //   }
  // }
};

export default app;
