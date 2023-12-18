<template>
  <div class="flex justify-content-center surface-200 h-screen">
    <div
      class="surface-0 p-3 w-full border-1 border-200 h-screen flex flex-column justify-content-between"
      @submit.prevent="login"
    >
      <div>
        <img :src="logo" alt="" class="my-4 mx-auto block" />

        <h2 class="text-xl text-center">Добро пожаловать!</h2>

        <div class="mt-4">
          <label for="email" class="block">Логин</label>
          <InputText
            id="email"
            class="mt-1 w-full"
            placeholder="Введите логин"
            v-model="email"
          />
          <small
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="text-red-500"
          >
            {{ error.$message }}</small
          >
        </div>

        <div class="mt-4">
          <label for="password" class="block">Пароль</label>
          <span class="p-input-icon-right w-full flex align-items-center">
            <Password
              v-model="password"
              class="mt-1 w-full"
              inputClass="w-full"
              :feedback="false"
              toggleMask
              inputId="password"
              placeholder="Введите пароль"
            />
          </span>
          <small
            v-for="error in v$.password.$errors"
            :key="error.$uid"
            class="text-red-500"
          >
            {{ error.$message }}</small
          >
        </div>
        <p class="text-blue-500 cursor-pointer hover:underline w-fit">
          Забыли пароль?
        </p>
      </div>
      <div class="py-2 w-auto">
        <Button
          class="w-full"
          type="button"
          :severity="v$.$invalid ? 'secondary' : 'success'"
          label="Авторизоваться"
          :loading="loading"
          @click="loginHandler"
        />
        <!-- :disabled="v$.$invalid" -->

        <p class="text-center text-500">
          Нет аккаунта?
          <router-link to="/register" class="text-blue-500"
            >Зарегистрироваться</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default { name: "login" };
</script>

<script setup>
import logo from "@/assets/icons/logo.svg";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "@/stores/auth";

import { required, email as vuelidateEmail } from "@vuelidate/validators";
//
import { computed, ref } from "vue";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errors = ref(null);

const auth = useAuthStore();

const { login } = auth;

console.log(loading);

const rules = computed(() => ({
  email: { required, vuelidateEmail },
  password: { required },
}));

const loginHandler = () => {
  loading.value = true;
  v$.value.$validate().then(() => {
    login({ email, password }).finally(() => {
      loading.value = false;
    });
  });
};

const v$ = useVuelidate(rules, { email, password });
</script>
