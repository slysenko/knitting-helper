import { createApp } from "vue";
import "./style.css";
// import "./style.old.css";
import { router } from "./router.ts";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount("#app");
