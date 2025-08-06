// 工作空间相关的Mock数据
import type { Workspace } from '../types'

/**
 * 工作空间Mock数据
 */
export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: '英语教研室',
    description: '小学初中英语教学团队工作空间',
    memberCount: 15,
    pptCount: 9,
    textbookCount: 9,
    templateCount: 6,
    resourceCount: 40,
    role: 'owner',
    lastActivity: '30分钟前',
    createdAt: '2024-02-25',
    recentMembers: [
      { id: '1', name: 'Smith老师', avatar: '#3B82F6' },
      { id: '2', name: '李英老师', avatar: '#10B981' },
      { id: '3', name: '王英老师', avatar: '#EC4899' }
    ]
  },
  {
    id: '2',
    name: '数学教研室',
    description: '小学初中数学教学团队工作空间',
    memberCount: 12,
    pptCount: 15,
    textbookCount: 8,
    templateCount: 8,
    resourceCount: 35,
    role: 'admin',
    lastActivity: '1小时前',
    createdAt: '2024-03-10',
    recentMembers: [
      { id: '4', name: '张数老师', avatar: '#F59E0B' },
      { id: '5', name: '李算老师', avatar: '#8B5CF6' },
      { id: '6', name: '王几老师', avatar: '#EF4444' }
    ]
  },
  {
    id: '3',
    name: '语文教研室',
    description: '小学初中语文教学团队工作空间',
    memberCount: 18,
    pptCount: 12,
    textbookCount: 10,
    templateCount: 10,
    resourceCount: 50,
    role: 'member',
    lastActivity: '2小时前',
    createdAt: '2024-01-15',
    recentMembers: [
      { id: '7', name: '陈文老师', avatar: '#10B981' },
      { id: '8', name: '刘字老师', avatar: '#EC4899' },
      { id: '9', name: '赵语老师', avatar: '#3B82F6' }
    ]
  }
]

/**
 * 工作空间相关的API方法
 */
export class WorkspaceAPI {
  private workspaces: Workspace[] = [...mockWorkspaces]

  /**
   * 获取所有工作空间
   */
  async getWorkspaces(): Promise<Workspace[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return [...this.workspaces]
  }

  /**
   * 根据ID获取工作空间
   */
  async getWorkspaceById(id: string): Promise<Workspace | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.workspaces.find(w => w.id === id) || null
  }

  /**
   * 创建工作空间
   */
  async createWorkspace(workspace: Omit<Workspace, 'id'>): Promise<Workspace> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const newWorkspace: Workspace = {
      ...workspace,
      id: Date.now().toString()
    }
    this.workspaces.push(newWorkspace)
    return newWorkspace
  }

  /**
   * 更新工作空间
   */
  async updateWorkspace(id: string, updates: Partial<Workspace>): Promise<Workspace | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.workspaces.findIndex(w => w.id === id)
    if (index === -1) return null
    
    this.workspaces[index] = { ...this.workspaces[index], ...updates }
    return this.workspaces[index]
  }

  /**
   * 删除工作空间
   */
  async deleteWorkspace(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.workspaces.findIndex(w => w.id === id)
    if (index === -1) return false
    
    this.workspaces.splice(index, 1)
    return true
  }

  /**
   * 获取工作空间统计数据
   */
  async getWorkspaceStats(workspaceId: string) {
    await new Promise(resolve => setTimeout(resolve, 100))
    const workspace = this.workspaces.find(w => w.id === workspaceId)
    if (!workspace) return null
    
    return {
      workspaces: this.workspaces.length,
      textbooks: workspace.textbookCount,
      ppts: workspace.pptCount,
      templates: workspace.templateCount,
      resources: workspace.resourceCount
    }
  }
}

// 导出单例实例
export const workspaceAPI = new WorkspaceAPI()