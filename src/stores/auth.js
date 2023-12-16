import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "primevue/usetoast";

export const useAuthStore = defineStore("auth", () => {

  const loading = ref(false);

  const base_url = import.meta.env.VITE_API_BASE_URL;
  const toast = useToast();

  const showToast = (severity, summary, detail) => {
    console.log(severity, summary, detail);
    toast.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };
  
  const login = (payload) => {
    // console.log(payload);
    loading.value = true;
    axios
      .post(`${base_url}/api/auth/login`, {
        grant_type: "password",
        client_id: 2,
        client_secret: "IPRahHhmqyyPHWw1eclDbcQc5TWsjK4yY9gr1US0",
        username: payload.email,
        password: payload.password,
        is_remember: 1,
      })
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK")
          showToast("success", "Success", "Successfully logged in!");
      })
      .catch((err) => {
        showToast("error", "Warning", err.message);
      })
      .finally(() => (loading.value = false));
  };

  return { loading, login, base_url };
});
