<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group pb-2">
        <label for="username" class="pr-2">{{ t('signup.username') }}</label>
        <input
          v-model="username"
          type="text"
          name="username"
          class="form-control dark:bg-black border dark:border-white p-1"
          :class="{ 'is-invalid': submitted && !username }"
          :placeholder="t('signup.username')"
        />
        <div v-show="submitted && !username" class="invalid-feedback">
          Username is required
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password" class="pr-2">{{
          t('signup.password')
        }}</label>
        <input
          v-model="password"
          type="password"
          name="password"
          class="form-control dark:bg-black border dark:border-white p-1"
          :class="{ 'is-invalid': submitted && !password }"
          :placeholder="t('signup.password')"
        />
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group flex justify-center mt-2">
        <button class="bg-blue-400 p-2 uppercase" type="submit">
          {{ t('signup.button') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const username = ref('')
const password = ref('')
const submitted = ref(false)

const { t } = useI18n()

const handleSubmit = function (e) {
  submitted.value = true
  console.log(password)
  fetch('http://localhost:4000/auth/register', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    method: 'post',
    body: {
      email: username.value,
      password: password.value,
    },
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.error(err)
  })
}
</script>
