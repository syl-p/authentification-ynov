<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
import router from '@/router';
  const authStore = useAuthStore();

  const username = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    // Handle login logic here
    console.log('Form submitted');
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        authStore.setUser(data.user);
        authStore.setToken(data.token);
        console.log('User logged in:', authStore.user.value);

        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
</script>
<template>
  <div class="login">
    <h1>Login Page</h1>
    <form method="POST" @submit.prevent="handleSubmit()">
      <input name="username" placeholder="Nom d'utilisateur"
      required v-model="username" />
      <input type="password" name="password" placeholder="Mot de passe"
      required v-model="password"/>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>
