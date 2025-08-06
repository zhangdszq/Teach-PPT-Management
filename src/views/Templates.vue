<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 主内容区域 -->
    <main class="ml-64">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <div class="flex items-center space-x-4 mb-2">
              <h2 class="text-2xl font-bold text-gray-900">模板管理</h2>
              <!-- 工作空间选择器 -->
              <div class="relative">
                <select 
                  v-model="selectedWorkspaceId" 
                  @change="handleWorkspaceChange"
                  class="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>选择工作空间</option>
                  <option 
                    v-for="workspace in workspaces" 
                    :key="workspace.id" 
                    :value="workspace.id"
                  >
                    {{ workspace.name }}
                  </option>
                </select>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              {{ currentWorkspaceName }} - 管理和创建PPT模板
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              + 新建模板
            </button>
          </div>
        </div>
      </header>

      <!-- 模板内容 -->
      <div class="p-6">
        <!-- 模板网格 -->
        <div v-if="templates.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- 动态模板卡片 -->
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div :class="`aspect-video bg-gradient-to-br ${template.thumbnail} flex items-center justify-center`">
              <span class="text-white text-lg font-medium">{{ template.category }}</span>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-900 mb-1">{{ template.name }}</h3>
              <p class="text-sm text-gray-600 mb-3">{{ template.description }}</p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span 
                  v-for="tag in template.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ template.pages }}页</span>
                <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  使用模板
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📄</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无模板</h3>
          <p class="text-gray-600 mb-4">当前工作空间还没有模板，创建第一个模板吧！</p>
          <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            创建模板
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import Sidebar from '@/components/Sidebar.vue'

// 定义接口
interface Template {
  id: string
  name: string
  description: string
  category: string
  pages: number
  workspaceId: string
  createdAt: string
  thumbnail: string
  tags: string[]
}

// 工作空间store
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(currentWorkspace?.id || '')

// 所有模板数据（包含工作空间信息）
const allTemplates = ref<Template[]>([
  {
    id: '1',
    name: '英语语法演示模板',
    description: '适用于英语语法讲解和演示',
    category: '教育',
    pages: 15,
    workspaceId: '1', // 英语教学工作空间
    createdAt: '2024-01-15',
    thumbnail: 'from-blue-500 to-purple-600',
    tags: ['英语', '语法', '教学']
  },
  {
    id: '2',
    name: '英语词汇教学模板',
    description: '英语词汇展示和练习模板',
    category: '教育',
    pages: 12,
    workspaceId: '1',
    createdAt: '2024-01-16',
    thumbnail: 'from-green-500 to-blue-600',
    tags: ['英语', '词汇', '练习']
  },
  {
    id: '3',
    name: '物理实验报告模板',
    description: '标准化物理实验报告模板',
    category: '科学',
    pages: 18,
    workspaceId: '2', // 物理实验室
    createdAt: '2024-01-17',
    thumbnail: 'from-red-500 to-orange-600',
    tags: ['物理', '实验', '报告']
  },
  {
    id: '4',
    name: '力学原理演示',
    description: '力学概念和原理演示模板',
    category: '科学',
    pages: 20,
    workspaceId: '2',
    createdAt: '2024-01-18',
    thumbnail: 'from-purple-500 to-pink-600',
    tags: ['力学', '原理', '演示']
  },
  {
    id: '5',
    name: '古诗词赏析模板',
    description: '古诗词教学和赏析专用模板',
    category: '文学',
    pages: 16,
    workspaceId: '3', // 语文课程组
    createdAt: '2024-01-19',
    thumbnail: 'from-yellow-500 to-red-600',
    tags: ['古诗词', '文学', '赏析']
  },
  {
    id: '6',
    name: '现代文阅读模板',
    description: '现代文阅读理解教学模板',
    category: '文学',
    pages: 14,
    workspaceId: '3',
    createdAt: '2024-01-20',
    thumbnail: 'from-teal-500 to-green-600',
    tags: ['现代文', '阅读', '理解']
  },
  {
    id: '7',
    name: '统计图表模板',
    description: '数据统计和图表展示模板',
    category: '数据',
    pages: 10,
    workspaceId: '1',
    createdAt: '2024-01-21',
    thumbnail: 'from-indigo-500 to-purple-600',
    tags: ['统计', '图表', '数据']
  }
])

// 根据当前工作空间过滤模板
const templates = computed(() => {
  if (!currentWorkspace) return []
  return allTemplates.value.filter(template => template.workspaceId === currentWorkspace.id)
})

// 方法
const handleWorkspaceChange = () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
  }
}

// 监听当前工作空间变化，更新选择器
computed(() => {
  if (currentWorkspace) {
    selectedWorkspaceId.value = currentWorkspace.id
  }
})
</script>

<style scoped>
/* 模板管理页面样式 */
</style>