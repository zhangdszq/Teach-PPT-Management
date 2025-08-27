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
  id: number           // 改为 number 类型匹配后端 Long
  name: string         // 改为 name 匹配后端字段
  subject: string
  grade: string
  publisher: string
  coverImage: string
  workspaceId: string
  pptCount: number
  chapterCount?: number  // 添加章节数量字段
  chapterList?: Chapter[] // 添加章节列表字段
}

/**
 * 章节接口
 */
export interface Chapter {
  id: number
  name: string
  description?: string
  chapterOrder: number
  textbookId: number
  createdAt: string
  updatedAt: string
  ppts: PPT[]
}

/**
 * PPT接口
 */
export interface PPT {
  id: number
  name: string
  pptId: string
  slides: number
  filePath?: string
  thumbnail?: string
  chapterId: number
  createdAt: string
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

/**
 * 增强的模板接口
 */
export interface EnhancedTemplate {
  id: string
  templateId: string
  name: string
  templateType: string
  description: string
  subject: string
  gradeLevel: string
  layoutType: string
  visualStyle: string
  teachingPurpose: string
  difficultyLevel: 'BEGINNER' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED'
  estimatedDuration: string
  templateCategory: string
  slideData: any
  createdAt: string
  updatedAt: string
  elements: TemplateElement[]
  tags: TemplateTag[]
  thumbnail?: string
  workspaceId?: string
}

/**
 * 模板接口 - 扩展支持句子元素
 */
export interface Template {
  id: string
  templateId: string
  name: string
  description: string
  thumbnail: string
  category: string
  templateType: string
  subject: string
  gradeLevel: string
  layoutType: string
  visualStyle: string
  teachingPurpose: string
  difficultyLevel: 'BEGINNER' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED'
  estimatedDuration: string
  templateCategory: string
  tags: string[]
  elements: TemplateElement[]
  createdAt: string
  updatedAt: string
  isPopular: boolean
  downloadCount: number
}

/**
 * 模板元素接口
 */
export interface TemplateElement {
  id: number
  templateId: string
  elementType: 'vocabulary' | 'image' | 'sentence' | 'text' | 'title' | 'question' | 'projectNumber'
  elementCount: number
  elementDescription: string
  positionInfo?: {
    x: number
    y: number
    width: number
    height: number
  }
}

/**
 * 模板标签接口
 */
export interface TemplateTag {
  id: number
  templateId: string
  tag: string
}

/**
 * 模板搜索条件
 */
export interface TemplateSearchCriteria {
  keyword?: string
  subject?: string
  gradeLevel?: string
  templateCategory?: string
  difficultyLevel?: string
  elementTypes?: string[]
  tags?: string[]
  page?: number
  size?: number
}

/**
 * 模板创建/更新表单接口
 */
export interface TemplateFormData {
  name: string
  description: string
  templateType: string
  subject: string
  gradeLevel: string
  layoutType: string
  visualStyle: string
  teachingPurpose: string
  difficultyLevel: string
  estimatedDuration: string
  templateCategory: string
  tags: string[]
  elements: Omit<TemplateElement, 'id' | 'templateId'>[]
  slideData?: any
}

/**
 * 模板搜索条件
 */
export interface TemplateSearchParams {
  keyword?: string
  subject?: string
  gradeLevel?: string
  templateCategory?: string
  difficultyLevel?: string
  elementTypes?: string[]
  tags?: string[]
  workspaceId?: string
  page?: number
  size?: number
}

/**
 * 课程类型枚举
 */
export enum LessonType {
  VOCABULARY_SENTENCE = 'VOCABULARY_SENTENCE',
  SCENARIO_BASED = 'SCENARIO_BASED',
  GRAMMAR_FOCUSED = 'GRAMMAR_FOCUSED',
  CONVERSATION = 'CONVERSATION',
  READING_COMPREHENSION = 'READING_COMPREHENSION'
}

/**
 * 词汇接口
 */
export interface Vocabulary {
  id: number
  word: string
  translation?: string
  phonetic?: string
  wordOrder: number
  lessonId: number
  createdAt: string
  updatedAt: string
}

/**
 * 句子接口
 */
export interface Sentence {
  id: number
  content: string
  translation?: string
  sentenceOrder: number
  lessonId: number
  createdAt: string
  updatedAt: string
}

/**
 * 单元接口 (替换原有的 Chapter)
 */
export interface Unit {
  id: number
  name: string
  description?: string
  unitOrder: number
  textbookId: number
  createdAt: string
  updatedAt: string
  lessons: Lesson[]
}

/**
 * 课程接口
 */
export interface Lesson {
  id: number
  name: string
  description?: string
  lessonType: LessonType
  lessonOrder: number
  unitId: number
  vocabularies: Vocabulary[]  // 词汇列表
  sentences: Sentence[]       // 句子列表
  scenarios: string[]         // 场景列表
  pptId?: number             // 关联的PPT ID
  createdAt: string
  updatedAt: string
}

/**
 * 教材接口 (更新)
 */
export interface Textbook {
  id: number
  name: string
  subject: string
  grade: string
  publisher: string
  coverImage: string
  workspaceId: string
  pptCount: number
  unitCount?: number     // 单元数量字段
  unitList?: Unit[]      // 单元列表字段
}

/**
 * PPT接口 (更新)
 */
export interface PPT {
  id: number
  name: string
  pptId: string
  slides: number
  filePath?: string
  thumbnail?: string
  lessonId?: number     // 关联的课程ID
  createdAt: string
}

/**
 * Prompt信息接口
 */
export interface PromptInfo {
  id: number
  promType: string // Prompt类型(system-系统/user-用户/assistant-助手/custom-自定义)
  prompt: string   // Prompt内容
}

/**
 * Prompt表单接口
 */
export interface PromptForm {
  promType: string // Prompt类型
  prompt: string   // Prompt内容
}