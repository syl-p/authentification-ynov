<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';
  import router from '@/router';

  const authStore = useAuthStore();
  const {user, isAuthenticated} = storeToRefs(authStore);

  onMounted(() => { // TODO: protect route with navigation guards
    if(!isAuthenticated.value) {
      console.log('User is not authenticated. Redirecting to login...');
      router.push('/login');
    }
  });
</script>

<template>
  <div class="about">
    <h1>Welcome {{ user?.username }} !</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
