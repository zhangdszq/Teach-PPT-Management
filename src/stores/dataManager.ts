/**
 * 数据管理Store
 * 统一管理应用的数据保存、恢复、导出、导入等功能
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  StorageManager, 
  LocalStorageManager, 
  SessionStorageManager, 
  IndexedDBManager,
  StorageType, 
  STORAGE_KEYS,
  type StorageConfig 
} from '@/utils/storage'
import { useWorkspaceStore, type Workspace } from './workspace'
import type { Project, Template, Resource, Textbook } from '@/api/mock'

// 用户设置接口
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto'
  language: 'zh-CN' | 'en-US'
  autoSave: boolean
  autoSaveInterval: number // 分钟
  notifications: boolean
  soundEffects: boolean
}

// 应用状态接口
export interface AppState {
  lastActiveWorkspace: string
  recentProjects: string[]
  favoriteTemplates: string[]
  viewMode: 'grid' | 'list'
  sidebarCollapsed: boolean
}

// 项目草稿接口
export interface ProjectDraft {
  id: string
  name: string
  content: any
  lastModified: number
  workspaceId: string
}

// 数据导出格式
export interface ExportData {
  version: string
  timestamp: number
  userSettings: UserSettings
  appState: AppState
  workspaces: Workspace[]
  projects: Project[]
  templates: Template[]
  resources: Resource[]
  textbooks: Textbook[]
  drafts: ProjectDraft[]
}

export const useDataManagerStore = defineStore('dataManager', () => {
  // 状态
  const isInitialized = ref(false)
  const autoSaveEnabled = ref(true)
  const lastSaveTime = ref<number | null>(null)
  const saveInProgress = ref(false)
  const storageUsage = ref({ used: 0, total: 0, percentage: 0 })

  // 默认用户设置
  const defaultUserSettings: UserSettings = {
    theme: 'light',
    language: 'zh-CN',
    autoSave: true,
    autoSaveInterval: 5,
    notifications: true,
    soundEffects: true
  }

  // 默认应用状态
  const defaultAppState: AppState = {
    lastActiveWorkspace: '',
    recentProjects: [],
    favoriteTemplates: [],
    viewMode: 'grid',
    sidebarCollapsed: false
  }

  // 当前设置
  const userSettings = ref<UserSettings>({ ...defaultUserSettings })
  const appState = ref<AppState>({ ...defaultAppState })
  const projectDrafts = ref<ProjectDraft[]>([])

  // 计算属性
  const isStorageAvailable = computed(() => {
    return typeof Storage !== 'undefined' && typeof indexedDB !== 'undefined'
  })

  const autoSaveInterval = computed(() => userSettings.value.autoSaveInterval * 60 * 1000)

  // 存储配置
  const storageConfigs = {
    userSettings: {
      type: StorageType.LOCAL,
      key: STORAGE_KEYS.USER_SETTINGS,
      encrypt: false
    } as StorageConfig,
    appState: {
      type: StorageType.LOCAL,
      key: STORAGE_KEYS.APP_STATE,
      encrypt: false
    } as StorageConfig,
    projectDrafts: {
      type: StorageType.INDEXEDDB,
      key: STORAGE_KEYS.PROJECT_DRAFTS,
      encrypt: false
    } as StorageConfig
  }

  // 初始化数据管理器
  const initialize = async () => {
    if (isInitialized.value) return

    try {
      // 初始化IndexedDB
      await IndexedDBManager.init()

      // 加载用户设置
      await loadUserSettings()
      
      // 加载应用状态
      await loadAppState()
      
      // 加载项目草稿
      await loadProjectDrafts()
      
      // 更新存储使用情况
      updateStorageUsage()
      
      // 启动自动保存
      if (userSettings.value.autoSave) {
        startAutoSave()
      }

      isInitialized.value = true
      console.log('数据管理器初始化完成')
    } catch (error) {
      console.error('数据管理器初始化失败:', error)
    }
  }

  // 加载用户设置
  const loadUserSettings = async () => {
    try {
      const settings = await StorageManager.get<UserSettings>(storageConfigs.userSettings)
      if (settings) {
        userSettings.value = { ...defaultUserSettings, ...settings }
      }
    } catch (error) {
      console.error('加载用户设置失败:', error)
    }
  }

  // 保存用户设置
  const saveUserSettings = async (settings?: Partial<UserSettings>) => {
    try {
      if (settings) {
        userSettings.value = { ...userSettings.value, ...settings }
      }
      
      const success = await StorageManager.set(storageConfigs.userSettings, userSettings.value)
      if (success) {
        lastSaveTime.value = Date.now()
        console.log('用户设置保存成功')
      }
      return success
    } catch (error) {
      console.error('保存用户设置失败:', error)
      return false
    }
  }

  // 加载应用状态
  const loadAppState = async () => {
    try {
      const state = await StorageManager.get<AppState>(storageConfigs.appState)
      if (state) {
        appState.value = { ...defaultAppState, ...state }
      }
    } catch (error) {
      console.error('加载应用状态失败:', error)
    }
  }

  // 保存应用状态
  const saveAppState = async (state?: Partial<AppState>) => {
    try {
      if (state) {
        appState.value = { ...appState.value, ...state }
      }
      
      const success = await StorageManager.set(storageConfigs.appState, appState.value)
      if (success) {
        lastSaveTime.value = Date.now()
        console.log('应用状态保存成功')
      }
      return success
    } catch (error) {
      console.error('保存应用状态失败:', error)
      return false
    }
  }

  // 加载项目草稿
  const loadProjectDrafts = async () => {
    try {
      const drafts = await IndexedDBManager.getAll<ProjectDraft>('projects')
      projectDrafts.value = drafts || []
    } catch (error) {
      console.error('加载项目草稿失败:', error)
    }
  }

  // 保存项目草稿
  const saveProjectDraft = async (draft: ProjectDraft) => {
    try {
      const success = await IndexedDBManager.set(draft.id, draft, 'projects')
      if (success) {
        const existingIndex = projectDrafts.value.findIndex(d => d.id === draft.id)
        if (existingIndex >= 0) {
          projectDrafts.value[existingIndex] = draft
        } else {
          projectDrafts.value.push(draft)
        }
        lastSaveTime.value = Date.now()
        console.log('项目草稿保存成功:', draft.name)
      }
      return success
    } catch (error) {
      console.error('保存项目草稿失败:', error)
      return false
    }
  }

  // 删除项目草稿
  const deleteProjectDraft = async (draftId: string) => {
    try {
      const success = await IndexedDBManager.remove(draftId, 'projects')
      if (success) {
        const index = projectDrafts.value.findIndex(d => d.id === draftId)
        if (index >= 0) {
          projectDrafts.value.splice(index, 1)
        }
        console.log('项目草稿删除成功')
      }
      return success
    } catch (error) {
      console.error('删除项目草稿失败:', error)
      return false
    }
  }

  // 自动保存
  let autoSaveTimer: NodeJS.Timeout | null = null
  
  const startAutoSave = () => {
    if (autoSaveTimer) {
      clearInterval(autoSaveTimer)
    }
    
    autoSaveTimer = setInterval(async () => {
      if (autoSaveEnabled.value && !saveInProgress.value) {
        await performAutoSave()
      }
    }, autoSaveInterval.value)
  }

  const stopAutoSave = () => {
    if (autoSaveTimer) {
      clearInterval(autoSaveTimer)
      autoSaveTimer = null
    }
  }

  const performAutoSave = async () => {
    try {
      saveInProgress.value = true
      await Promise.all([
        saveUserSettings(),
        saveAppState()
      ])
      console.log('自动保存完成')
    } catch (error) {
      console.error('自动保存失败:', error)
    } finally {
      saveInProgress.value = false
    }
  }

  // 更新存储使用情况
  const updateStorageUsage = () => {
    try {
      storageUsage.value = LocalStorageManager.getUsage()
    } catch (error) {
      console.error('获取存储使用情况失败:', error)
    }
  }

  // 导出所有数据
  const exportAllData = async (): Promise<ExportData | null> => {
    try {
      const workspaceStore = useWorkspaceStore()
      
      const exportData: ExportData = {
        version: '1.0.0',
        timestamp: Date.now(),
        userSettings: userSettings.value,
        appState: appState.value,
        workspaces: workspaceStore.workspaces,
        projects: [], // 这里需要从API获取
        templates: [], // 这里需要从API获取
        resources: [], // 这里需要从API获取
        textbooks: [], // 这里需要从API获取
        drafts: projectDrafts.value
      }
      
      return exportData
    } catch (error) {
      console.error('导出数据失败:', error)
      return null
    }
  }

  // 导入数据
  const importData = async (data: ExportData): Promise<boolean> => {
    try {
      // 验证数据格式
      if (!data.version || !data.timestamp) {
        throw new Error('无效的数据格式')
      }
      
      // 导入用户设置
      if (data.userSettings) {
        await saveUserSettings(data.userSettings)
      }
      
      // 导入应用状态
      if (data.appState) {
        await saveAppState(data.appState)
      }
      
      // 导入项目草稿
      if (data.drafts) {
        for (const draft of data.drafts) {
          await saveProjectDraft(draft)
        }
      }
      
      console.log('数据导入成功')
      return true
    } catch (error) {
      console.error('导入数据失败:', error)
      return false
    }
  }

  // 清除所有数据
  const clearAllData = async (): Promise<boolean> => {
    try {
      // 清除localStorage
      LocalStorageManager.clear()
      
      // 清除sessionStorage
      SessionStorageManager.clear()
      
      // 重置状态
      userSettings.value = { ...defaultUserSettings }
      appState.value = { ...defaultAppState }
      projectDrafts.value = []
      
      // 更新存储使用情况
      updateStorageUsage()
      
      console.log('所有数据已清除')
      return true
    } catch (error) {
      console.error('清除数据失败:', error)
      return false
    }
  }

  // 下载数据文件
  const downloadDataFile = async (filename?: string) => {
    try {
      const data = await exportAllData()
      if (!data) {
        throw new Error('导出数据失败')
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename || `teach-ppt-data-${new Date().toISOString().split('T')[0]}.json`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      console.log('数据文件下载成功')
      return true
    } catch (error) {
      console.error('下载数据文件失败:', error)
      return false
    }
  }

  // 从文件导入数据
  const importDataFromFile = async (file: File): Promise<boolean> => {
    try {
      const text = await file.text()
      const data = JSON.parse(text) as ExportData
      return await importData(data)
    } catch (error) {
      console.error('从文件导入数据失败:', error)
      return false
    }
  }

  return {
    // 状态
    isInitialized,
    autoSaveEnabled,
    lastSaveTime,
    saveInProgress,
    storageUsage,
    userSettings,
    appState,
    projectDrafts,
    
    // 计算属性
    isStorageAvailable,
    autoSaveInterval,
    
    // 方法
    initialize,
    loadUserSettings,
    saveUserSettings,
    loadAppState,
    saveAppState,
    loadProjectDrafts,
    saveProjectDraft,
    deleteProjectDraft,
    startAutoSave,
    stopAutoSave,
    performAutoSave,
    updateStorageUsage,
    exportAllData,
    importData,
    clearAllData,
    downloadDataFile,
    importDataFromFile
  }
})