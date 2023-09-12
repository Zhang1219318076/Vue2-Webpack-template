import NavBar from "../components/navbar-comp/index.vue";
import Steps from "../components/steps-comp/index.vue";

const component = [NavBar, Steps];
const comp = {
  install(Vue) {
    component.forEach((comp) => {
      Vue.component("base" + comp.name, comp);
    });
  },
};

export default comp;
