// Mock API 统一入口文件
// 整合所有的mock数据和API方法

// 导入所有API类
export { WorkspaceAPI, workspaceAPI } from './workspaces'
export { ProjectAPI, projectAPI } from './projects'
export { TextbookAPI, textbookAPI } from './textbooks'
export { TemplateAPI, templateAPI } from './templates'
export { ResourceAPI, resourceAPI } from './resources'

// 导入所有mock数据
export { mockWorkspaces } from './workspaces'
export { mockProjects } from './projects'
export { mockTextbooks } from './textbooks'
export { mockTemplates } from './templates'
export { mockResources } from './resources'

// 导入类型定义
export type {
  Workspace,
  Project,
  Textbook,
  Template,
  Resource,
  CreateFormData,
  GeneratedPPT,
  UserSettings,
  AppState,
  ProjectDraft,
  ExportData,
  WorkspaceStats
} from '../types'

// 导入具体的API实例
import { workspaceAPI } from './workspaces'
import { projectAPI } from './projects'
import { textbookAPI } from './textbooks'
import { templateAPI } from './templates'
import { resourceAPI } from './resources'
import type { Workspace, Project, Textbook, Template, Resource } from '../types'

/**
 * 统一的Mock API类
 * 提供所有业务功能的统一接口
 */
export class MockAPI {
  // API实例
  public workspace = workspaceAPI
  public project = projectAPI
  public textbook = textbookAPI
  public template = templateAPI
  public resource = resourceAPI

  /**
   * 初始化所有数据
   */
  async initialize(): Promise<void> {
    // 这里可以添加初始化逻辑
    console.log('Mock API initialized')
  }

  /**
   * 重置所有数据到初始状态
   */
  async reset(): Promise<void> {
    // 重新创建所有API实例以重置数据
    this.workspace = new (await import('./workspaces')).WorkspaceAPI()
    this.project = new (await import('./projects')).ProjectAPI()
    this.textbook = new (await import('./textbooks')).TextbookAPI()
    this.template = new (await import('./templates')).TemplateAPI()
    this.resource = new (await import('./resources')).ResourceAPI()
    console.log('Mock API data reset')
  }

  // 便捷方法 - 工作空间
  async getWorkspaces() {
    return this.workspace.getWorkspaces()
  }

  async getWorkspaceById(id: string) {
    return this.workspace.getWorkspaceById(id)
  }

  async createWorkspace(workspace: Omit<Workspace, 'id'>) {
    return this.workspace.createWorkspace(workspace)
  }

  async updateWorkspace(id: string, updates: Partial<Workspace>) {
    return this.workspace.updateWorkspace(id, updates)
  }

  async deleteWorkspace(id: string) {
    return this.workspace.deleteWorkspace(id)
  }

  // 便捷方法 - 项目
  async getProjectsByWorkspace(workspaceId: string) {
    return this.project.getProjectsByWorkspace(workspaceId)
  }

  async getProjectById(id: string) {
    return this.project.getProjectById(id)
  }

  async createProject(project: Omit<Project, 'id'>) {
    return this.project.createProject(project)
  }

  async updateProject(id: string, updates: Partial<Project>) {
    return this.project.updateProject(id, updates)
  }

  async deleteProject(id: string) {
    return this.project.deleteProject(id)
  }

  // 便捷方法 - 教材
  async getTextbooksByWorkspace(workspaceId: string) {
    return this.textbook.getTextbooksByWorkspace(workspaceId)
  }

  async getTextbookById(id: string) {
    return this.textbook.getTextbookById(id)
  }

  async createTextbook(textbook: Omit<Textbook, 'id'>) {
    return this.textbook.createTextbook(textbook)
  }

  async updateTextbook(id: string, updates: Partial<Textbook>) {
    return this.textbook.updateTextbook(id, updates)
  }

  async deleteTextbook(id: string) {
    return this.textbook.deleteTextbook(id)
  }

  // 便捷方法 - 模板
  async getAllTemplates() {
    return this.template.getAllTemplates()
  }

  async getTemplateById(id: string) {
    return this.template.getTemplateById(id)
  }

  async createTemplate(template: Omit<Template, 'id' | 'createdAt' | 'downloadCount'>) {
    return this.template.createTemplate(template)
  }

  async updateTemplate(id: string, updates: Partial<Template>) {
    return this.template.updateTemplate(id, updates)
  }

  async deleteTemplate(id: string) {
    return this.template.deleteTemplate(id)
  }

  // 便捷方法 - 资源
  async getResourcesByWorkspace(workspaceId: string) {
    return this.resource.getResourcesByWorkspace(workspaceId)
  }

  async getResourceById(id: string) {
    return this.resource.getResourceById(id)
  }

  async uploadResource(resource: Omit<Resource, 'id' | 'uploadDate'>) {
    return this.resource.uploadResource(resource)
  }

  async updateResource(id: string, updates: Partial<Resource>) {
    return this.resource.updateResource(id, updates)
  }

  async deleteResource(id: string) {
    return this.resource.deleteResource(id)
  }

  // 便捷方法 - 工作空间统计
  async getWorkspaceStats(workspaceId: string) {
    return this.workspace.getWorkspaceStats(workspaceId)
  }

  /**
   * 获取全局统计信息
   */
  async getGlobalStats(): Promise<{
    workspaces: number
    projects: number
    textbooks: number
    templates: number
    resources: number
  }> {
    const [workspaces, projects, textbooks, templates, resources] = await Promise.all([
      this.workspace.getWorkspaces(),
      this.project.getProjectsByWorkspace(''), // 获取所有项目
      this.textbook.searchTextbooks(''), // 获取所有教材
      this.template.getAllTemplates(),
      this.resource.searchResources('') // 获取所有资源
    ])

    return {
      workspaces: workspaces.length,
      projects: projects.length,
      textbooks: textbooks.length,
      templates: templates.length,
      resources: resources.length
    }
  }

  /**
   * 搜索所有类型的内容
   */
  async globalSearch(query: string, workspaceId?: string): Promise<{
    projects: Project[]
    textbooks: Textbook[]
    templates: Template[]
    resources: Resource[]
  }> {
    const [projects, textbooks, templates, resources] = await Promise.all([
      this.project.searchProjects(query, workspaceId),
      this.textbook.searchTextbooks(query, workspaceId),
      this.template.searchTemplates(query),
      this.resource.searchResources(query, workspaceId)
    ])

    return {
      projects,
      textbooks,
      templates,
      resources
    }
  }

  /**
   * 获取最近活动
   */
  async getRecentActivity(workspaceId?: string, limit: number = 20): Promise<Array<{
    id: string
    type: 'project' | 'textbook' | 'template' | 'resource'
    name: string
    action: 'created' | 'updated' | 'deleted'
    timestamp: string
    workspaceId?: string
  }>> {
    // 这里可以实现更复杂的活动记录逻辑
    // 目前返回模拟数据
    const activities = [
      {
        id: '1',
        type: 'project' as const,
        name: '英语第一课：Hello World',
        action: 'created' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30分钟前
        workspaceId: '1'
      },
      {
        id: '2',
        type: 'template' as const,
        name: '简约商务风格',
        action: 'updated' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2小时前
        workspaceId: '1'
      },
      {
        id: '3',
        type: 'resource' as const,
        name: '公司Logo.png',
        action: 'created' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4小时前
        workspaceId: '1'
      }
    ]

    let filtered = activities
    if (workspaceId) {
      filtered = activities.filter(a => a.workspaceId === workspaceId)
    }

    return filtered.slice(0, limit)
  }
}

// 导出单例实例
export const mockAPI = new MockAPI()

// 默认导出
export default mockAPI