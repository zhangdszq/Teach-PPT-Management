<template>
  <div class="h-screen bg-gray-100">
    <!-- 侧边栏 -->
    <Sidebar />
    
    <!-- 主内容区域 -->
    <div class="ml-64 flex flex-col h-full overflow-hidden">
      <!-- 顶部导航栏 -->
      <div class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-900">Prompt管理</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- 搜索框 -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索Prompt内容..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @input="handleSearch"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <!-- 添加Prompt按钮 -->
            <button 
              @click="openCreateModal"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>添加Prompt</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="flex-1 overflow-auto p-6">
        <!-- 筛选器 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div class="flex flex-wrap items-center gap-4">
            <!-- 类型筛选 -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">类型:</label>
              <select
                v-model="filters.promType"
                @change="handleFilterChange"
                class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部</option>
                <option v-for="type in promptTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>
            
            <!-- 统计信息 -->
            <div class="text-sm text-gray-500 ml-auto">
              共 {{ filteredPrompts.length }} 个Prompt
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="text-gray-500">加载中...</div>
        </div>
        
        <!-- 错误状态 -->
        <div v-else-if="error" class="flex items-center justify-center py-12">
          <div class="text-red-500">{{ error }}</div>
        </div>
        
        <!-- 空状态 -->
        <div v-else-if="filteredPrompts.length === 0" class="flex flex-col items-center justify-center py-12">
          <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-500 text-lg mb-2">暂无Prompt</p>
          <p class="text-gray-400 text-sm mb-4">开始创建您的第一个Prompt</p>
          <button 
            @click="openCreateModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            创建Prompt
          </button>
        </div>
        
        <!-- Prompt列表 -->
        <div v-else class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          <div 
            v-for="prompt in filteredPrompts" 
            :key="prompt.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div class="p-4">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 mb-1">Prompt #{{ prompt.id }}</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="getPromptTypeClass(prompt.promType)">
                    {{ getPromptTypeLabel(prompt.promType) }}
                  </span>
                </div>
              </div>
              
              <div class="mb-4">
                <p class="text-sm text-gray-600 line-clamp-3 break-words overflow-hidden">{{ prompt.prompt }}</p>
              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button 
                @click="copyPromptContent(prompt.prompt)"
                class="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                title="复制内容"
              >
                复制
              </button>
              <button 
                @click="openEditModal(prompt)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                title="编辑"
              >
                编辑
              </button>
              <button 
                @click="deletePrompt(prompt.id)"
                class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                title="删除"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建/编辑Prompt模态框 -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-4xl h-5/6 flex flex-col">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ isEditing ? '编辑Prompt' : '创建Prompt' }}
          </h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto flex-1">
          <form @submit.prevent="savePrompt" class="space-y-6">
            <!-- Prompt类型 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prompt类型 *</label>
              <select
                v-model="promptForm.promType"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="type in promptTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>
            
            <!-- Prompt内容 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prompt内容 *</label>
              <textarea
                v-model="promptForm.prompt"
                rows="15"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                placeholder="请输入Prompt内容"
              ></textarea>
            </div>
          </form>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            @click="closeModal"
            type="button"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            @click="savePrompt"
            type="button"
            :disabled="saving"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ saving ? '保存中...' : (isEditing ? '保存' : '创建') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import type { PromptInfo, PromptForm } from '@/api/types'

// 响应式数据
const searchQuery = ref('')
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const prompts = ref<PromptInfo[]>([])
const showModal = ref(false)
const isEditing = ref(false)
const editingPromptId = ref<number | null>(null)

// 筛选器
const filters = reactive({
  promType: ''
})

// Prompt表单
const promptForm = reactive<PromptForm>({
  promType: 'system',
  prompt: ''
})

// Prompt类型选项（动态获取）
const promptTypes = ref<Array<{ value: string; label: string }>>([])

/**
 * 计算属性：过滤后的Prompt列表
 */
const filteredPrompts = computed(() => {
  return prompts.value.filter(prompt => {
    const matchesSearch = !searchQuery.value || 
      prompt.prompt.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesPromType = !filters.promType || prompt.promType === filters.promType
    
    return matchesSearch && matchesPromType
  })
})

/**
 * 处理搜索
 */
const handleSearch = () => {
  // 搜索逻辑已在计算属性中处理
}

/**
 * 处理筛选器变化
 */
const handleFilterChange = () => {
  // 筛选逻辑已在计算属性中处理
}

/**
 * 加载Prompt类型列表
 */
const loadPromptTypes = async () => {
  try {
    const response = await fetch('/api/prompts/types')
    if (!response.ok) {
      throw new Error('获取Prompt类型失败')
    }
    const result = await response.json()
    
    if (result.status === 'success' && result.data && Array.isArray(result.data)) {
      // 将后端返回的类型转换为前端需要的格式
      promptTypes.value = result.data.map((type: string) => ({
        value: type,
        label: getPromptTypeLabel(type)
      }))
    } else {
      // 使用默认类型
      promptTypes.value = [
        { value: 'system', label: '系统' },
        { value: 'user', label: '用户' },
        { value: 'assistant', label: '助手' },
        { value: 'custom', label: '自定义' }
      ]
    }
  } catch (err) {
    console.error('加载Prompt类型失败:', err)
    // 使用默认类型
    promptTypes.value = [
      { value: 'system', label: '系统' },
      { value: 'user', label: '用户' },
      { value: 'assistant', label: '助手' },
      { value: 'custom', label: '自定义' }
    ]
  }
}

/**
 * 加载Prompt列表
 */
const loadPrompts = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await fetch('/api/prompts')
    if (!response.ok) {
      throw new Error('获取Prompt列表失败')
    }
    const result = await response.json()
    
    if (result.status === 'success' && result.data && Array.isArray(result.data.prompts)) {
      prompts.value = result.data.prompts
    } else {
      // 确保 prompts.value 始终是数组
      prompts.value = []
      throw new Error(result.message || '数据格式错误')
    }
  } catch (err) {
    error.value = '加载Prompt列表失败'
    // 确保即使出错时 prompts.value 也是数组
    prompts.value = []
    console.error('加载Prompt列表失败:', err)
  } finally {
    loading.value = false
  }
}

/**
 * 复制Prompt内容到剪贴板
 */
const copyPromptContent = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    // 这里可以添加一个toast提示
    alert('内容已复制到剪贴板')
  } catch (err) {
    alert('复制失败')
    console.error('复制到剪贴板失败:', err)
  }
}

/**
 * 打开创建模态框
 */
const openCreateModal = () => {
  isEditing.value = false
  editingPromptId.value = null
  resetForm()
  showModal.value = true
}

/**
 * 打开编辑模态框
 */
const openEditModal = (prompt: PromptInfo) => {
  isEditing.value = true
  editingPromptId.value = prompt.id
  promptForm.promType = prompt.promType
  promptForm.prompt = prompt.prompt
  showModal.value = true
}

/**
 * 删除Prompt
 */
const deletePrompt = async (promptId: number) => {
  if (confirm('确定要删除这个Prompt吗？')) {
    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('删除Prompt失败')
      }
      
      alert('删除成功')
      await loadPrompts() // 重新加载列表
    } catch (err) {
      alert('删除失败')
      console.error('删除Prompt失败:', err)
    }
  }
}

/**
 * 关闭模态框
 */
const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  editingPromptId.value = null
  resetForm()
}

/**
 * 重置表单
 */
const resetForm = () => {
  promptForm.promType = 'system'
  promptForm.prompt = ''
}

/**
 * 保存Prompt
 */
const savePrompt = async () => {
  try {
    if (!promptForm.prompt.trim()) {
      alert('请填写Prompt内容')
      return
    }
    
    saving.value = true
    
    const promptData = {
      promType: promptForm.promType,
      prompt: promptForm.prompt
    }
    
    let response: Response
    
    if (isEditing.value && editingPromptId.value) {
      // 更新现有Prompt
      response = await fetch(`/api/prompts/${editingPromptId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(promptData)
      })
    } else {
      // 创建新Prompt
      response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(promptData)
      })
    }
    
    if (!response.ok) {
      throw new Error(isEditing.value ? '更新Prompt失败' : '创建Prompt失败')
    }
    
    alert(isEditing.value ? '更新成功' : '创建成功')
    closeModal()
    await loadPrompts() // 重新加载列表
  } catch (err) {
    alert('保存失败')
    console.error('保存Prompt失败:', err)
  } finally {
    saving.value = false
  }
}

/**
 * 获取Prompt类型标签
 */
const getPromptTypeLabel = (promType: string): string => {
  const typeMap: Record<string, string> = {
    'system': '系统',
    'user': '用户',
    'assistant': '助手',
    'custom': '自定义'
  }
  return typeMap[promType] || promType
}

/**
 * 获取Prompt类型样式类
 */
const getPromptTypeClass = (promType: string): string => {
  const classMap: Record<string, string> = {
    'system': 'bg-blue-100 text-blue-800',
    'user': 'bg-green-100 text-green-800',
    'assistant': 'bg-purple-100 text-purple-800',
    'custom': 'bg-orange-100 text-orange-800'
  }
  return classMap[promType] || 'bg-gray-100 text-gray-800'
}

// 组件挂载时加载数据
onMounted(() => {
  loadPromptTypes()
  loadPrompts()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>