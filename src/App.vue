<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'

const workspaceStore = useWorkspaceStore()

// 初始化工作空间
onMounted(() => {
  workspaceStore.initialize()
})
</script>

<style scoped>
/* App组件样式 */
</style>