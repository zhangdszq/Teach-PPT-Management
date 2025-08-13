<template>
  <div class="template-manager">
    <!-- 顶部工具栏 -->
    <div class="toolbar bg-white p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h2 class="text-xl font-semibold text-gray-900">模板管理</h2>
          <div class="text-sm text-gray-500">
            共 {{ totalTemplates }} 个模板
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
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
          
          <!-- 筛选器 -->
          <select v-model="filters.subject" @change="handleFilterChange" class="border border-gray-300 rounded-lg px-3 py-2">
            <option value="">所有学科</option>
            <option value="英语">英语</option>
            <option value="数学">数学</option>
            <option value="语文">语文</option>
            <option value="物理">物理</option>
            <option value="化学">化学</option>
          </select>
          
          <select v-model="filters.gradeLevel" @change="handleFilterChange" class="border border-gray-300 rounded-lg px-3 py-2">
            <option value="">所有年级</option>
            <option value="小学">小学</option>
            <option value="初中">初中</option>
            <option value="高中">高中</option>
          </select>
          
          <select v-model="filters.difficultyLevel" @change="handleFilterChange" class="border border-gray-300 rounded-lg px-3 py-2">
            <option value="">所有难度</option>
            <option value="BEGINNER">入门级</option>
            <option value="BASIC">基础级</option>
            <option value="INTERMEDIATE">进阶级</option>
            <option value="ADVANCED">高级</option>
          </select>
          
          <!-- 操作按钮 -->
          <button
            @click="showCreateModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + 新建模板
          </button>
          
          <button
            @click="handleImport"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            导入模板
          </button>
          
          <button
            v-if="selectedTemplates.length > 0"
            @click="handleBatchDelete"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            批量删除 ({{ selectedTemplates.length }})
          </button>
        </div>
      </div>
    </div>
    
    <!-- 模板列表 -->
    <div class="template-list p-6">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">加载中...</p>
      </div>
      
      <div v-else-if="templates.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">📄</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无模板</h3>
        <p class="text-gray-600 mb-4">还没有创建任何模板，创建第一个模板吧！</p>
        <button
          @click="showCreateModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          创建模板
        </button>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="template in templates"
          :key="template.id"
          class="template-card bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- 选择框 -->
          <div class="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              :value="template.id"
              v-model="selectedTemplates"
              class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            >
          </div>
          
          <!-- 模板缩略图 -->
          <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
            <span class="text-white text-lg font-medium">{{ template.templateCategory }}</span>
            
            <!-- 操作按钮 -->
            <div class="absolute top-3 right-3 flex space-x-1">
              <button
                @click="handleEdit(template)"
                class="p-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-white transition-colors"
                title="编辑"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              <button
                @click="handleDuplicate(template)"
                class="p-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-white transition-colors"
                title="复制"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button
                @click="handleExport(template)"
                class="p-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-white transition-colors"
                title="导出"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              
              <button
                @click="handleDelete(template)"
                class="p-1.5 bg-red-500 bg-opacity-80 hover:bg-opacity-100 rounded text-white transition-colors"
                title="删除"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 模板信息 -->
          <div class="p-4">
            <h3 class="font-medium text-gray-900 mb-1 truncate">{{ template.name }}</h3>
            <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ template.description }}</p>
            
            <!-- 标签 -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="tag in template.tags.slice(0, 3)"
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {{ tag }}
              </span>
              <span
                v-if="template.tags.length > 3"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                +{{ template.tags.length - 3 }}
              </span>
            </div>
            
            <!-- 元素统计 -->
            <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div class="flex space-x-3">
                <span v-if="getElementCount(template, 'vocabulary') > 0">
                  📝 {{ getElementCount(template, 'vocabulary') }}词汇
                </span>
                <span v-if="getElementCount(template, 'sentence') > 0">
                  💬 {{ getElementCount(template, 'sentence') }}句子
                </span>
                <span v-if="getElementCount(template, 'image') > 0">
                  🖼️ {{ getElementCount(template, 'image') }}图片
                </span>
              </div>
              <span>{{ template.difficultyLevel }}</span>
            </div>
            
            <!-- 底部信息 -->
            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-500">
                {{ formatDate(template.createdAt) }}
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">{{ template.downloadCount }} 次使用</span>
                <button
                  @click="handleUseTemplate(template)"
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  使用模板
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav class="flex items-center space-x-2">
          <button
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="handlePageChange(page)"
            :class="[
              'px-3 py-2 text-sm font-medium border rounded-md',
              page === currentPage
                ? 'text-blue-600 bg-blue-50 border-blue-500'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          
          <button
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </nav>
      </div>
    </div>
    
    <!-- 创建/编辑模板弹窗 -->
    <TemplateFormModal
      v-if="showCreateModal || showEditModal"
      :visible="showCreateModal || showEditModal"
      :template="editingTemplate"
      :mode="showCreateModal ? 'create' : 'edit'"
      @close="handleModalClose"
      @submit="handleModalSubmit"
    />
    
    <!-- 文件上传输入框 -->
    <input
      ref="fileInput"
      type="file"
      accept=".json,.zip"
      style="display: none"
      @change="handleFileSelect"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import TemplateFormModal from './TemplateFormModal.vue'
import {
  getTemplates,
  deleteTemplate,
  batchDeleteTemplates,
  duplicateTemplate,
  exportTemplate,
  importTemplate,
  getTemplateStats
} from '@/api/templateManagement'
import type { Template } from '@/api/types'

// Store
const workspaceStore = useWorkspaceStore()
const { currentWorkspace } = workspaceStore

// 响应式数据
const loading = ref(false)
const templates = ref<Template[]>([])
const totalTemplates = ref(0)
const currentPage = ref(1)
const pageSize = ref(12)
const totalPages = ref(0)
const searchKeyword = ref('')
const selectedTemplates = ref<string[]>([])

// 筛选器
const filters = reactive({
  subject: '',
  gradeLevel: '',
  templateCategory: '',
  difficultyLevel: ''
})

// 弹窗状态
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingTemplate = ref<Template | null>(null)

// 文件上传
const fileInput = ref<HTMLInputElement>()

// 计算属性
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 方法
const loadTemplates = async () => {
  try {
    loading.value = true
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      keyword: searchKeyword.value,
      workspaceId: currentWorkspace?.id,
      ...filters
    }
    
    const response = await getTemplates(params)
    if (response.success) {
      templates.value = response.data || []
      totalTemplates.value = response.total
      totalPages.value = Math.ceil(response.total / pageSize.value)
    }
  } catch (error) {
    console.error('加载模板列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadTemplates()
}

const handleFilterChange = () => {
  currentPage.value = 1
  loadTemplates()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadTemplates()
}

const handleEdit = (template: Template) => {
  editingTemplate.value = template
  showEditModal.value = true
}

const handleDelete = async (template: Template) => {
  if (confirm(`确定要删除模板 "${template.name}" 吗？`)) {
    try {
      const response = await deleteTemplate(template.id)
      if (response.success) {
        await loadTemplates()
      }
    } catch (error) {
      console.error('删除模板失败:', error)
    }
  }
}

const handleBatchDelete = async () => {
  if (confirm(`确定要删除选中的 ${selectedTemplates.value.length} 个模板吗？`)) {
    try {
      const response = await batchDeleteTemplates(selectedTemplates.value)
      if (response.success) {
        selectedTemplates.value = []
        await loadTemplates()
      }
    } catch (error) {
      console.error('批量删除模板失败:', error)
    }
  }
}

const handleDuplicate = async (template: Template) => {
  try {
    const newName = prompt('请输入新模板名称:', `${template.name} - 副本`)
    if (newName) {
      const response = await duplicateTemplate(template.id, newName)
      if (response.success) {
        await loadTemplates()
      }
    }
  } catch (error) {
    console.error('复制模板失败:', error)
  }
}

const handleExport = async (template: Template) => {
  try {
    const response = await exportTemplate(template.id)
    if (response.success && response.data?.downloadUrl) {
      const link = document.createElement('a')
      link.href = response.data.downloadUrl
      link.download = `${template.name}.json`
      link.click()
    }
  } catch (error) {
    console.error('导出模板失败:', error)
  }
}

const handleImport = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    try {
      const response = await importTemplate(file, currentWorkspace?.id)
      if (response.success) {
        await loadTemplates()
      }
    } catch (error) {
      console.error('导入模板失败:', error)
    }
  }
  
  // 清空文件输入框
  target.value = ''
}

const handleUseTemplate = (template: Template) => {
  // 跳转到PPT创建页面，使用该模板
  window.open(`/create?templateId=${template.id}`, '_blank')
}

const handleModalClose = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingTemplate.value = null
}

const handleModalSubmit = async () => {
  await loadTemplates()
  handleModalClose()
}

const getElementCount = (template: Template, elementType: string): number => {
  const element = template.elements?.find(el => el.elementType === elementType)
  return element?.elementCount || 0
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 生命周期
onMounted(() => {
  loadTemplates()
})

// 监听工作空间变化
watch(() => currentWorkspace?.id, () => {
  if (currentWorkspace?.id) {
    currentPage.value = 1
    loadTemplates()
  }
})
</script>

<style scoped>
.template-card {
  position: relative;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>