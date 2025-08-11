import axios from 'axios'
import type { Textbook, Chapter, PPT } from './types'

// API基础URL - 修正为正确的端口
const API_BASE_URL = 'http://localhost:3001/api'

// 教材API接口
export interface TextbookAPI {
  // 获取教材列表
  getTextbooks(workspaceId: string): Promise<Textbook[]>
  // 创建教材
  createTextbook(textbook: Omit<Textbook, 'id' | 'lastUpdated' | 'chapterList'>): Promise<Textbook>
  // 更新教材
  updateTextbook(id: number, textbook: Partial<Textbook>): Promise<Textbook>
  // 删除教材
  deleteTextbook(id: number): Promise<void>
  // 获取教材详情
  getTextbookDetail(id: number): Promise<Textbook>
  // 获取教材章节
  getTextbookChapters(textbookId: number): Promise<Chapter[]>
  // 创建章节
  createChapter(textbookId: number, chapter: Omit<Chapter, 'id' | 'ppts'>): Promise<Chapter>
  // 删除章节
  deleteChapter(chapterId: number): Promise<void>
}

// 教材API实现
export const textbookAPI: TextbookAPI = {
  async getTextbooks(workspaceId: string): Promise<Textbook[]> {
    const response = await axios.get(`${API_BASE_URL}/textbooks`, {
      params: { workspaceId }
    })
    return response.data.data
  },

  async createTextbook(textbook: Omit<Textbook, 'id' | 'lastUpdated' | 'chapterList'>): Promise<Textbook> {
    const response = await axios.post(`${API_BASE_URL}/textbooks`, textbook)
    return response.data.data
  },

  async updateTextbook(id: number, textbook: Partial<Textbook>): Promise<Textbook> {
    const response = await axios.put(`${API_BASE_URL}/textbooks/${id}`, textbook)
    return response.data.data
  },

  async deleteTextbook(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/textbooks/${id}`)
  },

  async getTextbookDetail(id: number): Promise<Textbook> {
    const response = await axios.get(`${API_BASE_URL}/textbooks/${id}`)
    return response.data.data
  },

  async getTextbookChapters(textbookId: number): Promise<Chapter[]> {
    const response = await axios.get(`${API_BASE_URL}/textbooks/${textbookId}/chapters`)
    return response.data.data
  },

  async createChapter(textbookId: number, chapter: Omit<Chapter, 'id' | 'ppts'>): Promise<Chapter> {
    const response = await axios.post(`${API_BASE_URL}/textbooks/${textbookId}/chapters`, chapter)
    return response.data.data
  },

  async deleteChapter(chapterId: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/chapters/${chapterId}`)
  }
}