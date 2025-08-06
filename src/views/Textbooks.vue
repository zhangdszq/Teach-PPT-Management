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
              <h2 class="text-2xl font-bold text-gray-900">教材管理</h2>
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
              {{ currentWorkspaceName }} - 管理各学科教材和相关PPT内容
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                type="text" 
                placeholder="搜索教材..." 
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <button 
              @click="showCreateModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + 添加教材
            </button>
            
            <div class="relative">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span class="text-sm font-medium">用户</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- 教材内容 -->
      <div class="p-6">
        <!-- 筛选器 -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>所有学科</option>
              <option>英语</option>
              <option>物理</option>
              <option>化学</option>
              <option>语文</option>
              <option>数学</option>
            </select>
            
            <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>所有年级</option>
              <option>高一</option>
              <option>高二</option>
              <option>高三</option>
            </select>
            
            <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>所有版本</option>
              <option>人教版</option>
              <option>苏教版</option>
              <option>北师大版</option>
              <option>沪教版</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <button 
              :class="viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
              @click="viewMode = 'grid'"
              class="p-2 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button 
              :class="viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
              @click="viewMode = 'list'"
              class="p-2 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 网格视图 -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- 教材卡片 -->
          <div 
            v-for="textbook in textbooks" 
            :key="textbook.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            @click="selectTextbook(textbook)"
          >
            <div class="aspect-[3/4] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <div class="text-center text-white p-4">
                <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <h4 class="font-bold text-lg">{{ textbook.subject }}</h4>
                <p class="text-sm opacity-90">{{ textbook.grade }}</p>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">{{ textbook.name }}</h3>
              <div class="space-y-1 text-sm text-gray-600">
                <div class="flex justify-between">
                  <span>版本:</span>
                  <span>{{ textbook.version }}</span>
                </div>
                <div class="flex justify-between">
                  <span>章节:</span>
                  <span>{{ textbook.chapters }}章</span>
                </div>
                <div class="flex justify-between">
                  <span>PPT:</span>
                  <span>{{ textbook.pptCount }}个</span>
                </div>
              </div>
              
              <div class="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                <span class="text-xs text-gray-500">{{ textbook.lastUpdated }}</span>
                <div class="flex space-x-1">
                  <button class="text-gray-400 hover:text-blue-600 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-red-600 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 列表视图 -->
        <div v-if="viewMode === 'list'" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div class="col-span-4">教材名称</div>
              <div class="col-span-2">学科</div>
              <div class="col-span-1">年级</div>
              <div class="col-span-2">版本</div>
              <div class="col-span-1">章节</div>
              <div class="col-span-1">PPT数</div>
              <div class="col-span-1">操作</div>
            </div>
          </div>
          
          <div class="divide-y divide-gray-200">
            <div 
              v-for="textbook in textbooks" 
              :key="textbook.id"
              class="px-6 py-4 hover:bg-gray-50 cursor-pointer"
              @click="selectTextbook(textbook)"
            >
              <div class="grid grid-cols-12 gap-4 items-center">
                <div class="col-span-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">{{ textbook.name }}</h3>
                      <p class="text-sm text-gray-500">{{ textbook.lastUpdated }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 text-sm text-gray-900">{{ textbook.subject }}</div>
                <div class="col-span-1 text-sm text-gray-900">{{ textbook.grade }}</div>
                <div class="col-span-2 text-sm text-gray-900">{{ textbook.version }}</div>
                <div class="col-span-1 text-sm text-gray-900">{{ textbook.chapters }}</div>
                <div class="col-span-1 text-sm text-gray-900">{{ textbook.pptCount }}</div>
                <div class="col-span-1">
                  <div class="flex space-x-1">
                    <button class="text-gray-400 hover:text-blue-600 p-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button class="text-gray-400 hover:text-red-600 p-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 教材详情模态框 -->
    <div v-if="selectedTextbook" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 class="text-xl font-bold text-gray-900">{{ selectedTextbook.name }}</h3>
            <p class="text-sm text-gray-600">{{ selectedTextbook.subject }} · {{ selectedTextbook.grade }} · {{ selectedTextbook.version }}</p>
          </div>
          <button @click="selectedTextbook = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- 章节列表 -->
          <div class="space-y-4">
            <div 
              v-for="chapter in selectedTextbook.chapterList" 
              :key="chapter.id"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-gray-900">{{ chapter.name }}</h4>
                <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  + 添加PPT
                </button>
              </div>
              
              <!-- PPT列表 -->
              <div class="space-y-2">
                <div 
                  v-for="ppt in chapter.ppts" 
                  :key="ppt.id"
                  class="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">{{ ppt.name }}</h5>
                      <p class="text-sm text-gray-500">{{ ppt.createdAt }} · {{ ppt.slides }}页</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-700 text-sm">
                      编辑
                    </button>
                    <button class="text-green-600 hover:text-green-700 text-sm">
                      预览
                    </button>
                    <button class="text-red-600 hover:text-red-700 text-sm">
                      删除
                    </button>
                  </div>
                </div>
                
                <div v-if="chapter.ppts.length === 0" class="text-center py-4 text-gray-500 text-sm">
                  暂无PPT，点击上方按钮添加
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加教材模态框 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">添加教材</h3>
          <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="createTextbook">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">教材名称</label>
              <input 
                v-model="newTextbook.name"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="请输入教材名称"
                required
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">学科</label>
                <select 
                  v-model="newTextbook.subject"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">选择学科</option>
                  <option value="英语">英语</option>
                  <option value="物理">物理</option>
                  <option value="化学">化学</option>
                  <option value="语文">语文</option>
                  <option value="数学">数学</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">年级</label>
                <select 
                  v-model="newTextbook.grade"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">选择年级</option>
                  <option value="高一">高一</option>
                  <option value="高二">高二</option>
                  <option value="高三">高三</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">版本</label>
              <select 
                v-model="newTextbook.version"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">选择版本</option>
                <option value="人教版">人教版</option>
                <option value="苏教版">苏教版</option>
                <option value="北师大版">北师大版</option>
                <option value="沪教版">沪教版</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">章节数</label>
              <input 
                v-model.number="newTextbook.chapters"
                type="number" 
                min="1"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="请输入章节数"
                required
              >
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              @click="showCreateModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import Sidebar from '@/components/Sidebar.vue'

interface PPT {
  id: number
  name: string
  createdAt: string
  slides: number
  workspaceId: string
}

interface Chapter {
  id: number
  name: string
  ppts: PPT[]
}

interface Textbook {
  id: number
  name: string
  subject: string
  grade: string
  version: string
  chapters: number
  pptCount: number
  lastUpdated: string
  workspaceId: string
  chapterList: Chapter[]
}

// 工作空间store
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const viewMode = ref('grid')
const showCreateModal = ref(false)
const selectedTextbook = ref<Textbook | null>(null)
const selectedWorkspaceId = ref(currentWorkspace?.id || '')
const newTextbook = ref({
  name: '',
  subject: '',
  grade: '',
  version: '',
  chapters: 1
})

// 所有教材数据（包含工作空间信息）
const allTextbooks = ref([
  {
    id: 1,
    name: '初中英语七年级上册',
    subject: '英语',
    grade: '七年级',
    version: '人教版',
    chapters: 8,
    pptCount: 24,
    lastUpdated: '2024-12-20',
    workspaceId: '1', // 英语教学工作空间
    chapterList: [
      {
        id: 1,
        name: 'Unit 1 Hello',
        ppts: [
          { id: 1, name: '英语字母与发音', createdAt: '2024-12-15', slides: 15, workspaceId: '1' },
          { id: 2, name: '基础问候语', createdAt: '2024-12-16', slides: 18, workspaceId: '1' }
        ]
      },
      {
        id: 2,
        name: 'Unit 2 My Family',
        ppts: [
          { id: 3, name: '家庭成员介绍', createdAt: '2024-12-17', slides: 20, workspaceId: '1' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '高中物理必修一',
    subject: '物理',
    grade: '高一',
    version: '人教版',
    chapters: 6,
    pptCount: 18,
    lastUpdated: '2024-12-18',
    workspaceId: '2', // 物理实验室
    chapterList: [
      {
        id: 1,
        name: '第一章 运动的描述',
        ppts: [
          { id: 1, name: '质点 参考系和坐标系', createdAt: '2024-12-10', slides: 12, workspaceId: '2' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: '高中化学必修一',
    subject: '化学',
    grade: '高一',
    version: '人教版',
    chapters: 7,
    pptCount: 21,
    lastUpdated: '2024-12-15',
    workspaceId: '3', // 语文课程组
    chapterList: []
  },
  {
    id: 4,
    name: '高中语文必修一',
    subject: '语文',
    grade: '高一',
    version: '人教版',
    chapters: 5,
    pptCount: 15,
    lastUpdated: '2024-12-12',
    workspaceId: '3', // 语文课程组
    chapterList: []
  },
  {
    id: 5,
    name: '初中英语七年级下册',
    subject: '英语',
    grade: '七年级',
    version: '人教版',
    chapters: 6,
    pptCount: 18,
    lastUpdated: '2024-12-10',
    workspaceId: '1', // 数学教学工作空间
    chapterList: []
  }
])

// 根据当前工作空间过滤教材
const textbooks = computed(() => {
  if (!currentWorkspace) return []
  return allTextbooks.value.filter(textbook => textbook.workspaceId === currentWorkspace.id)
})

// 选择教材
const selectTextbook = (textbook: Textbook) => {
  selectedTextbook.value = textbook
}

// 处理工作空间切换
const handleWorkspaceChange = () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
    // 清空当前选择的教材
    selectedTextbook.value = null
  }
}

// 创建教材
const createTextbook = () => {
  // 这里应该调用API创建教材
  console.log('创建教材:', newTextbook.value)
  
  // 重置表单
  newTextbook.value = {
    name: '',
    subject: '',
    grade: '',
    version: '',
    chapters: 1
  }
  
  // 关闭模态框
  showCreateModal.value = false
}

// 监听当前工作空间变化，更新选择器
computed(() => {
  if (currentWorkspace) {
    selectedWorkspaceId.value = currentWorkspace.id
  }
})
</script>

<style scoped>
/* 教材管理页面样式 */
</style>