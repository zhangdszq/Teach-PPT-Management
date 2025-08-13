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
            <!-- 搜索框 -->
            <div class="relative">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="搜索模板..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @input="handleSearch"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <!-- 筛选按钮 -->
            <button 
              @click="showFilters = !showFilters"
              class="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              筛选
            </button>
            
            <!-- 视图切换 -->
            <div class="flex bg-gray-100 rounded-lg p-1">
              <button 
                @click="viewMode = 'grid'"
                :class="[
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                网格
              </button>
              <button 
                @click="viewMode = 'list'"
                :class="[
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                列表
              </button>
            </div>
            
            <!-- 新建模板按钮 -->
            <button 
              @click="showCreateModal = true"
              class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + 新建模板
            </button>
          </div>
        </div>
        
        <!-- 筛选面板 -->
        <div v-if="showFilters" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 学科筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">学科</label>
              <select v-model="filters.subject" class="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">全部学科</option>
                <option value="英语">英语</option>
                <option value="数学">数学</option>
                <option value="语文">语文</option>
                <option value="物理">物理</option>
                <option value="化学">化学</option>
              </select>
            </div>
            
            <!-- 年级筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">年级</label>
              <select v-model="filters.gradeLevel" class="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">全部年级</option>
                <option value="小学一年级">小学一年级</option>
                <option value="小学二年级">小学二年级</option>
                <option value="小学三年级">小学三年级</option>
                <option value="初中一年级">初中一年级</option>
                <option value="初中二年级">初中二年级</option>
                <option value="初中三年级">初中三年级</option>
              </select>
            </div>
            
            <!-- 难度筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">难度</label>
              <select v-model="filters.difficultyLevel" class="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">全部难度</option>
                <option value="BEGINNER">入门级</option>
                <option value="BASIC">基础级</option>
                <option value="INTERMEDIATE">进阶级</option>
                <option value="ADVANCED">高级</option>
              </select>
            </div>
            
            <!-- 元素类型筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">元素类型</label>
              <div class="flex flex-wrap gap-2">
                <label v-for="elementType in elementTypes" :key="elementType.value" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :value="elementType.value" 
                    v-model="filters.elementTypes"
                    class="mr-1"
                  >
                  <span class="text-sm">{{ elementType.label }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end mt-4 space-x-2">
            <button 
              @click="resetFilters"
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              重置
            </button>
            <button 
              @click="applyFilters"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              应用筛选
            </button>
          </div>
        </div>
      </header>

      <!-- 模板内容 -->
      <div class="p-6">
        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-2 text-gray-600">加载中...</span>
        </div>
        
        <!-- 模板展示 -->
        <div v-else-if="templates.length > 0">
          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <!-- 动态模板卡片 -->
            <div 
              v-for="template in templates" 
              :key="template.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                <span class="text-white text-lg font-medium">{{ template.templateCategory }}</span>
                
                <!-- 操作按钮 -->
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="flex space-x-1">
                    <button 
                      @click.stop="viewTemplate(template)"
                      class="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                      title="查看详情"
                    >
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      @click.stop="editTemplate(template)"
                      class="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                      title="编辑模板"
                    >
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button 
                      @click.stop="confirmDeleteTemplate(template)"
                      class="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                      title="删除模板"
                    >
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="p-4">
                <h3 class="font-medium text-gray-900 mb-1 truncate">{{ template.name }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ template.description }}</p>
                
                <!-- 元素统计 -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span 
                    v-for="element in template.elements" 
                    :key="element.id"
                    class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {{ getElementTypeLabel(element.elementType) }}: {{ element.elementCount }}
                  </span>
                </div>
                
                <!-- 标签 -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span 
                    v-for="tag in (template.tags || []).slice(0, 3)" 
                    :key="tag"
                    class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="(template.tags || []).length > 3" class="text-xs text-gray-500">
                    +{{ (template.tags || []).length - 3 }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    <div>{{ template.subject }} · {{ template.gradeLevel }}</div>
                    <div>{{ formatToBeijingTimeShort(template.createdAt) }}</div>
                  </div>
                  <button 
                    @click="useTemplate(template)"
                    class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    使用模板
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 列表视图 -->
          <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">模板信息</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学科/年级</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">元素统计</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标签</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="template in templates" 
                    :key="template.id"
                    class="hover:bg-gray-50 cursor-pointer"
                    @click="viewTemplate(template)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-12 w-12">
                          <div class="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span class="text-white text-xs font-bold">{{ template.templateCategory?.slice(0, 2) || '模板' }}</span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ template.name }}</div>
                          <div class="text-sm text-gray-500 max-w-xs truncate">{{ template.description }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ template.subject }}</div>
                      <div class="text-sm text-gray-500">{{ template.gradeLevel }}</div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-wrap gap-1">
                        <span 
                          v-for="element in (template.elements || []).slice(0, 3)" 
                          :key="element.id"
                          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {{ getElementTypeLabel(element.elementType) }}: {{ element.elementCount }}
                        </span>
                        <span v-if="(template.elements || []).length > 3" class="text-xs text-gray-500">
                          +{{ (template.elements || []).length - 3 }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-wrap gap-1">
                        <span 
                          v-for="tag in (template.tags || []).slice(0, 2)" 
                          :key="tag"
                          class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                        >
                          {{ tag }}
                        </span>
                        <span v-if="(template.tags || []).length > 2" class="text-xs text-gray-500">
                          +{{ (template.tags || []).length - 2 }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatToBeijingTimeShort(template.createdAt) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center space-x-3">
                        <button 
                          @click.stop="useTemplate(template)"
                          class="text-green-600 hover:text-green-700"
                          title="使用模板"
                        >
                          使用
                        </button>
                        <button 
                          @click.stop="viewTemplate(template)"
                          class="text-blue-600 hover:text-blue-700"
                          title="查看详情"
                        >
                          查看
                        </button>
                        <button 
                          @click.stop="editTemplate(template)"
                          class="text-orange-600 hover:text-orange-700"
                          title="编辑模板"
                        >
                          编辑
                        </button>

                        <button 
                          @click.stop="confirmDeleteTemplate(template)"
                          class="text-red-600 hover:text-red-700"
                          title="删除模板"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📄</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无模板</h3>
          <p class="text-gray-600 mb-4">当前筛选条件下没有找到模板，尝试调整筛选条件或创建新模板。</p>
          <button 
            @click="showCreateModal = true"
            class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            创建模板
          </button>
        </div>
        
        <!-- 分页 -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <nav class="flex items-center space-x-2">
            <button 
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              上一页
            </button>
            
            <span v-for="page in visiblePages" :key="page">
              <button 
                v-if="page !== '...'"
                @click="changePage(page)"
                :class="[
                  'px-3 py-2 border rounded-md',
                  page === currentPage 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-3 py-2">...</span>
            </span>
            
            <button 
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              下一页
            </button>
          </nav>
        </div>
      </div>
    </main>
    
    <!-- 创建/编辑模板弹窗 -->
    <TemplateModal 
      v-if="showCreateModal || showEditModal"
      :template="editingTemplate"
      :is-edit="showEditModal"
      @close="closeModal"
      @save="handleSaveTemplate"
    />
    
    <!-- 模板详情弹窗 -->
    <TemplateDetailModal 
      v-if="showDetailModal"
      :template="viewingTemplate"
      @close="showDetailModal = false"
      @edit="editTemplate"
      @duplicate="duplicateTemplate"
    />
    
    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">确认删除模板</h3>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">
            您确定要删除模板 "{{ deletingTemplate?.name }}" 吗？此操作无法撤销。
          </p>
        </div>
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancelDelete"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </button>
          <button 
            @click="handleDeleteTemplate"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import Sidebar from '@/components/Sidebar.vue'
import TemplateModal from '@/components/TemplateModal.vue'
import TemplateDetailModal from '@/components/TemplateDetailModal.vue'
import { formatToBeijingTimeShort } from '@/utils/dateUtils'
import { 
  getTemplates, 
  createTemplate, 
  updateTemplate, 
  deleteTemplate
} from '@/api/templateManagement'
import type { Template, TemplateSearchCriteria } from '@/api/types'

// 工作空间store
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(currentWorkspace?.id || '')
const loading = ref(false)
const templates = ref<Template[]>([])
const searchKeyword = ref('')
const showFilters = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDetailModal = ref(false)
const showDeleteConfirm = ref(false)
const editingTemplate = ref<Template | null>(null)
const viewingTemplate = ref<Template | null>(null)
const deletingTemplate = ref<Template | null>(null)
const viewMode = ref<'grid' | 'list'>('grid')

// 分页数据
const currentPage = ref(1)
const pageSize = ref(12)
const totalCount = ref(0)

// 筛选条件
const filters = ref<TemplateSearchCriteria>({
  subject: '',
  gradeLevel: '',
  difficultyLevel: '',
  elementTypes: []
})

// 元素类型选项
const elementTypes = [
  { value: 'vocabulary', label: '词汇' },
  { value: 'image', label: '图片' },
  { value: 'sentence', label: '句子' },
  { value: 'text', label: '文本' },
  { value: 'title', label: '标题' },
  { value: 'question', label: '问题' },
  { value: 'projectNumber', label: '项目编号' }
]

// 计算属性
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// 方法
const loadTemplates = async () => {
  loading.value = true
  try {
    const criteria: TemplateSearchCriteria = {
      keyword: searchKeyword.value,
      page: currentPage.value,
      size: pageSize.value,
      ...filters.value
    }
    
    const response = await getTemplates(criteria)
    if (response.success) {
      templates.value = response.data || []
      totalCount.value = response.total || 0
    }
  } catch (error) {
    console.error('加载模板失败:', error)
  } finally {
    loading.value = false
  }
}

const handleWorkspaceChange = () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
    loadTemplates()
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadTemplates()
}

const resetFilters = () => {
  filters.value = {
    subject: '',
    gradeLevel: '',
    difficultyLevel: '',
    elementTypes: []
  }
}

const applyFilters = () => {
  currentPage.value = 1
  loadTemplates()
}

const changePage = (page: string | number) => {
  currentPage.value = typeof page === 'string' ? parseInt(page) : page
  loadTemplates()
}

const viewTemplate = (template: Template) => {
  viewingTemplate.value = template
  showDetailModal.value = true
}

const editTemplate = (template: Template) => {
  editingTemplate.value = { ...template } as Template
  showEditModal.value = true
  showDetailModal.value = false
}



const useTemplate = (template: Template) => {
  // 跳转到PPT创建页面，使用该模板
  console.log('使用模板:', template)
}

const confirmDeleteTemplate = (template: Template) => {
  deletingTemplate.value = template
  showDeleteConfirm.value = true
}

const handleDeleteTemplate = async () => {
  if (!deletingTemplate.value) return
  
  try {
    const response = await deleteTemplate(deletingTemplate.value.templateId)
    if (response.success) {
      loadTemplates()
      showDeleteConfirm.value = false
      deletingTemplate.value = null
    }
  } catch (error) {
    console.error('删除模板失败:', error)
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  deletingTemplate.value = null
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingTemplate.value = null
}

const handleSaveTemplate = async (templateData: Partial<Template>) => {
  try {
    if (showEditModal.value && editingTemplate.value) {
      // 更新模板
      const response = await updateTemplate(editingTemplate.value.templateId, templateData)
      if (response.success) {
        loadTemplates()
        closeModal()
      }
    } else {
      // 创建模板
      const response = await createTemplate(templateData as Omit<Template, 'id' | 'createdAt' | 'updatedAt'>)
      if (response.success) {
        loadTemplates()
        closeModal()
      }
    }
  } catch (error) {
    console.error('保存模板失败:', error)
  }
}

const getElementTypeLabel = (type: string) => {
  const elementType = elementTypes.find(et => et.value === type)
  return elementType ? elementType.label : type
}

// formatDate函数已被formatToBeijingTimeShort替代

// 监听当前工作空间变化
watch(() => currentWorkspace, () => {
  if (currentWorkspace) {
    selectedWorkspaceId.value = currentWorkspace.id
    loadTemplates()
  }
})

// 组件挂载时加载数据
onMounted(() => {
  loadTemplates()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>