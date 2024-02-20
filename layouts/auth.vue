<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const title = route.meta.title === undefined ? '' : ` ${route.meta.title}`
useHead({
  title: `${title} - Speed`,
  meta: [
    {
      name: "description",
      content: " Speed is a software development company based in Rwanda that specializes in delivering tailored solutions to meet your specific business requirements."
    }
  ]
});
</script>

<style></style>