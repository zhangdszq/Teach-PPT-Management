import axios from 'axios'
import type { Template, TemplateElement, TemplateTag, TemplateFormData } from './types'
import { API_BASE_URL } from './config';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('模板管理API请求错误:', error)
    return Promise.reject(error)
  }
)

// API响应接口
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

// 分页响应接口
export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number
  page: number
  size: number
}

/**
 * 获取模板列表
 */
export const getTemplates = async (params: {
  page?: number
  size?: number
  subject?: string
  gradeLevel?: string
  templateCategory?: string
  difficultyLevel?: string
  keyword?: string
  workspaceId?: string
}): Promise<PaginatedResponse<Template[]>> => {
  return await api.get('/ppt/management/templates', { params })
}

/**
 * 根据ID获取模板详情
 */
export const getTemplateById = async (id: string): Promise<ApiResponse<Template>> => {
  return await api.get(`/ppt/management/templates/${id}`)
}

/**
 * 创建模板
 */
export const createTemplate = async (templateData: TemplateFormData): Promise<ApiResponse<Template>> => {
  return await api.post('/ppt/management/templates', templateData)
}

/**
 * 更新模板
 */
export const updateTemplate = async (id: string, templateData: Partial<TemplateFormData>): Promise<ApiResponse<Template>> => {
  return await api.put(`/ppt/management/templates/${id}`, templateData)
}

/**
 * 删除模板
 */
export const deleteTemplate = async (id: string): Promise<ApiResponse> => {
  return await api.delete(`/ppt/management/templates/${id}`)
}

/**
 * 批量删除模板
 */
export const batchDeleteTemplates = async (ids: string[]): Promise<ApiResponse> => {
  return await api.post('/ppt/management/templates/batch-delete', { ids })
}



/**
 * 获取模板元素列表
 */
export const getTemplateElements = async (templateId: string): Promise<ApiResponse<TemplateElement[]>> => {
  return await api.get(`/ppt/management/templates/${templateId}/elements`)
}

/**
 * 更新模板元素
 */
export const updateTemplateElements = async (templateId: string, elements: TemplateElement[]): Promise<ApiResponse> => {
  return await api.put(`/ppt/management/templates/${templateId}/elements`, { elements })
}

/**
 * 获取模板标签
 */
export const getTemplateTags = async (templateId: string): Promise<ApiResponse<TemplateTag[]>> => {
  return await api.get(`/ppt/management/templates/${templateId}/tags`)
}

/**
 * 更新模板标签
 */
export const updateTemplateTags = async (templateId: string, tags: string[]): Promise<ApiResponse> => {
  return await api.put(`/ppt/management/templates/${templateId}/tags`, { tags })
}

/**
 * 获取所有可用的标签
 */
export const getAllTags = async (): Promise<ApiResponse<string[]>> => {
  return await api.get('/ppt/management/templates/tags')
}

/**
 * 获取模板筛选选项
 */
export const getTemplateFilterOptions = async (): Promise<ApiResponse<{
  templateTypes: string[]
  subjects: string[]
  gradeLevels: string[]
  templateCategories: string[]
}>> => {
  return await api.get('/ppt/management/templates/filter-options')
}

/**
 * 使用模板生成PPT
 */
export const useTemplate = async (templateId: string, aiData: any): Promise<ApiResponse<any>> => {
  return await api.post(`/ppt/management/templates/${templateId}/use`, aiData)
}

/**
 * 获取模板统计信息
 */
export const getTemplateStats = async (workspaceId?: string): Promise<ApiResponse<{
  total: number
  byCategory: Record<string, number>
  bySubject: Record<string, number>
  byDifficulty: Record<string, number>
  recentlyCreated: number
}>> => {
  return await api.get('/ppt/management/templates/stats', { params: { workspaceId } })
}

/**
 * 获取工作空间统计信息
 */
export const getWorkspaceStats = async (workspaceId: string): Promise<ApiResponse<{
  textbooks: number
  ppts: number
  templates: number
  resources: number
}>> => {
  return await api.get(`/ppt/management/workspace-stats/${workspaceId}`)
}

/**
 * 获取PPT列表
 */
export const getPptList = async (params: {
  status?: string // all/draft/published/archived
  page?: number
  size?: number
  workspaceId?: string
}): Promise<ApiResponse<{
  list: Array<{
    id: string
    name: string
    subject: string
    chapter: string
    slides: number
    createdAt: string
    status: string
    workspaceId: string
    thumbnail?: string
  }>
  total: number
  page: number
  size: number
}>> => {
  return await api.get('/ppt/management/list', { params })
}

/**
 * 导出模板
 */
export const exportTemplate = async (id: string): Promise<ApiResponse<{ downloadUrl: string }>> => {
  return await api.get(`/ppt/management/templates/${id}/export`)
}

/**
 * 导入模板
 */
export const importTemplate = async (file: File, workspaceId?: string): Promise<ApiResponse<Template>> => {
  const formData = new FormData()
  formData.append('file', file)
  if (workspaceId) {
    formData.append('workspaceId', workspaceId)
  }
  
  return await api.post('/ppt/management/templates/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  batchDeleteTemplates,
  getTemplateElements,
  updateTemplateElements,
  getTemplateTags,
  updateTemplateTags,
  getAllTags,
  getTemplateStats,
  getWorkspaceStats,
  getPptList,
  exportTemplate,
  importTemplate
}