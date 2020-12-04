<template>
  <header
    class="bg-blue-400 h-10 text-white flex justify-center items-center text-xl capitalize"
  >
    <div>{{ t('header.title') }}</div>
  </header>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
