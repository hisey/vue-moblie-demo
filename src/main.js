import Vue from "vue";
import App from "./App.vue";
import {
  router
} from "./router";
import "amfe-flexible";
import VueClipboard from "vue-clipboard2";
import BaiduMap from "vue-baidu-map";
import {
  ImagePreview
} from "vant";
import * as filters from "./filters";
import store from "./store";
import {
  Search,
  Toast,
  RadioGroup,
  Radio,
  Picker,
  Field,
  Popup,
  Area,
} from "vant";
import {
  Image
} from "vant";
import {
  Loading
} from "vant";
import "@/assets/css/common.css";

Vue.use(Loading);
Vue.use(Image);
Vue.use(Toast);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Area);
Vue.config.productionTip = false;
Vue.use(BaiduMap, {
  ak: ""
});
Vue.use(ImagePreview);
Vue.use(VueClipboard);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
