<template>
  <div class="data-manager">
    <!-- 数据管理面板 -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">数据管理</h2>
        <div class="flex items-center space-x-2">
          <div class="text-sm text-gray-500">
            存储使用: {{ storageUsage.percentage }}%
          </div>
          <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full transition-all duration-300"
              :class="{
                'bg-green-500': storageUsage.percentage < 70,
                'bg-yellow-500': storageUsage.percentage >= 70 && storageUsage.percentage < 90,
                'bg-red-500': storageUsage.percentage >= 90
              }"
              :style="{ width: `${storageUsage.percentage}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 自动保存设置 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-medium text-gray-900">自动保存</h3>
            <p class="text-sm text-gray-600">自动保存您的工作进度和设置</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="autoSaveEnabled" 
              @change="toggleAutoSave"
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div v-if="autoSaveEnabled" class="ml-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            自动保存间隔: {{ userSettings.autoSaveInterval }} 分钟
          </label>
          <input 
            type="range" 
            min="1" 
            max="30" 
            v-model="userSettings.autoSaveInterval"
            @change="saveUserSettings"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          >
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>1分钟</span>
            <span>30分钟</span>
          </div>
        </div>
        
        <div v-if="lastSaveTime" class="mt-2 text-sm text-gray-500">
          上次保存: {{ formatTime(lastSaveTime) }}
        </div>
      </div>

      <!-- 数据操作 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- 手动保存 -->
        <button 
          @click="performManualSave"
          :disabled="saveInProgress"
          class="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save class="w-6 h-6 text-blue-600 mb-2" />
          <span class="text-sm font-medium text-gray-900">手动保存</span>
          <span class="text-xs text-gray-500">保存当前状态</span>
        </button>

        <!-- 导出数据 -->
        <button 
          @click="exportData"
          :disabled="saveInProgress"
          class="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download class="w-6 h-6 text-green-600 mb-2" />
          <span class="text-sm font-medium text-gray-900">导出数据</span>
          <span class="text-xs text-gray-500">下载备份文件</span>
        </button>

        <!-- 导入数据 -->
        <label class="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <Upload class="w-6 h-6 text-purple-600 mb-2" />
          <span class="text-sm font-medium text-gray-900">导入数据</span>
          <span class="text-xs text-gray-500">从备份文件恢复</span>
          <input 
            type="file" 
            accept=".json"
            @change="importData"
            class="hidden"
          >
        </label>

        <!-- 清除数据 -->
        <button 
          @click="showClearConfirm = true"
          class="flex flex-col items-center p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 class="w-6 h-6 text-red-600 mb-2" />
          <span class="text-sm font-medium text-red-900">清除数据</span>
          <span class="text-xs text-red-500">删除所有本地数据</span>
        </button>
      </div>

      <!-- 项目草稿管理 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">项目草稿 ({{ projectDrafts.length }})</h3>
        
        <div v-if="projectDrafts.length === 0" class="text-center py-8 text-gray-500">
          <FileText class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>暂无项目草稿</p>
        </div>
        
        <div v-else class="space-y-2 max-h-60 overflow-y-auto">
          <div 
            v-for="draft in projectDrafts" 
            :key="draft.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex-1">
              <h4 class="text-sm font-medium text-gray-900">{{ draft.name }}</h4>
              <p class="text-xs text-gray-500">
                最后修改: {{ formatTime(draft.lastModified) }}
              </p>
            </div>
            <button 
              @click="deleteDraft(draft.id)"
              class="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
              title="删除草稿"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- 存储详情 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-900 mb-3">存储详情</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-600">已使用:</span>
            <span class="font-medium ml-2">{{ formatBytes(storageUsage.used) }}</span>
          </div>
          <div>
            <span class="text-gray-600">总容量:</span>
            <span class="font-medium ml-2">{{ formatBytes(storageUsage.total) }}</span>
          </div>
          <div>
            <span class="text-gray-600">可用:</span>
            <span class="font-medium ml-2">{{ formatBytes(storageUsage.total - storageUsage.used) }}</span>
          </div>
          <div>
            <span class="text-gray-600">使用率:</span>
            <span class="font-medium ml-2">{{ storageUsage.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 清除确认对话框 -->
    <div v-if="showClearConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center mb-4">
          <AlertTriangle class="w-6 h-6 text-red-600 mr-3" />
          <h3 class="text-lg font-medium text-gray-900">确认清除数据</h3>
        </div>
        <p class="text-gray-600 mb-6">
          此操作将删除所有本地保存的数据，包括用户设置、项目草稿等。此操作不可恢复，请确认是否继续？
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showClearConfirm = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            @click="confirmClearData"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            确认清除
          </button>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="saveInProgress" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
      <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span class="text-gray-900">正在保存数据...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Save, 
  Download, 
  Upload, 
  Trash2, 
  FileText, 
  X, 
  AlertTriangle 
} from 'lucide-vue-next'
import { useDataManagerStore } from '@/stores/dataManager'
import { storeToRefs } from 'pinia'

// Store
const dataManagerStore = useDataManagerStore()
const {
  autoSaveEnabled,
  lastSaveTime,
  saveInProgress,
  storageUsage,
  userSettings,
  projectDrafts
} = storeToRefs(dataManagerStore)

// 本地状态
const showClearConfirm = ref(false)

// 初始化
onMounted(async () => {
  await dataManagerStore.initialize()
  // 定期更新存储使用情况
  const updateInterval = setInterval(() => {
    dataManagerStore.updateStorageUsage()
  }, 30000) // 每30秒更新一次
  
  onUnmounted(() => {
    clearInterval(updateInterval)
  })
})

// 方法
const toggleAutoSave = async () => {
  if (autoSaveEnabled.value) {
    dataManagerStore.startAutoSave()
  } else {
    dataManagerStore.stopAutoSave()
  }
  await dataManagerStore.saveUserSettings({ autoSave: autoSaveEnabled.value })
}

const saveUserSettings = async () => {
  await dataManagerStore.saveUserSettings()
}

const performManualSave = async () => {
  await dataManagerStore.performAutoSave()
  alert('数据保存成功！')
}

const exportData = async () => {
  const success = await dataManagerStore.downloadDataFile()
  if (success) {
    alert('数据导出成功！')
  } else {
    alert('数据导出失败，请重试')
  }
}

const importData = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  try {
    const success = await dataManagerStore.importDataFromFile(file)
    if (success) {
      alert('数据导入成功！')
      // 重新加载数据
      await dataManagerStore.initialize()
    } else {
      alert('数据导入失败，请检查文件格式')
    }
  } catch (error) {
    console.error('导入数据失败:', error)
    alert('数据导入失败，请重试')
  } finally {
    // 清空文件输入
    target.value = ''
  }
}

const confirmClearData = async () => {
  try {
    const success = await dataManagerStore.clearAllData()
    if (success) {
      alert('数据清除成功！')
      showClearConfirm.value = false
      // 重新初始化
      await dataManagerStore.initialize()
    } else {
      alert('数据清除失败，请重试')
    }
  } catch (error) {
    console.error('清除数据失败:', error)
    alert('数据清除失败，请重试')
  }
}

const deleteDraft = async (draftId: string) => {
  if (confirm('确定要删除这个项目草稿吗？')) {
    const success = await dataManagerStore.deleteProjectDraft(draftId)
    if (success) {
      alert('草稿删除成功！')
    } else {
      alert('草稿删除失败，请重试')
    }
  }
}

// 工具函数
const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.data-manager {
  @apply max-w-4xl mx-auto;
}

/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 范围输入样式 */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background .15s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #2563eb;
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 2px 0 #555;
  transition: background .15s ease-in-out;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #2563eb;
}
</style>