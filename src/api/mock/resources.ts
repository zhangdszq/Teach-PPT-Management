// 资源相关的Mock数据
import type { Resource } from '../types'

/**
 * 资源Mock数据
 */
export const mockResources: Resource[] = [
  {
    id: '1',
    name: '商务演示模板.pptx',
    type: 'template',
    size: '2.5MB',
    uploadDate: '2024-01-15',
    workspaceId: '1',
    url: '/templates/business-presentation.pptx',
    thumbnail: 'https://via.placeholder.com/150x100/3B82F6/white?text=PPT'
  },
  {
    id: '2',
    name: '公司Logo.png',
    type: 'image',
    size: '256KB',
    uploadDate: '2024-01-20',
    workspaceId: '1',
    url: '/images/company-logo.png',
    thumbnail: 'https://via.placeholder.com/150x100/10B981/white?text=LOGO'
  },
  {
    id: '3',
    name: '产品介绍视频.mp4',
    type: 'video',
    size: '45.2MB',
    uploadDate: '2024-01-25',
    workspaceId: '1',
    url: '/videos/product-intro.mp4',
    thumbnail: 'https://via.placeholder.com/150x100/EF4444/white?text=VIDEO'
  },
  {
    id: '4',
    name: '项目需求文档.docx',
    type: 'document',
    size: '1.8MB',
    uploadDate: '2024-02-01',
    workspaceId: '1',
    url: '/documents/project-requirements.docx',
    thumbnail: 'https://via.placeholder.com/150x100/F59E0B/white?text=DOC'
  },
  {
    id: '5',
    name: '自动化工作流.json',
    type: 'workflow',
    size: '128KB',
    uploadDate: '2024-02-05',
    workspaceId: '1',
    url: '/workflows/automation.json',
    thumbnail: 'https://via.placeholder.com/150x100/8B5CF6/white?text=FLOW'
  },
  {
    id: '6',
    name: '数据处理脚本.py',
    type: 'code',
    size: '64KB',
    uploadDate: '2024-02-10',
    workspaceId: '1',
    url: '/code/data-processing.py',
    thumbnail: 'https://via.placeholder.com/150x100/EC4899/white?text=CODE'
  },
  {
    id: '7',
    name: '教育培训模板.pptx',
    type: 'template',
    size: '3.2MB',
    uploadDate: '2024-02-15',
    workspaceId: '2',
    url: '/templates/education-training.pptx',
    thumbnail: 'https://via.placeholder.com/150x100/84CC16/white?text=EDU'
  },
  {
    id: '8',
    name: '课程封面图.jpg',
    type: 'image',
    size: '512KB',
    uploadDate: '2024-02-20',
    workspaceId: '2',
    url: '/images/course-cover.jpg',
    thumbnail: 'https://via.placeholder.com/150x100/06B6D4/white?text=COVER'
  },
  {
    id: '9',
    name: '教学演示视频.mp4',
    type: 'video',
    size: '78.5MB',
    uploadDate: '2024-02-25',
    workspaceId: '2',
    url: '/videos/teaching-demo.mp4',
    thumbnail: 'https://via.placeholder.com/150x100/6366F1/white?text=TEACH'
  },
  {
    id: '10',
    name: '课程大纲.pdf',
    type: 'document',
    size: '892KB',
    uploadDate: '2024-03-01',
    workspaceId: '2',
    url: '/documents/course-outline.pdf',
    thumbnail: 'https://via.placeholder.com/150x100/F97316/white?text=PDF'
  },
  {
    id: '11',
    name: '评分工作流.json',
    type: 'workflow',
    size: '96KB',
    uploadDate: '2024-03-05',
    workspaceId: '2',
    url: '/workflows/grading.json',
    thumbnail: 'https://via.placeholder.com/150x100/FBBF24/white?text=GRADE'
  },
  {
    id: '12',
    name: '成绩统计脚本.js',
    type: 'code',
    size: '48KB',
    uploadDate: '2024-03-10',
    workspaceId: '2',
    url: '/code/grade-statistics.js',
    thumbnail: 'https://via.placeholder.com/150x100/1F2937/white?text=STATS'
  },
  {
    id: '13',
    name: '科技展示模板.pptx',
    type: 'template',
    size: '4.1MB',
    uploadDate: '2024-03-15',
    workspaceId: '3',
    url: '/templates/tech-showcase.pptx',
    thumbnail: 'https://via.placeholder.com/150x100/7C3AED/white?text=TECH'
  },
  {
    id: '14',
    name: '产品截图.png',
    type: 'image',
    size: '1.2MB',
    uploadDate: '2024-03-20',
    workspaceId: '3',
    url: '/images/product-screenshot.png',
    thumbnail: 'https://via.placeholder.com/150x100/059669/white?text=SHOT'
  },
  {
    id: '15',
    name: '功能演示视频.mp4',
    type: 'video',
    size: '92.3MB',
    uploadDate: '2024-03-25',
    workspaceId: '3',
    url: '/videos/feature-demo.mp4',
    thumbnail: 'https://via.placeholder.com/150x100/DC2626/white?text=DEMO'
  },
  {
    id: '16',
    name: '技术文档.md',
    type: 'document',
    size: '324KB',
    uploadDate: '2024-03-30',
    workspaceId: '3',
    url: '/documents/technical-docs.md',
    thumbnail: 'https://via.placeholder.com/150x100/0891B2/white?text=MD'
  },
  {
    id: '17',
    name: '部署工作流.yml',
    type: 'workflow',
    size: '156KB',
    uploadDate: '2024-04-01',
    workspaceId: '3',
    url: '/workflows/deployment.yml',
    thumbnail: 'https://via.placeholder.com/150x100/BE185D/white?text=DEPLOY'
  },
  {
    id: '18',
    name: 'API接口代码.ts',
    type: 'code',
    size: '89KB',
    uploadDate: '2024-04-05',
    workspaceId: '3',
    url: '/code/api-interface.ts',
    thumbnail: 'https://via.placeholder.com/150x100/7C2D12/white?text=API'
  },
  {
    id: '19',
    name: '数据图表模板.pptx',
    type: 'template',
    size: '2.8MB',
    uploadDate: '2024-04-10',
    workspaceId: '1',
    url: '/templates/data-charts.pptx',
    thumbnail: 'https://via.placeholder.com/150x100/065F46/white?text=CHART'
  },
  {
    id: '20',
    name: '背景图片集.zip',
    type: 'image',
    size: '15.6MB',
    uploadDate: '2024-04-15',
    workspaceId: '1',
    url: '/images/background-collection.zip',
    thumbnail: 'https://via.placeholder.com/150x100/374151/white?text=BG'
  }
]

/**
 * 资源相关的API方法
 */
export class ResourceAPI {
  private resources: Resource[] = [...mockResources]

  /**
   * 根据工作空间获取资源
   */
  async getResourcesByWorkspace(workspaceId: string): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.resources.filter(r => r.workspaceId === workspaceId)
  }

  /**
   * 根据ID获取资源
   */
  async getResourceById(id: string): Promise<Resource | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.resources.find(r => r.id === id) || null
  }

  /**
   * 根据类型获取资源
   */
  async getResourcesByType(type: Resource['type'], workspaceId?: string): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    let filtered = this.resources.filter(r => r.type === type)
    
    if (workspaceId) {
      filtered = filtered.filter(r => r.workspaceId === workspaceId)
    }
    
    return filtered
  }

  /**
   * 搜索资源
   */
  async searchResources(query: string, workspaceId?: string): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    let filtered = this.resources
    
    if (workspaceId) {
      filtered = filtered.filter(r => r.workspaceId === workspaceId)
    }
    
    if (query) {
      const lowerQuery = query.toLowerCase()
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(lowerQuery) ||
        r.type.toLowerCase().includes(lowerQuery)
      )
    }
    
    return filtered
  }

  /**
   * 上传资源
   */
  async uploadResource(resource: Omit<Resource, 'id' | 'uploadDate'>): Promise<Resource> {
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟上传时间
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0]
    }
    this.resources.push(newResource)
    return newResource
  }

  /**
   * 更新资源
   */
  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.resources.findIndex(r => r.id === id)
    if (index === -1) return null
    
    this.resources[index] = { ...this.resources[index], ...updates }
    return this.resources[index]
  }

  /**
   * 删除资源
   */
  async deleteResource(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.resources.findIndex(r => r.id === id)
    if (index === -1) return false
    
    this.resources.splice(index, 1)
    return true
  }

  /**
   * 批量删除资源
   */
  async deleteResources(ids: string[]): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let deletedCount = 0
    
    ids.forEach(id => {
      const index = this.resources.findIndex(r => r.id === id)
      if (index !== -1) {
        this.resources.splice(index, 1)
        deletedCount++
      }
    })
    
    return deletedCount
  }

  /**
   * 获取资源统计信息
   */
  async getResourceStats(workspaceId?: string): Promise<{
    total: number
    byType: Record<Resource['type'], number>
    totalSize: string
  }> {
    await new Promise(resolve => setTimeout(resolve, 100))
    let filtered = this.resources
    
    if (workspaceId) {
      filtered = filtered.filter(r => r.workspaceId === workspaceId)
    }
    
    const byType: Record<Resource['type'], number> = {
      template: 0,
      image: 0,
      video: 0,
      document: 0,
      workflow: 0,
      code: 0
    }
    
    let totalSizeBytes = 0
    
    filtered.forEach(resource => {
      byType[resource.type]++
      
      // 简单的大小转换（实际应用中需要更精确的计算）
      const sizeStr = resource.size
      const sizeNum = parseFloat(sizeStr)
      if (sizeStr.includes('KB')) {
        totalSizeBytes += sizeNum * 1024
      } else if (sizeStr.includes('MB')) {
        totalSizeBytes += sizeNum * 1024 * 1024
      } else if (sizeStr.includes('GB')) {
        totalSizeBytes += sizeNum * 1024 * 1024 * 1024
      }
    })
    
    // 转换总大小为可读格式
    let totalSize: string
    if (totalSizeBytes < 1024) {
      totalSize = `${totalSizeBytes}B`
    } else if (totalSizeBytes < 1024 * 1024) {
      totalSize = `${(totalSizeBytes / 1024).toFixed(1)}KB`
    } else if (totalSizeBytes < 1024 * 1024 * 1024) {
      totalSize = `${(totalSizeBytes / (1024 * 1024)).toFixed(1)}MB`
    } else {
      totalSize = `${(totalSizeBytes / (1024 * 1024 * 1024)).toFixed(1)}GB`
    }
    
    return {
      total: filtered.length,
      byType,
      totalSize
    }
  }

  /**
   * 获取最近上传的资源
   */
  async getRecentResources(limit: number = 10, workspaceId?: string): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    let filtered = this.resources
    
    if (workspaceId) {
      filtered = filtered.filter(r => r.workspaceId === workspaceId)
    }
    
    return filtered
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
      .slice(0, limit)
  }
}

// 导出单例实例
export const resourceAPI = new ResourceAPI()