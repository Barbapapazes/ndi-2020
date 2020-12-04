<template>
  <section class="px-2">
    <div class="mx-auto max-w-md mb-2 md:text-lg">
      {{ t('about.description') }}
    </div>
    <h2 class="text-2xl font-bold mb-2">
      {{ t('about.video') }}
    </h2>
    <div class="container mx-auto">
      <iframe
        class="video"
        src="https://www.youtube.com/embed/NEDXZri0veU"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </section>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
