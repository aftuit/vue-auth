import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/service/axios";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import utils from "./index";

export const useAuthStore = defineStore("auth", () => {
  const loading = ref(false);

  let profile = ref(null);

  const [base_url] = utils;

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
    return new Promise((resolve, reject) => {
      axios
        .post(`${base_url}/api/auth/login`, {
          grant_type: "password",
          client_id: 2,
          client_secret: "IPRahHhmqyyPHWw1eclDbcQc5TWsjK4yY9gr1US0",
          username: payload.email.value,
          password: payload.password.value,
          is_remember: 1,
        })
        .then((res) => {
          if (res.statusText === "OK")
            showToast("success", "Success", "Successfully logged in!");
          localStorage.setItem("access_token", res.data.access_token);
          router.push({ name: "home" });
          resolve(res);
        })
        .catch((err) => {
          showToast("error", "Warning", err.message);
          reject(err);
        });
    });
  };

  const getProfile = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base_url}/api/master/user/profile`)
        .then((res) => {
          profile.value = res.data.data;
          resolve();
        })
        .catch((err) => {
          console.log(err);
          showToast("error", "Warning", err.message);
          if (err.response.status === 401) {
            router.push({ name: "login" });
          }
          reject();
        });
    });
  };

  return { loading, login, base_url, getProfile, profile };
});
