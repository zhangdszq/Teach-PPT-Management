// Mock数据和API - 重新导出新的分离文件
// 为了保持向后兼容性，这里重新导出所有内容

// 重新导出所有类型定义
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
} from './types'

// 重新导出所有mock数据
export {
  mockWorkspaces,
  mockProjects,
  mockTextbooks,
  mockTemplates,
  mockResources
} from './mock/index'

// 重新导出所有API类
export {
  WorkspaceAPI,
  ProjectAPI,
  TextbookAPI,
  TemplateAPI,
  ResourceAPI,
  MockAPI
} from './mock/index'

// 重新导出API实例
export {
  workspaceAPI,
  projectAPI,
  textbookAPI,
  templateAPI,
  resourceAPI,
  mockAPI
} from './mock/index'