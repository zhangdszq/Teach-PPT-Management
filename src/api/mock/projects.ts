// 项目相关的Mock数据
import type { Project } from '../types'

/**
 * 项目Mock数据
 */
export const mockProjects: Project[] = [
  // 1年级英语项目
  {
    id: '1',
    name: 'Hello! 认识新朋友',
    subject: '英语',
    chapter: 'Unit 1 Hello',
    slides: 12,
    createdAt: '2024-12-15',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600',
    status: 'published'
  },
  {
    id: '2',
    name: '我的家庭 My Family',
    subject: '英语',
    chapter: 'Unit 2 My Family',
    slides: 15,
    createdAt: '2024-12-16',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-green-500 to-blue-600',
    status: 'published'
  },
  {
    id: '3',
    name: '颜色世界 Colors',
    subject: '英语',
    chapter: 'Unit 3 Colors',
    slides: 10,
    createdAt: '2024-12-17',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-purple-500 to-pink-600',
    status: 'published'
  },
  // 2年级英语项目
  {
    id: '4',
    name: '数字与计数 Numbers',
    subject: '英语',
    chapter: 'Unit 1 Numbers',
    slides: 14,
    createdAt: '2024-12-18',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-red-500 to-orange-600',
    status: 'published'
  },
  {
    id: '5',
    name: '动物朋友 Animals',
    subject: '英语',
    chapter: 'Unit 2 Animals',
    slides: 16,
    createdAt: '2024-12-19',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-yellow-500 to-green-600',
    status: 'published'
  },
  {
    id: '6',
    name: '食物与饮料 Food and Drinks',
    subject: '英语',
    chapter: 'Unit 3 Food',
    slides: 13,
    createdAt: '2024-12-20',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    status: 'published'
  },
  // 3年级英语项目
  {
    id: '7',
    name: '学校生活 School Life',
    subject: '英语',
    chapter: 'Unit 1 School',
    slides: 18,
    createdAt: '2024-12-21',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-teal-500 to-blue-600',
    status: 'published'
  },
  {
    id: '8',
    name: '身体部位 Body Parts',
    subject: '英语',
    chapter: 'Unit 2 Body',
    slides: 15,
    createdAt: '2024-12-22',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-amber-500 to-orange-600',
    status: 'published'
  },
  {
    id: '9',
    name: '我的爱好 My Hobbies',
    subject: '英语',
    chapter: 'Unit 3 Hobbies',
    slides: 17,
    createdAt: '2024-12-23',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-sky-500 to-blue-600',
    status: 'published'
  },
  // 4年级英语项目
  {
    id: '10',
    name: '我的房间 My Room',
    subject: '英语',
    chapter: 'Unit 1 My Room',
    slides: 19,
    createdAt: '2024-12-24',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-lime-500 to-green-600',
    status: 'published'
  },
  {
    id: '11',
    name: '天气与季节 Weather and Seasons',
    subject: '英语',
    chapter: 'Unit 2 Weather',
    slides: 22,
    createdAt: '2024-12-25',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
    status: 'published'
  },
  {
    id: '12',
    name: '购物体验 Shopping',
    subject: '英语',
    chapter: 'Unit 3 Shopping',
    slides: 16,
    createdAt: '2024-12-26',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-orange-500 to-red-600',
    status: 'published'
  },
  // 5年级英语项目
  {
    id: '13',
    name: '我的一天 My Day',
    subject: '英语',
    chapter: 'Unit 1 My Day',
    slides: 21,
    createdAt: '2024-12-27',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-violet-500 to-purple-600',
    status: 'published'
  },
  {
    id: '14',
    name: '健康饮食 Healthy Food',
    subject: '英语',
    chapter: 'Unit 2 Healthy Food',
    slides: 20,
    createdAt: '2024-12-28',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    status: 'published'
  },
  {
    id: '15',
    name: '旅行计划 Travel Plans',
    subject: '英语',
    chapter: 'Unit 3 Travel',
    slides: 24,
    createdAt: '2024-12-29',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    status: 'published'
  },
  // 6年级英语项目
  {
    id: '16',
    name: '未来职业 Future Jobs',
    subject: '英语',
    chapter: 'Unit 1 Jobs',
    slides: 26,
    createdAt: '2024-12-30',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-pink-500 to-rose-600',
    status: 'published'
  },
  {
    id: '17',
    name: '环境保护 Environment',
    subject: '英语',
    chapter: 'Unit 2 Environment',
    slides: 23,
    createdAt: '2024-12-31',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-green-500 to-emerald-600',
    status: 'published'
  },
  {
    id: '18',
    name: '科技生活 Technology',
    subject: '英语',
    chapter: 'Unit 3 Technology',
    slides: 28,
    createdAt: '2025-01-01',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    status: 'published'
  },
  // 初一英语项目
  {
    id: '19',
    name: '自我介绍 Self Introduction',
    subject: '英语',
    chapter: 'Unit 1 My name is Gina',
    slides: 30,
    createdAt: '2025-01-02',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-purple-500 to-violet-600',
    status: 'published'
  },
  {
    id: '20',
    name: '家庭与朋友 Family and Friends',
    subject: '英语',
    chapter: 'Unit 2 This is my sister',
    slides: 27,
    createdAt: '2025-01-03',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-red-500 to-pink-600',
    status: 'published'
  },
  {
    id: '21',
    name: '学校物品 School Things',
    subject: '英语',
    chapter: 'Unit 3 Is this your pencil',
    slides: 24,
    createdAt: '2025-01-04',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    status: 'published'
  },
  // 初二英语项目
  {
    id: '22',
    name: '假期活动 Holiday Activities',
    subject: '英语',
    chapter: 'Unit 1 Where did you go on vacation',
    slides: 28,
    createdAt: '2025-01-05',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-green-500 to-lime-600',
    status: 'published'
  },
  {
    id: '23',
    name: '健康习惯 Healthy Habits',
    subject: '英语',
    chapter: 'Unit 2 How often do you exercise',
    slides: 26,
    createdAt: '2025-01-06',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    status: 'published'
  },
  {
    id: '24',
    name: '比较与选择 Comparisons',
    subject: '英语',
    chapter: 'Unit 3 I am more outgoing than my sister',
    slides: 25,
    createdAt: '2025-01-07',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    status: 'published'
  },
  // 初三英语项目
  {
    id: '25',
    name: '学习方法 Learning Methods',
    subject: '英语',
    chapter: 'Unit 1 How can we become good learners',
    slides: 32,
    createdAt: '2025-01-08',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-rose-500 to-red-600',
    status: 'published'
  },
  {
    id: '26',
    name: '传统文化 Traditional Culture',
    subject: '英语',
    chapter: 'Unit 2 I think that mooncakes are delicious',
    slides: 29,
    createdAt: '2025-01-09',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-lime-500 to-green-600',
    status: 'published'
  },
  {
    id: '27',
    name: '发明创造 Inventions',
    subject: '英语',
    chapter: 'Unit 3 What are the shirts made of',
    slides: 31,
    createdAt: '2025-01-10',
    workspaceId: '1',
    thumbnail: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
    status: 'published'
  }
]

/**
 * 项目相关的API方法
 */
export class ProjectAPI {
  private projects: Project[] = [...mockProjects]

  /**
   * 根据工作空间获取项目
   */
  async getProjectsByWorkspace(workspaceId: string): Promise<Project[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.projects.filter(p => p.workspaceId === workspaceId)
  }

  /**
   * 根据ID获取项目
   */
  async getProjectById(id: string): Promise<Project | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.projects.find(p => p.id === id) || null
  }

  /**
   * 创建项目
   */
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    }
    this.projects.push(newProject)
    return newProject
  }

  /**
   * 更新项目
   */
  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) return null
    
    this.projects[index] = { ...this.projects[index], ...updates }
    return this.projects[index]
  }

  /**
   * 删除项目
   */
  async deleteProject(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) return false
    
    this.projects.splice(index, 1)
    return true
  }

  /**
   * 搜索项目
   */
  async searchProjects(query: string, workspaceId?: string): Promise<Project[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    let filtered = this.projects
    
    if (workspaceId) {
      filtered = filtered.filter(p => p.workspaceId === workspaceId)
    }
    
    if (query) {
      const lowerQuery = query.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.subject.toLowerCase().includes(lowerQuery) ||
        p.chapter.toLowerCase().includes(lowerQuery)
      )
    }
    
    return filtered
  }
}

// 导出单例实例
export const projectAPI = new ProjectAPI()