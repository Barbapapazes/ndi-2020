<template>
  <header
    class="bg-blue-400 h-16 text-white flex justify-center items-center text-xl capitalize font-bold"
  >
    <span
      ><img src="/favicon.png" alt="logo de l'application" class="h-12"
    /></span>
    Wave Report | {{ t('header.title') }}
  </header>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
