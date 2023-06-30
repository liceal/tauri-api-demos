import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import App from "./App.vue";
import router from "./router";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

function useTable(app:any) {
  app.use(VXETable);
}

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(useTable);
app.mount("#app");
