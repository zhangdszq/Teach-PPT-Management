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
              <h2 class="text-2xl font-bold text-gray-900">资源库</h2>
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
              {{ currentWorkspaceName }} - 管理您的PPT资源和素材
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索资源..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              + 上传资源
            </button>
          </div>
        </div>
      </header>

      <!-- 资源库内容 -->
      <div class="p-6">
        <!-- 筛选器 -->
        <div class="flex items-center space-x-4 mb-6">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">类型:</label>
            <select 
              v-model="selectedType"
              class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">全部</option>
              <option value="template">模板</option>
              <option value="image">图片</option>
              <option value="video">视频</option>
              <option value="document">文档</option>
              <option value="workflow">工作流</option>
              <option value="code">代码</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">排序:</label>
            <select 
              v-model="sortBy"
              class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="time">编辑时间</option>
              <option value="name">名称</option>
              <option value="size">大小</option>
            </select>
          </div>
        </div>

        <!-- 资源列表 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">资源</h3>
              <div class="flex items-center space-x-2">
                <button class="p-2 text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                </button>
                <button class="p-2 text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="resources.length > 0" class="divide-y divide-gray-200">
            <!-- 资源项目 -->
            <div 
              v-for="resource in resources" 
              :key="resource.id"
              class="px-6 py-4 hover:bg-gray-50 cursor-pointer"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="getTypeColor(resource.type).replace('text-', 'bg-').replace('-800', '-100')">
                      <svg class="w-6 h-6" :class="getTypeColor(resource.type).replace('bg-', 'text-').replace('-100', '-600')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTypeIcon(resource.type)"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ resource.name }}</h4>
                    <p class="text-sm text-gray-500">{{ resource.type === 'template' ? '模板' : resource.type === 'image' ? '图片' : resource.type === 'video' ? '视频' : resource.type === 'document' ? '文档' : resource.type === 'workflow' ? '工作流' : '代码' }} • {{ resource.createdAt }}</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getTypeColor(resource.type)">
                    {{ resource.type === 'template' ? '模板' : resource.type === 'image' ? '图片' : resource.type === 'video' ? '视频' : resource.type === 'document' ? '文档' : resource.type === 'workflow' ? '工作流' : '代码' }}
                  </span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">暂无资源</h3>
            <p class="mt-1 text-sm text-gray-500">当前工作空间中还没有任何资源</p>
            <div class="mt-6">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                + 上传第一个资源
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { mockAPI, type Resource } from '@/api/mock'
import Sidebar from '@/components/Sidebar.vue'

// 工作空间store
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(currentWorkspace?.id || '')
const searchQuery = ref('')
const selectedType = ref('all')
const sortBy = ref('time')

// 响应式数据
const loading = ref(false)
const allResources = ref<Resource[]>([])

// 根据当前工作空间过滤资源
const resources = computed(() => {
  if (!currentWorkspace) return []
  let filtered = allResources.value.filter(resource => resource.workspaceId === currentWorkspace.id)
  
  // 按类型过滤
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(resource => resource.type === selectedType.value)
  }
  
  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(resource => 
      resource.name.toLowerCase().includes(query)
    )
  }
  
  // 排序
  if (sortBy.value === 'time') {
    filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
  } else if (sortBy.value === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'size') {
    filtered.sort((a, b) => parseFloat(b.size) - parseFloat(a.size))
  }
  
  return filtered
})

// 方法已在下方重新定义

const getTypeIcon = (type: string) => {
  const icons = {
    code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    workflow: 'M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m5 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-5 4h6',
    template: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    video: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
  return icons[type] || icons.document
}

const getTypeColor = (type: string) => {
  const colors = {
    code: 'bg-blue-100 text-blue-800',
    workflow: 'bg-purple-100 text-purple-800',
    template: 'bg-green-100 text-green-800',
    image: 'bg-yellow-100 text-yellow-800',
    video: 'bg-red-100 text-red-800',
    document: 'bg-gray-100 text-gray-800'
  }
  return colors[type] || colors.document
}

// 加载资源数据
const loadResources = async () => {
  if (!currentWorkspace) return
  
  loading.value = true
  try {
    allResources.value = await mockAPI.getResourcesByWorkspace(currentWorkspace.id)
  } catch (error) {
    console.error('加载资源失败:', error)
  } finally {
    loading.value = false
  }
}

// 处理工作空间切换
const handleWorkspaceChange = async () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
    await loadResources()
  }
}

// 生命周期
onMounted(async () => {
  await workspaceStore.initialize()
  selectedWorkspaceId.value = workspaceStore.currentWorkspaceId
  await loadResources()
})

// 监听当前工作空间变化，更新选择器
computed(() => {
  if (currentWorkspace) {
    selectedWorkspaceId.value = currentWorkspace.id
  }
})
</script>

<style scoped>
/* 资源库页面样式 */
</style>