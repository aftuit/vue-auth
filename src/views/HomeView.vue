<template>
  <main>
    <div v-if="loading" class="mt-3 ml-2">
      <Skeleton class="mb-2 w-15rem h-2rem"></Skeleton>
      <Skeleton class="w-12rem h-2rem"></Skeleton>
    </div>
    <div v-else class="py-3">
      <h1 class="m-0">{{ profile?.username }}</h1>
      <p>{{ profile }}</p>
    </div>
  </main>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";

const auth = useAuthStore();
const loading = ref(false);

const { getProfile } = auth;
const profile = computed(() => auth.profile);

const getProfileDetails = () => {
  loading.value = true;
  getProfile().finally(() => (loading.value = false));
};

onMounted(() => {
  getProfileDetails();
});
</script>
