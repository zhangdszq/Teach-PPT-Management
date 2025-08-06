<template>
  <aside class="w-64 bg-white border-r border-gray-200 h-full">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">设置</h3>
      
      <nav class="space-y-1">
        <button
          v-for="item in settingsItems"
          :key="item.id"
          @click="$emit('section-change', item.id)"
          :class="[
            'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
            activeSection === item.id
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          ]"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
          </svg>
          {{ item.name }}
        </button>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface SettingsItem {
  id: string
  name: string
  icon: string
}

defineProps<{
  activeSection: string
}>()

defineEmits<{
  'section-change': [section: string]
}>()

const settingsItems: SettingsItem[] = [
  {
    id: 'profile',
    name: '个人信息',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 'ai',
    name: 'AI设置',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    id: 'notifications',
    name: '通知设置',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
  },
  {
    id: 'security',
    name: '安全设置',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
  },
  {
    id: 'data',
    name: '数据管理',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
  },
  {
    id: 'about',
    name: '关于',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]
</script>

<style scoped>
/* 设置侧边栏样式 */
</style>