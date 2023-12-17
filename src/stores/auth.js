import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

// import AuthService from "@/service/auth";

export const useAuthStore = defineStore("auth", () => {
  const loading = ref(false);

  let profile = reactive({
    username: "",
    role: "",
  });

  const base_url = import.meta.env.VITE_API_BASE_URL;
  const toast = useToast();
  const router = useRouter();
  const showToast = (severity, summary, detail) => {
    console.log(severity, summary, detail);
    toast.add({
      severity,
      summary,
      detail,
      life: 3000,
      position: "bottom-right",
    });
  };

  const login = (payload) => {
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
        localStorage.setItem("access_token", res.data.access_token);
        router.push({ name: "home" });
      })
      .catch((err) => {
        showToast("error", "Warning", err.message);
      })
      .finally(() => (loading.value = false));
  };

  const getProfile = () => {
    loading.value = true;
    axios
      .get(`${base_url}/api/master/user/profile`, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        profile.username = res.data.data.username;
        profile.role = res.data.data.roles[3];
      })
      .catch((err) => {
        console.log(err);
        showToast("error", "Warning", err.message);
      })
      .finally(() => (loading.value = false));
  };

  return { loading, login, base_url, getProfile, profile };
});
