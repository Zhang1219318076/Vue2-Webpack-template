import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import baseUI from "./components/index";
import "lib-flexible/flexible";
import "./styles/index.less";
import "vant/lib/index.css";

Vue.use(Vant).use(baseUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
