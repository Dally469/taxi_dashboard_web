<template>
  <UContainer>
    <div>Dashboard</div>
  </UContainer>
</template>
<script setup lang="ts">
import { useProjectStore } from "~/stores/projects/project";

definePageMeta({
  layout: "admin",
  title: "Dashboard",
  middleware: "auth",
})

const store = useProjectStore();
const project = computed(() => {
  return store.activeProject;
});



onMounted(() => {
  useProjectStore()
})
</script>