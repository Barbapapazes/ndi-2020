<template>
  <div class="text-xl mt-6 flex justify-center pb-2">
    <router-link class="icon-btn mx-2" to="/">
      <Icon icon="carbon:sailboat-offshore" class="inline-block" />
    </router-link>

    <div class="icon-btn mx-2" @click="isDark = !isDark">
      <Icon
        :icon="isDark ? 'carbon:moon' : 'carbon:sun'"
        class="inline-block"
      />
    </div>

    <div class="icon-btn mx-2" @click="toggleLocales">
      <Icon icon="carbon:language" class="inline-block" />
    </div>

    <router-link class="icon-btn mx-2" to="/about">
      <Icon icon="carbon:dicom-overlay" class="inline-block" />
    </router-link>

    <router-link class="icon-btn mx-2" to="/signup">
      <Icon icon="carbon:user-follow" class="inline-block" />
    </router-link>

    <router-link class="icon-btn mx-2" to="/login">
      <Icon icon="carbon:login" class="inline-block" />
    </router-link>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { locales } from '/~/messages'
import { isDark } from '/~/logics'

const i18n = useI18n()

const toggleLocales = () => {
  // change to some real logic
  i18n.locale.value = locales[(locales.indexOf(i18n.locale.value) + 1) % locales.length]
}
</script>
