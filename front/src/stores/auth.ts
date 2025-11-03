import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  function setUser(newUser: any) {
    user.value = newUser
  }

  function setToken(newToken: string) {
    token.value = newToken
    // TODO: Save in localStorage or cookies
  }

  function clear() {
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, setUser, setToken, clear }
})
