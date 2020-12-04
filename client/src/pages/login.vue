<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group pb-2">
        <label for="username" class="pr-2">{{ t('login.username') }}</label>
        <input
          v-model="username"
          type="text"
          name="username"
          class="form-control dark:bg-black border dark:border-white p-1"
          :class="{ 'is-invalid': submitted && !username }"
          :placeholder="t('login.username')"
        />
        <div v-show="submitted && !username" class="invalid-feedback">
          Username is required
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password" class="pr-2">{{ t('login.password') }}</label>
        <input
          v-model="password"
          type="password"
          name="password"
          class="form-control dark:bg-black border dark:border-white p-1"
          :class="{ 'is-invalid': submitted && !password }"
          :placeholder="t('login.password')"
        />
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group flex justify-center mt-2">
        <button class="bg-blue-400 p-2 uppercase" :disabled="loggingIn">
          {{ t('login.button') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t } = useI18n()
    return {
      t,
    }
  },
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
    }
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn
    },
  },
  created() {
    // reset login status
    this.$store.dispatch('authentication/logout')
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true
      const { username, password } = this
      const { dispatch } = this.$store
      if (username && password)
        dispatch('authentication/login', { username, password })
    },
  },
}
</script>
