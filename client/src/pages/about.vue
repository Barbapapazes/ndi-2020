<template>
  <section class="max-w-md m-auto">
    <div>{{ t('about.description') }}</div>
  </section>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
