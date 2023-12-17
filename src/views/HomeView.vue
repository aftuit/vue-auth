<template>
  <main>
    <div v-if="!profile.username" class="mt-3 ml-2">
      <Skeleton class="mb-2 w-15rem h-2rem"></Skeleton>
      <Skeleton class="w-12rem h-2rem"></Skeleton>
    </div>
    <div v-else>
      <h1>{{profile.username}}</h1>
      <p>{{profile.role}}</p>
    </div>
  </main>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const auth = useAuthStore();

const { getProfile, profile } = auth;

onMounted(() => {
  getProfile();
});
</script>
