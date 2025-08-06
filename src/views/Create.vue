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
            <h2 class="text-2xl font-bold text-gray-900">创建PPT</h2>
            <p class="text-sm text-gray-600">在 {{ currentWorkspaceName }} 中使用AI快速生成专业PPT</p>
          </div>
          
          <!-- 工作空间选择器 -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">工作空间:</label>
              <select 
                v-model="selectedWorkspaceId" 
                @change="handleWorkspaceChange"
                class="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">
                  {{ workspace.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <!-- 创建PPT内容 -->
      <div class="p-6">
        <div class="max-w-4xl mx-auto">
          <!-- 创建方式选择 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">选择创建方式</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors">
                <div class="text-center">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 mb-2">AI智能生成</h4>
                  <p class="text-sm text-gray-600">输入主题，AI自动生成完整PPT</p>
                </div>
              </div>
              
              <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors">
                <div class="text-center">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 mb-2">模板创建</h4>
                  <p class="text-sm text-gray-600">选择模板快速开始创建</p>
                </div>
              </div>
              
              <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors">
                <div class="text-center">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 mb-2">空白创建</h4>
                  <p class="text-sm text-gray-600">从空白页面开始自由创作</p>
                </div>
              </div>
            </div>
          </div>

          <!-- AI生成表单 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">AI智能生成设置</h3>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">PPT主题</label>
                <input
                  v-model="formData.topic"
                  type="text"
                  placeholder="请输入PPT主题，如：产品发布会、市场分析报告等"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">页数</label>
                  <select v-model="formData.pages" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="10">10页</option>
                    <option value="15">15页</option>
                    <option value="20">20页</option>
                    <option value="25">25页</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">风格</label>
                  <select v-model="formData.style" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="business">商务风格</option>
                    <option value="creative">创意风格</option>
                    <option value="minimal">简约风格</option>
                    <option value="tech">科技风格</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">详细描述（可选）</label>
                <textarea
                  v-model="formData.description"
                  rows="4"
                  placeholder="请详细描述PPT的内容要求、目标受众、使用场景等"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input v-model="formData.includeCharts" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-sm text-gray-700">包含图表</span>
                </label>
                
                <label class="flex items-center">
                  <input v-model="formData.includeImages" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-sm text-gray-700">包含图片</span>
                </label>
                
                <label class="flex items-center">
                  <input v-model="formData.includeAnimations" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-sm text-gray-700">包含动画</span>
                </label>
              </div>
              
              <div class="flex justify-end space-x-4">
                <button @click="resetForm" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  重置
                </button>
                <button @click="generatePPT" :disabled="!formData.topic || isGenerating" class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ isGenerating ? '生成中...' : '开始生成' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { useRouter } from 'vue-router'
import { mockAPI } from '@/api/mock'
import Sidebar from '@/components/Sidebar.vue'

// 定义接口
interface CreateFormData {
  topic: string
  pages: string
  style: string
  description: string
  includeCharts: boolean
  includeImages: boolean
  includeAnimations: boolean
}

interface GeneratedPPT {
  id: string
  name: string
  subject: string
  chapter: string
  slides: number
  createdAt: string
  workspaceId: string
  thumbnail: string
}

// 路由和工作空间store
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(currentWorkspace?.id || '')
const isGenerating = ref(false)

// 表单数据
const formData = reactive<CreateFormData>({
  topic: '',
  pages: '15',
  style: 'business',
  description: '',
  includeCharts: false,
  includeImages: true,
  includeAnimations: false
})

// 方法
const handleWorkspaceChange = () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
  }
}

const resetForm = () => {
  formData.topic = ''
  formData.pages = '15'
  formData.style = 'business'
  formData.description = ''
  formData.includeCharts = false
  formData.includeImages = true
  formData.includeAnimations = false
}

const generatePPT = async () => {
  if (!formData.topic.trim()) {
    alert('请输入PPT主题')
    return
  }
  
  isGenerating.value = true
  
  try {
    // 创建PPT项目数据
    const projectData = {
      name: formData.topic,
      subject: getSubjectFromWorkspace(selectedWorkspaceId.value),
      chapter: formData.description || '自动生成',
      slides: parseInt(formData.pages),
      createdAt: new Date().toISOString().split('T')[0],
      workspaceId: selectedWorkspaceId.value,
      thumbnail: getThumbnailByStyle(formData.style),
      status: 'draft' as const
    }
    
    // 调用API创建项目
    const generatedPPT = await mockAPI.createProject(projectData)
    
    console.log('生成的PPT:', generatedPPT)
    alert('PPT生成成功！')
    
    // 重置表单
    resetForm()
    
    // 跳转到仪表板
    router.push('/')
    
  } catch (error) {
    console.error('生成PPT失败:', error)
    alert('生成PPT失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

// 辅助函数
const getSubjectFromWorkspace = (workspaceId: string): string => {
  const subjectMap: Record<string, string> = {
    '1': '英语',
    '2': '物理',
    '3': '语文'
  }
  return subjectMap[workspaceId] || '通用'
}

const getThumbnailByStyle = (style: string): string => {
  const thumbnailMap: Record<string, string> = {
    'business': 'bg-gradient-to-br from-blue-500 to-indigo-600',
    'creative': 'bg-gradient-to-br from-purple-500 to-pink-600',
    'minimal': 'bg-gradient-to-br from-gray-500 to-gray-600',
    'tech': 'bg-gradient-to-br from-green-500 to-teal-600'
  }
  return thumbnailMap[style] || 'bg-gradient-to-br from-blue-500 to-purple-600'
}

// 生命周期
onMounted(async () => {
  await workspaceStore.initialize()
  selectedWorkspaceId.value = workspaceStore.currentWorkspaceId
})

// 监听当前工作空间变化
watch(() => workspaceStore.currentWorkspace, (newWorkspace) => {
  if (newWorkspace) {
    selectedWorkspaceId.value = newWorkspace.id
  }
}, { immediate: true })
</script>

<style scoped>
/* 创建PPT页面样式 */
</style>