// 数据类型定义文件
// 包含所有业务相关的接口定义

/**
 * 工作空间接口
 */
export interface Workspace {
  id: string
  name: string
  description: string
  memberCount: number
  pptCount: number
  textbookCount: number
  templateCount: number
  resourceCount: number
  role: 'owner' | 'admin' | 'member'
  lastActivity: string
  createdAt: string
  recentMembers: Array<{
    id: string
    name: string
    avatar: string
  }>
}

/**
 * 项目接口
 */
export interface Project {
  id: string
  name: string
  subject: string
  chapter: string
  slides: number
  createdAt: string
  workspaceId: string
  thumbnail: string
  status: 'draft' | 'published' | 'archived'
}

/**
 * 教材接口
 */
export interface Textbook {
  id: string
  title: string
  subject: string
  grade: string
  publisher: string
  coverImage: string
  workspaceId: string
  pptCount: number
}

/**
 * 模板接口
 */
export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  category: string
  tags: string[]
  createdAt: string
  isPopular: boolean
  downloadCount: number
}

/**
 * 资源接口
 */
export interface Resource {
  id: string
  name: string
  type: 'template' | 'image' | 'video' | 'document' | 'workflow' | 'code'
  size: string
  uploadDate: string
  workspaceId: string
  url?: string
  thumbnail?: string
}

/**
 * 创建表单数据接口
 */
export interface CreateFormData {
  topic: string
  pages: string
  style: string
  description: string
  includeCharts: boolean
  includeImages: boolean
  includeAnimations: boolean
}

/**
 * 生成的PPT接口
 */
export interface GeneratedPPT {
  id: string
  name: string
  subject: string
  chapter: string
  slides: number
  createdAt: string
  workspaceId: string
  thumbnail: string
}

/**
 * 用户设置接口
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto'
  language: 'zh-CN' | 'en-US'
  autoSave: boolean
  autoSaveInterval: number // 分钟
  notifications: boolean
  soundEffects: boolean
}

/**
 * 应用状态接口
 */
export interface AppState {
  lastActiveWorkspace: string
  recentProjects: string[]
  favoriteTemplates: string[]
  viewMode: 'grid' | 'list'
  sidebarCollapsed: boolean
}

/**
 * 项目草稿接口
 */
export interface ProjectDraft {
  id: string
  name: string
  content: any
  lastModified: number
  workspaceId: string
}

/**
 * 数据导出格式接口
 */
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

/**
 * 统计数据接口
 */
export interface WorkspaceStats {
  workspaces: number
  textbooks: number
  ppts: number
  templates: number
  resources: number
}