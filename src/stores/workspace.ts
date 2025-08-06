import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockAPI, type Workspace } from '@/api/mock'

export { type Workspace } from '@/api/mock'

export const useWorkspaceStore = defineStore('workspace', () => {
  const currentWorkspaceId = ref<string>('1')
  const workspaces = ref<Workspace[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 初始化工作空间数据
  const initWorkspaces = async () => {
    try {
      loading.value = true
      error.value = null
      const data = await mockAPI.getWorkspaces()
      workspaces.value = data
    } catch (err) {
      error.value = '获取工作空间数据失败'
      console.error('Failed to load workspaces:', err)
    } finally {
      loading.value = false
    }
  }

  // 计算属性
  const currentWorkspace = computed(() => 
    workspaces.value.find(w => w.id === currentWorkspaceId.value) || null
  )
  
  const currentWorkspaceName = computed(() => 
    currentWorkspace.value?.name || '未选择工作空间'
  )

  // 切换工作空间
  const switchWorkspace = (workspaceId: string) => {
    currentWorkspaceId.value = workspaceId
    localStorage.setItem('currentWorkspaceId', workspaceId)
  }

  // 添加工作空间
  const addWorkspace = async (workspaceData: Omit<Workspace, 'id'>) => {
    try {
      loading.value = true
      error.value = null
      const newWorkspace = await mockAPI.createWorkspace(workspaceData)
      workspaces.value.push(newWorkspace)
      return newWorkspace
    } catch (err) {
      error.value = '创建工作空间失败'
      console.error('Failed to create workspace:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 更新工作空间
  const updateWorkspace = async (workspaceId: string, updates: Partial<Workspace>) => {
    try {
      loading.value = true
      error.value = null
      const updatedWorkspace = await mockAPI.updateWorkspace(workspaceId, updates)
      const index = workspaces.value.findIndex(w => w.id === workspaceId)
      if (index !== -1) {
        workspaces.value[index] = updatedWorkspace
      }
      return updatedWorkspace
    } catch (err) {
      error.value = '更新工作空间失败'
      console.error('Failed to update workspace:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 删除工作空间
  const removeWorkspace = async (workspaceId: string) => {
    try {
      loading.value = true
      error.value = null
      await mockAPI.deleteWorkspace(workspaceId)
      const index = workspaces.value.findIndex(w => w.id === workspaceId)
      if (index !== -1) {
        workspaces.value.splice(index, 1)
      }
      // 如果删除的是当前工作空间，切换到第一个工作空间
      if (currentWorkspaceId.value === workspaceId && workspaces.value.length > 0) {
        switchWorkspace(workspaces.value[0].id)
      }
    } catch (err) {
      error.value = '删除工作空间失败'
      console.error('Failed to delete workspace:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 初始化
  const initialize = async () => {
    await initWorkspaces()
    
    // 从本地存储恢复当前工作空间
    const savedWorkspaceId = localStorage.getItem('currentWorkspaceId')
    if (savedWorkspaceId && workspaces.value.find(w => w.id === savedWorkspaceId)) {
      currentWorkspaceId.value = savedWorkspaceId
    } else if (workspaces.value.length > 0) {
      // 如果没有保存的工作空间或找不到，默认选择第一个
      switchWorkspace(workspaces.value[0].id)
    }
  }

  return {
    // 状态
    currentWorkspaceId,
    workspaces,
    loading,
    error,
    
    // 计算属性
    currentWorkspace,
    currentWorkspaceName,
    
    // 方法
    initWorkspaces,
    switchWorkspace,
    addWorkspace,
    updateWorkspace,
    removeWorkspace,
    initialize
  }
})