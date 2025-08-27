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
              <h2 class="text-2xl font-bold text-gray-900">仪表板</h2>
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
              {{ currentWorkspaceName }} - 欢迎使用PPT生成管理平台
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link 
              to="/create"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + 新建PPT
            </router-link>
            
            <div class="relative">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <img src="https://s.vipkidstatic.com/fe-static/temp/rudy.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover" />
                <span class="text-sm font-medium">用户</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- 仪表板内容 -->
      <div class="p-6">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">工作空间</p>
                <p class="text-2xl font-bold text-gray-900">{{ workspaces.length }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">教材数量</p>
                <p class="text-2xl font-bold text-gray-900">{{ currentWorkspaceStats.textbooks }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">PPT数量</p>
                <p class="text-2xl font-bold text-gray-900">{{ currentWorkspaceStats.ppts }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">模板数量</p>
                <p class="text-2xl font-bold text-gray-900">{{ currentWorkspaceStats.templates }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">资源数量</p>
                <p class="text-2xl font-bold text-gray-900">{{ currentWorkspaceStats.resources }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近项目 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">最近项目</h3>
              <router-link 
                to="/ppt-management" 
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                查看全部
              </router-link>
            </div>
          </div>
          
          <div class="p-6">
            <div v-if="recentProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="project in recentProjects" 
                :key="project.id"
                class="group cursor-pointer"
                @click="openProject(project)"
              >
                <div :class="`aspect-video ${project.thumbnail} rounded-lg mb-3 flex items-center justify-center group-hover:opacity-80 transition-opacity`">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h4 class="font-medium text-gray-900 mb-1">{{ project.name }}</h4>
                <p class="text-sm text-gray-600 mb-1">{{ project.subject }} · {{ project.chapter }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{{ project.slides }}页</span>
                  <span>{{ formatToBeijingTimeShort(project.createdAt) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="text-center py-12">
              <div class="text-gray-400 text-6xl mb-4">📄</div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
              <p class="text-gray-600 mb-4">当前工作空间还没有PPT项目，创建第一个吧！</p>
              <router-link 
                to="/create"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                创建PPT
              </router-link>
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
import { useRouter } from 'vue-router'
import type { Project } from '@/api/types'
import { getWorkspaceStats, getPptList } from '@/api/templateManagement'
import { formatToBeijingTimeShort } from '@/utils/dateUtils'
import Sidebar from '@/components/Sidebar.vue'

interface WorkspaceStats {
  textbooks: number
  ppts: number
  templates: number
  resources: number
}

// 路由和工作空间store
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(workspaceStore.currentWorkspaceId || '1')
const loading = ref(false)
const recentProjects = ref<Project[]>([])
const currentWorkspaceStats = ref<WorkspaceStats>({
  textbooks: 0,
  ppts: 0,
  templates: 0,
  resources: 0
})

// 加载工作空间数据
const loadWorkspaceData = async (workspaceId: string) => {
  try {
    loading.value = true
    
    // 获取PPT列表数据
    const pptResponse = await getPptList({
      workspaceId: workspaceId,
      page: 1,
      size: 10,
      status: 'all'
    })
    
    if (pptResponse.success && pptResponse.data) {
        // 将PPT数据转换为Project格式
        const pptList = Array.isArray(pptResponse.data) ? pptResponse.data : []
        recentProjects.value = pptList.slice(0, 6).map(ppt => ({
          id: ppt.id?.toString() || ppt.pptId,
          name: ppt.title || ppt.name || '未命名PPT',
          subject: ppt.subject || '未知科目',
          chapter: ppt.chapter || '未知章节',
          slides: ppt.slideCount || ppt.slides || 0,
          createdAt: ppt.createTime || ppt.createdAt || new Date().toISOString(),
          workspaceId: ppt.workspaceId || currentWorkspace?.id || '',
          thumbnail: ppt.thumbnail || 'bg-gradient-to-br from-blue-500 to-purple-600',
          status: (ppt.status === 'draft' || ppt.status === 'published' || ppt.status === 'archived') ? ppt.status : 'draft'
        }))
      } else {
        recentProjects.value = []
      }
    
    // 获取工作区统计数据
    const statsResponse = await getWorkspaceStats(workspaceId)
    
    // 使用真实的API数据
    if (statsResponse.success && statsResponse.data) {
      currentWorkspaceStats.value = {
        textbooks: statsResponse.data.textbooks,
        ppts: statsResponse.data.ppts,
        templates: statsResponse.data.templates,
        resources: statsResponse.data.resources
      }
    } else {
      // 如果API调用失败，使用默认值
      currentWorkspaceStats.value = {
        textbooks: 0,
        ppts: recentProjects.value.length,
        templates: 0,
        resources: 0
      }
    }
  } catch (error) {
    console.error('加载工作空间数据失败:', error)
    // 错误时使用默认值
    currentWorkspaceStats.value = {
      textbooks: 0,
      ppts: 0,
      templates: 0,
      resources: 0
    }
  } finally {
    loading.value = false
  }
}

// 方法
const handleWorkspaceChange = async () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
    await loadWorkspaceData(selectedWorkspaceId.value)
  }
}

const openProject = (project: Project) => {
  // 这里可以跳转到PPT编辑器或详情页
  console.log('打开项目:', project)
  // router.push(`/editor/${project.id}`)
}

// 生命周期
onMounted(async () => {
  await workspaceStore.initialize()
  selectedWorkspaceId.value = workspaceStore.currentWorkspaceId
  await loadWorkspaceData(selectedWorkspaceId.value)
})

// 监听当前工作空间变化，更新选择器
computed(() => {
  if (currentWorkspace) {
    selectedWorkspaceId.value = currentWorkspace.id
  }
})
</script>

<style scoped>
/* 仪表板页面样式 */
</style>