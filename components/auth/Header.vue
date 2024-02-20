<template>
  <div>
    <UButton @click="toggleDarkMode($colorMode.preference === 'dark' ? 'light' : 'dark')" class="m-5" size="lg"
      variant="outline" :label="$colorMode.preference === 'dark' ? 'Light' : 'Dark'">
      <template #leading>
        <UIcon v-if="$colorMode.preference === 'light'" name="i-heroicons-moon-16-solid" />
        <UIcon size="lg" v-else name="i-heroicons-sun-solid" />

      </template>
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
console.log(colorMode.preference)

function toggleDarkMode(theme: any) {
  useColorMode().preference = theme
}
</script>

<style></style>