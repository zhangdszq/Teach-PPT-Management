// PPT管理相关的API接口
import axios from 'axios'

// 配置axios基础URL
const API_BASE_URL = 'http://localhost:3001/api/ppt/management'

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
    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

// PPT状态类型
export type PPTStatus = 'draft' | 'published' | 'archived' | 'deleted'

// PPT信息接口
export interface PPTInfo {
  pptId: string
  title: string
  description?: string
  textbook?: string
  grade?: string
  chapter?: string
  slideCount: number
  status: PPTStatus
  createdAt: string
  updatedAt: string
  createdBy?: string
}

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
 * 发布PPT
 * @param pptId PPT ID
 */
export const publishPPT = async (pptId: string): Promise<ApiResponse> => {
  return await api.post(`/publish/${pptId}`)
}

/**
 * 归档PPT
 * @param pptId PPT ID
 */
export const archivePPT = async (pptId: string): Promise<ApiResponse> => {
  return await api.post(`/archive/${pptId}`)
}

/**
 * 设置PPT为草稿状态
 * @param pptId PPT ID
 */
export const setDraftPPT = async (pptId: string): Promise<ApiResponse> => {
  return await api.post(`/draft/${pptId}`)
}

/**
 * 获取PPT列表（按状态筛选）
 * @param params 查询参数
 */
export const getPPTList = async (params: {
  status?: 'all' | PPTStatus
  page?: number
  size?: number
}): Promise<PaginatedResponse<PPTInfo[]>> => {
  const { status = 'all', page = 1, size = 10 } = params
  return await api.get('/list', {
    params: { status, page, size }
  })
}

/**
 * 获取PPT详细信息
 * @param pptId PPT ID
 */
export const getPPTDetail = async (pptId: string): Promise<ApiResponse<PPTInfo>> => {
  return await api.get(`/detail/${pptId}`)
}

/**
 * 批量发布PPT
 * @param pptIds PPT ID数组
 */
export const batchPublishPPTs = async (pptIds: string[]): Promise<ApiResponse> => {
  const promises = pptIds.map(id => publishPPT(id))
  const results = await Promise.allSettled(promises)
  
  const successCount = results.filter(result => 
    result.status === 'fulfilled' && result.value.success
  ).length
  
  return {
    success: successCount === pptIds.length,
    message: `成功发布 ${successCount}/${pptIds.length} 个PPT`
  }
}

/**
 * 批量归档PPT
 * @param pptIds PPT ID数组
 */
export const batchArchivePPTs = async (pptIds: string[]): Promise<ApiResponse> => {
  const promises = pptIds.map(id => archivePPT(id))
  const results = await Promise.allSettled(promises)
  
  const successCount = results.filter(result => 
    result.status === 'fulfilled' && result.value.success
  ).length
  
  return {
    success: successCount === pptIds.length,
    message: `成功归档 ${successCount}/${pptIds.length} 个PPT`
  }
}

/**
 * 批量设置PPT为草稿
 * @param pptIds PPT ID数组
 */
export const batchSetDraftPPTs = async (pptIds: string[]): Promise<ApiResponse> => {
  const promises = pptIds.map(id => setDraftPPT(id))
  const results = await Promise.allSettled(promises)
  
  const successCount = results.filter(result => 
    result.status === 'fulfilled' && result.value.success
  ).length
  
  return {
    success: successCount === pptIds.length,
    message: `成功设置 ${successCount}/${pptIds.length} 个PPT为草稿`
  }
}

/**
 * 批量删除PPT
 * @param pptIds PPT ID数组
 */
export const batchDeletePPT = async (pptIds: string[]): Promise<ApiResponse> => {
  return await api.post('/batch/delete', { pptIds })
}

/**
 * 批量更新PPT状态
 * @param params 包含PPT ID数组和目标状态
 */
export const batchUpdatePPTStatus = async (params: { pptIds: string[], status: PPTStatus }): Promise<ApiResponse> => {
  return await api.post('/batch/status', params)
}

/**
 * 复制PPT
 * @param pptId PPT ID
 */
export const duplicatePPT = async (pptId: string): Promise<ApiResponse> => {
  return await api.post(`/duplicate/${pptId}`)
}

/**
 * 下载PPT
 * @param pptId PPT ID
 */
export const downloadPPT = async (pptId: string): Promise<ApiResponse<{ downloadUrl: string }>> => {
  return await api.get(`/download/${pptId}`)
}

/**
 * 分享PPT
 * @param pptId PPT ID
 */
export const sharePPT = async (pptId: string): Promise<ApiResponse<{ shareUrl: string }>> => {
  return await api.post(`/share/${pptId}`)
}

/**
 * 获取PPT详情（别名方法）
 * @param pptId PPT ID
 */
export const getPPTDetails = async (pptId: string): Promise<ApiResponse<PPTInfo>> => {
  return getPPTDetail(pptId)
}

/**
 * 导出PPT列表
 * @param params 导出参数
 */
export const exportPPTList = async (params: {
  status?: string
  subject?: string
  searchQuery?: string
}): Promise<ApiResponse<{ downloadUrl: string }>> => {
  return await api.post('/export', params)
}

export default {
  publishPPT,
  archivePPT,
  setDraftPPT,
  getPPTList,
  getPPTDetail,
  batchPublishPPTs,
  batchArchivePPTs,
  batchSetDraftPPTs,
  batchDeletePPT,
  batchUpdatePPTStatus,
  duplicatePPT,
  downloadPPT,
  sharePPT,
  getPPTDetails,
  exportPPTList
}