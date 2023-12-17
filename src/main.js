
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import App from "./App.vue";
import router from "./router";
import primeComponents from "@/prime";

import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);
primeComponents.map((prime) => app.component(prime.name, prime));

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

app.mount("#app");
