import axios from 'axios'
import type { Textbook, Unit, Lesson, PPT, LessonType } from './types'

// API基础URL
const API_BASE_URL = 'http://localhost:3001/api'

/**
 * 教材API接口
 */
export interface TextbookAPI {
  // 教材相关
  getTextbooks(workspaceId: string): Promise<Textbook[]>
  createTextbook(textbook: Omit<Textbook, 'id' | 'lastUpdated' | 'unitList'>): Promise<Textbook>
  updateTextbook(id: number, textbook: Partial<Textbook>): Promise<Textbook>
  deleteTextbook(id: number): Promise<void>
  getTextbookDetail(id: number): Promise<Textbook>
  
  // 单元相关
  getTextbookUnits(textbookId: number): Promise<Unit[]>
  createUnit(textbookId: number, unit: Omit<Unit, 'id' | 'lessons'>): Promise<Unit>
  updateUnit(unitId: number, unit: Partial<Unit>): Promise<Unit>
  deleteUnit(unitId: number): Promise<void>
  
  // 课程相关
  getUnitLessons(unitId: number): Promise<Lesson[]>
  createLesson(unitId: number, lesson: Omit<Lesson, 'id'>): Promise<Lesson>
  updateLesson(lessonId: number, lesson: Partial<Lesson>): Promise<Lesson>
  deleteLesson(lessonId: number): Promise<void>
  getLessonDetail(lessonId: number): Promise<Lesson>
  
  // PPT关联
  getAvailablePPTs(workspaceId?: string): Promise<PPT[]>
  associatePPTWithLesson(lessonId: number, pptId: number): Promise<void>
  dissociatePPTFromLesson(lessonId: number): Promise<void>
}

/**
 * 教材API实现
 */
export const textbookAPI: TextbookAPI = {
  // 教材相关方法
  async getTextbooks(workspaceId: string): Promise<Textbook[]> {
    const response = await axios.get(`${API_BASE_URL}/textbooks`, {
      params: { workspaceId }
    })
    return response.data.data
  },

  async createTextbook(textbook: Omit<Textbook, 'id' | 'lastUpdated' | 'unitList'>): Promise<Textbook> {
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

  // 单元相关方法
  async getTextbookUnits(textbookId: number): Promise<Unit[]> {
    const response = await axios.get(`${API_BASE_URL}/textbooks/${textbookId}/units`)
    return response.data.data
  },

  async createUnit(textbookId: number, unit: Omit<Unit, 'id' | 'lessons'>): Promise<Unit> {
    const response = await axios.post(`${API_BASE_URL}/textbooks/${textbookId}/units`, unit)
    return response.data.data
  },

  async updateUnit(unitId: number, unit: Partial<Unit>): Promise<Unit> {
    const response = await axios.put(`${API_BASE_URL}/textbooks/units/${unitId}`, unit)
    return response.data.data
  },

  async deleteUnit(unitId: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/textbooks/units/${unitId}`)
  },

  // 课程相关方法
  async getUnitLessons(unitId: number): Promise<Lesson[]> {
    const response = await axios.get(`${API_BASE_URL}/textbooks/units/${unitId}/lessons`)
    return response.data.data
  },

  async createLesson(unitId: number, lesson: Omit<Lesson, 'id'>): Promise<Lesson> {
    const response = await axios.post(`${API_BASE_URL}/textbooks/units/${unitId}/lessons`, lesson)
    return response.data.data
  },

  async updateLesson(lessonId: number, lesson: Partial<Lesson>): Promise<Lesson> {
    const response = await axios.put(`${API_BASE_URL}/textbooks/lessons/${lessonId}`, lesson)
    return response.data.data
  },

  async deleteLesson(lessonId: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/textbooks/lessons/${lessonId}`)
  },

  async getLessonDetail(lessonId: number): Promise<Lesson> {
    const response = await axios.get(`${API_BASE_URL}/textbooks/lessons/${lessonId}`)
    return response.data.data
  },

  // PPT关联方法
  async getAvailablePPTs(workspaceId?: string): Promise<PPT[]> {
    const url = workspaceId 
      ? `${API_BASE_URL}/ppts?workspaceId=${workspaceId}`
      : `${API_BASE_URL}/ppts`
    const response = await axios.get(url)
    return response.data.data
  },

  async associatePPTWithLesson(lessonId: number, pptId: number): Promise<void> {
    await axios.post(`${API_BASE_URL}/lessons/${lessonId}/associate-ppt`, { pptId })
  },

  async dissociatePPTFromLesson(lessonId: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/lessons/${lessonId}/dissociate-ppt`)
  }
}