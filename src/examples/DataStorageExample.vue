<template>
  <div class="data-storage-example p-6">
    <h1 class="text-2xl font-bold mb-6">前端数据保存功能使用示例</h1>
    
    <!-- 基础存储示例 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">1. 基础存储操作</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-2">键名:</label>
            <input 
              v-model="basicKey" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入键名"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">值:</label>
            <input 
              v-model="basicValue" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入值"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">存储类型:</label>
            <select 
              v-model="storageType" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="localStorage">LocalStorage</option>
              <option value="sessionStorage">SessionStorage</option>
              <option value="indexedDB">IndexedDB</option>
            </select>
          </div>
        </div>
        
        <div class="flex space-x-2 mb-4">
          <button 
            @click="saveBasicData"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            保存数据
          </button>
          <button 
            @click="loadBasicData"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            读取数据
          </button>
          <button 
            @click="removeBasicData"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            删除数据
          </button>
        </div>
        
        <div v-if="basicResult" class="p-3 bg-white rounded border">
          <strong>结果:</strong> {{ basicResult }}
        </div>
      </div>
    </div>

    <!-- 项目草稿示例 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">2. 项目草稿管理</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-2">项目名称:</label>
            <input 
              v-model="draftName" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入项目名称"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">工作空间ID:</label>
            <input 
              v-model="draftWorkspaceId" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入工作空间ID"
            >
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">项目内容:</label>
          <textarea 
            v-model="draftContent" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="输入项目内容（JSON格式）"
          ></textarea>
        </div>
        
        <div class="flex space-x-2 mb-4">
          <button 
            @click="saveDraft"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            保存草稿
          </button>
          <button 
            @click="loadDrafts"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            加载草稿列表
          </button>
        </div>
        
        <div v-if="drafts.length > 0" class="space-y-2">
          <h3 class="font-medium">草稿列表:</h3>
          <div 
            v-for="draft in drafts" 
            :key="draft.id"
            class="p-3 bg-white rounded border flex justify-between items-center"
          >
            <div>
              <div class="font-medium">{{ draft.name }}</div>
              <div class="text-sm text-gray-500">
                最后修改: {{ new Date(draft.lastModified).toLocaleString() }}
              </div>
            </div>
            <button 
              @click="deleteDraft(draft.id)"
              class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户设置示例 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">3. 用户设置管理</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-2">主题:</label>
            <select 
              v-model="settings.theme" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="light">浅色</option>
              <option value="dark">深色</option>
              <option value="auto">自动</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">语言:</label>
            <select 
              v-model="settings.language" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="zh-CN">中文</option>
              <option value="en-US">English</option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex items-center">
            <input 
              v-model="settings.autoSave" 
              type="checkbox" 
              class="mr-2"
            >
            <label class="text-sm font-medium">启用自动保存</label>
          </div>
          <div class="flex items-center">
            <input 
              v-model="settings.notifications" 
              type="checkbox" 
              class="mr-2"
            >
            <label class="text-sm font-medium">启用通知</label>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">
            自动保存间隔: {{ settings.autoSaveInterval }} 分钟
          </label>
          <input 
            v-model="settings.autoSaveInterval" 
            type="range" 
            min="1" 
            max="30" 
            class="w-full"
          >
        </div>
        
        <div class="flex space-x-2 mb-4">
          <button 
            @click="saveSettings"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            保存设置
          </button>
          <button 
            @click="loadSettings"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            加载设置
          </button>
          <button 
            @click="resetSettings"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            重置设置
          </button>
        </div>
        
        <div v-if="settingsResult" class="p-3 bg-white rounded border">
          <strong>当前设置:</strong>
          <pre class="mt-2 text-sm">{{ JSON.stringify(settings, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- 数据导出导入示例 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">4. 数据导出导入</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="flex space-x-2 mb-4">
          <button 
            @click="exportData"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            导出数据
          </button>
          <label class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 cursor-pointer">
            导入数据
            <input 
              type="file" 
              accept=".json"
              @change="importData"
              class="hidden"
            >
          </label>
          <button 
            @click="clearAllData"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            清除所有数据
          </button>
        </div>
        
        <div v-if="exportResult" class="p-3 bg-white rounded border">
          <strong>操作结果:</strong> {{ exportResult }}
        </div>
      </div>
    </div>

    <!-- 存储使用情况 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">5. 存储使用情况</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <button 
          @click="updateStorageUsage"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4"
        >
          更新存储使用情况
        </button>
        
        <div v-if="storageUsage" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-3 bg-white rounded border text-center">
            <div class="text-2xl font-bold text-blue-600">{{ formatBytes(storageUsage.used) }}</div>
            <div class="text-sm text-gray-500">已使用</div>
          </div>
          <div class="p-3 bg-white rounded border text-center">
            <div class="text-2xl font-bold text-green-600">{{ formatBytes(storageUsage.total) }}</div>
            <div class="text-sm text-gray-500">总容量</div>
          </div>
          <div class="p-3 bg-white rounded border text-center">
            <div class="text-2xl font-bold text-purple-600">{{ formatBytes(storageUsage.total - storageUsage.used) }}</div>
            <div class="text-sm text-gray-500">可用</div>
          </div>
          <div class="p-3 bg-white rounded border text-center">
            <div class="text-2xl font-bold text-orange-600">{{ storageUsage.percentage }}%</div>
            <div class="text-sm text-gray-500">使用率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  StorageManager, 
  LocalStorageManager, 
  StorageType, 
  STORAGE_KEYS,
  type StorageConfig 
} from '@/utils/storage'
import { useDataManagerStore, type ProjectDraft, type UserSettings } from '@/stores/dataManager'

// Store
const dataManagerStore = useDataManagerStore()

// 基础存储
const basicKey = ref('test-key')
const basicValue = ref('test-value')
const storageType = ref<'localStorage' | 'sessionStorage' | 'indexedDB'>('localStorage')
const basicResult = ref('')

// 项目草稿
const draftName = ref('示例项目')
const draftWorkspaceId = ref('1')
const draftContent = ref('{"slides": [], "settings": {}}')
const drafts = ref<ProjectDraft[]>([])

// 用户设置
const settings = ref<UserSettings>({
  theme: 'light',
  language: 'zh-CN',
  autoSave: true,
  autoSaveInterval: 5,
  notifications: true,
  soundEffects: true
})
const settingsResult = ref(false)

// 导出导入
const exportResult = ref('')

// 存储使用情况
const storageUsage = ref<{ used: number; total: number; percentage: number } | null>(null)

// 初始化
onMounted(async () => {
  await dataManagerStore.initialize()
  updateStorageUsage()
})

// 基础存储操作
const saveBasicData = async () => {
  try {
    const config: StorageConfig = {
      type: storageType.value as StorageType,
      key: basicKey.value,
      encrypt: false
    }
    
    const success = await StorageManager.set(config, basicValue.value)
    basicResult.value = success ? '保存成功' : '保存失败'
  } catch (error) {
    basicResult.value = `保存失败: ${error}`
  }
}

const loadBasicData = async () => {
  try {
    const config: StorageConfig = {
      type: storageType.value as StorageType,
      key: basicKey.value,
      encrypt: false
    }
    
    const value = await StorageManager.get<string>(config)
    basicResult.value = value ? `读取成功: ${value}` : '未找到数据'
  } catch (error) {
    basicResult.value = `读取失败: ${error}`
  }
}

const removeBasicData = async () => {
  try {
    const config: StorageConfig = {
      type: storageType.value as StorageType,
      key: basicKey.value,
      encrypt: false
    }
    
    const success = await StorageManager.remove(config)
    basicResult.value = success ? '删除成功' : '删除失败'
  } catch (error) {
    basicResult.value = `删除失败: ${error}`
  }
}

// 项目草稿操作
const saveDraft = async () => {
  try {
    const draft: ProjectDraft = {
      id: `draft_${Date.now()}`,
      name: draftName.value,
      content: JSON.parse(draftContent.value),
      lastModified: Date.now(),
      workspaceId: draftWorkspaceId.value
    }
    
    const success = await dataManagerStore.saveProjectDraft(draft)
    if (success) {
      alert('草稿保存成功')
      loadDrafts()
    } else {
      alert('草稿保存失败')
    }
  } catch (error) {
    alert(`草稿保存失败: ${error}`)
  }
}

const loadDrafts = async () => {
  await dataManagerStore.loadProjectDrafts()
  drafts.value = dataManagerStore.projectDrafts
}

const deleteDraft = async (draftId: string) => {
  const success = await dataManagerStore.deleteProjectDraft(draftId)
  if (success) {
    alert('草稿删除成功')
    loadDrafts()
  } else {
    alert('草稿删除失败')
  }
}

// 用户设置操作
const saveSettings = async () => {
  const success = await dataManagerStore.saveUserSettings(settings.value)
  settingsResult.value = success
  if (success) {
    alert('设置保存成功')
  } else {
    alert('设置保存失败')
  }
}

const loadSettings = async () => {
  await dataManagerStore.loadUserSettings()
  settings.value = { ...dataManagerStore.userSettings }
  settingsResult.value = true
  alert('设置加载成功')
}

const resetSettings = () => {
  settings.value = {
    theme: 'light',
    language: 'zh-CN',
    autoSave: true,
    autoSaveInterval: 5,
    notifications: true,
    soundEffects: true
  }
  settingsResult.value = true
  alert('设置已重置')
}

// 数据导出导入
const exportData = async () => {
  const success = await dataManagerStore.downloadDataFile()
  exportResult.value = success ? '数据导出成功' : '数据导出失败'
}

const importData = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  try {
    const success = await dataManagerStore.importDataFromFile(file)
    exportResult.value = success ? '数据导入成功' : '数据导入失败'
    if (success) {
      // 重新加载数据
      loadDrafts()
      loadSettings()
    }
  } catch (error) {
    exportResult.value = `数据导入失败: ${error}`
  } finally {
    target.value = ''
  }
}

const clearAllData = async () => {
  if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
    const success = await dataManagerStore.clearAllData()
    exportResult.value = success ? '数据清除成功' : '数据清除失败'
    if (success) {
      // 重新初始化
      await dataManagerStore.initialize()
      loadDrafts()
      loadSettings()
      updateStorageUsage()
    }
  }
}

// 存储使用情况
const updateStorageUsage = () => {
  storageUsage.value = LocalStorageManager.getUsage()
}

// 工具函数
const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.data-storage-example {
  max-width: 1200px;
  margin: 0 auto;
}

pre {
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0.25rem;
  overflow-x: auto;
}
</style>