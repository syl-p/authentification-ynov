<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';
  const authStore = useAuthStore();

  onMounted(() => {
    // TODO: if key is persisted in localstorage or cookies get /me
  });
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard">dashboard</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
