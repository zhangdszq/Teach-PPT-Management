// 模板相关的Mock数据
import type { Template } from '../types'

/**
 * 模板Mock数据
 */
export const mockTemplates: Template[] = [
  {
    id: '1',
    name: '简约商务风格',
    thumbnail: 'https://via.placeholder.com/300x200/3B82F6/white?text=简约商务',
    category: '商务',
    tags: ['简约', '商务', '蓝色'],
    description: '适合商务演示的简约风格模板，以蓝色为主色调',
    createdAt: '2024-01-15',
    isPopular: true,
    downloadCount: 1250
  },
  {
    id: '2',
    name: '教育培训模板',
    thumbnail: 'https://via.placeholder.com/300x200/10B981/white?text=教育培训',
    category: '教育',
    tags: ['教育', '培训', '绿色'],
    description: '专为教育培训设计的模板，清新绿色主题',
    createdAt: '2024-01-20',
    isPopular: true,
    downloadCount: 980
  },
  {
    id: '3',
    name: '科技创新风格',
    thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/white?text=科技创新',
    category: '科技',
    tags: ['科技', '创新', '紫色'],
    description: '现代科技感十足的模板设计，适合技术演示',
    createdAt: '2024-01-25',
    isPopular: false,
    downloadCount: 756
  },
  {
    id: '4',
    name: '医疗健康主题',
    thumbnail: 'https://via.placeholder.com/300x200/EF4444/white?text=医疗健康',
    category: '医疗',
    tags: ['医疗', '健康', '红色'],
    description: '专业的医疗健康主题模板，适合医学演示',
    createdAt: '2024-02-01',
    isPopular: false,
    downloadCount: 432
  },
  {
    id: '5',
    name: '金融投资风格',
    thumbnail: 'https://via.placeholder.com/300x200/F59E0B/white?text=金融投资',
    category: '金融',
    tags: ['金融', '投资', '橙色'],
    description: '专业的金融投资主题模板，适合财务报告',
    createdAt: '2024-02-05',
    isPopular: true,
    downloadCount: 1100
  },
  {
    id: '6',
    name: '创意设计模板',
    thumbnail: 'https://via.placeholder.com/300x200/EC4899/white?text=创意设计',
    category: '设计',
    tags: ['创意', '设计', '粉色'],
    description: '充满创意的设计模板，适合设计作品展示',
    createdAt: '2024-02-10',
    isPopular: false,
    downloadCount: 678
  },
  {
    id: '7',
    name: '环保绿色主题',
    thumbnail: 'https://via.placeholder.com/300x200/84CC16/white?text=环保绿色',
    category: '环保',
    tags: ['环保', '绿色', '自然'],
    description: '环保主题的绿色模板，适合环境保护相关演示',
    createdAt: '2024-02-15',
    isPopular: false,
    downloadCount: 345
  },
  {
    id: '8',
    name: '旅游度假风格',
    thumbnail: 'https://via.placeholder.com/300x200/06B6D4/white?text=旅游度假',
    category: '旅游',
    tags: ['旅游', '度假', '蓝色'],
    description: '轻松愉快的旅游度假主题模板',
    createdAt: '2024-02-20',
    isPopular: true,
    downloadCount: 892
  },
  {
    id: '9',
    name: '学术研究模板',
    thumbnail: 'https://via.placeholder.com/300x200/6366F1/white?text=学术研究',
    category: '学术',
    tags: ['学术', '研究', '蓝紫色'],
    description: '严谨的学术研究模板，适合论文答辩',
    createdAt: '2024-02-25',
    isPopular: false,
    downloadCount: 567
  },
  {
    id: '10',
    name: '时尚潮流风格',
    thumbnail: 'https://via.placeholder.com/300x200/F97316/white?text=时尚潮流',
    category: '时尚',
    tags: ['时尚', '潮流', '橙红色'],
    description: '时尚潮流的现代设计模板',
    createdAt: '2024-03-01',
    isPopular: true,
    downloadCount: 1350
  },
  {
    id: '11',
    name: '儿童教育模板',
    thumbnail: 'https://via.placeholder.com/300x200/FBBF24/white?text=儿童教育',
    category: '教育',
    tags: ['儿童', '教育', '黄色'],
    description: '活泼可爱的儿童教育主题模板',
    createdAt: '2024-03-05',
    isPopular: true,
    downloadCount: 1180
  },
  {
    id: '12',
    name: '企业文化展示',
    thumbnail: 'https://via.placeholder.com/300x200/1F2937/white?text=企业文化',
    category: '企业',
    tags: ['企业', '文化', '深灰色'],
    description: '专业的企业文化展示模板',
    createdAt: '2024-03-10',
    isPopular: false,
    downloadCount: 723
  },
  {
    id: '13',
    name: '产品发布会模板',
    thumbnail: 'https://via.placeholder.com/300x200/7C3AED/white?text=产品发布',
    category: '产品',
    tags: ['产品', '发布', '紫色'],
    description: '适合产品发布会的专业模板',
    createdAt: '2024-03-15',
    isPopular: true,
    downloadCount: 1420
  },
  {
    id: '14',
    name: '数据分析报告',
    thumbnail: 'https://via.placeholder.com/300x200/059669/white?text=数据分析',
    category: '数据',
    tags: ['数据', '分析', '深绿色'],
    description: '专业的数据分析报告模板',
    createdAt: '2024-03-20',
    isPopular: false,
    downloadCount: 634
  },
  {
    id: '15',
    name: '团队协作主题',
    thumbnail: 'https://via.placeholder.com/300x200/DC2626/white?text=团队协作',
    category: '团队',
    tags: ['团队', '协作', '红色'],
    description: '强调团队协作的主题模板',
    createdAt: '2024-03-25',
    isPopular: false,
    downloadCount: 456
  },
  {
    id: '16',
    name: '项目管理模板',
    thumbnail: 'https://via.placeholder.com/300x200/0891B2/white?text=项目管理',
    category: '管理',
    tags: ['项目', '管理', '青色'],
    description: '专业的项目管理演示模板',
    createdAt: '2024-03-30',
    isPopular: true,
    downloadCount: 987
  },
  {
    id: '17',
    name: '营销策划方案',
    thumbnail: 'https://via.placeholder.com/300x200/BE185D/white?text=营销策划',
    category: '营销',
    tags: ['营销', '策划', '玫红色'],
    description: '创意营销策划方案模板',
    createdAt: '2024-04-01',
    isPopular: true,
    downloadCount: 1290
  },
  {
    id: '18',
    name: '年终总结报告',
    thumbnail: 'https://via.placeholder.com/300x200/7C2D12/white?text=年终总结',
    category: '总结',
    tags: ['年终', '总结', '棕色'],
    description: '专业的年终总结报告模板',
    createdAt: '2024-04-05',
    isPopular: false,
    downloadCount: 812
  },
  {
    id: '19',
    name: '培训课程模板',
    thumbnail: 'https://via.placeholder.com/300x200/065F46/white?text=培训课程',
    category: '培训',
    tags: ['培训', '课程', '深绿色'],
    description: '专业的培训课程演示模板',
    createdAt: '2024-04-10',
    isPopular: true,
    downloadCount: 1156
  },
  {
    id: '20',
    name: '会议演示模板',
    thumbnail: 'https://via.placeholder.com/300x200/374151/white?text=会议演示',
    category: '会议',
    tags: ['会议', '演示', '灰色'],
    description: '简洁的会议演示模板',
    createdAt: '2024-04-15',
    isPopular: false,
    downloadCount: 598
  }
]

/**
 * 模板相关的API方法
 */
export class TemplateAPI {
  private templates: Template[] = [...mockTemplates]

  /**
   * 获取所有模板
   */
  async getAllTemplates(): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates
  }

  /**
   * 根据ID获取模板
   */
  async getTemplateById(id: string): Promise<Template | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates.find(t => t.id === id) || null
  }

  /**
   * 根据分类获取模板
   */
  async getTemplatesByCategory(category: string): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates.filter(t => t.category === category)
  }

  /**
   * 获取热门模板
   */
  async getPopularTemplates(): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates.filter(t => t.isPopular)
  }

  /**
   * 搜索模板
   */
  async searchTemplates(query: string): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    if (!query) return this.templates
    
    const lowerQuery = query.toLowerCase()
    return this.templates.filter(t => 
      t.name.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      t.description.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * 根据标签获取模板
   */
  async getTemplatesByTag(tag: string): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates.filter(t => t.tags.includes(tag))
  }

  /**
   * 获取最新模板
   */
  async getLatestTemplates(limit: number = 10): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }

  /**
   * 获取下载量最高的模板
   */
  async getMostDownloadedTemplates(limit: number = 10): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.templates
      .sort((a, b) => b.downloadCount - a.downloadCount)
      .slice(0, limit)
  }

  /**
   * 创建模板
   */
  async createTemplate(template: Omit<Template, 'id' | 'createdAt' | 'downloadCount'>): Promise<Template> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      downloadCount: 0
    }
    this.templates.push(newTemplate)
    return newTemplate
  }

  /**
   * 更新模板
   */
  async updateTemplate(id: string, updates: Partial<Template>): Promise<Template | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.templates.findIndex(t => t.id === id)
    if (index === -1) return null
    
    this.templates[index] = { ...this.templates[index], ...updates }
    return this.templates[index]
  }

  /**
   * 删除模板
   */
  async deleteTemplate(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.templates.findIndex(t => t.id === id)
    if (index === -1) return false
    
    this.templates.splice(index, 1)
    return true
  }

  /**
   * 增加模板下载量
   */
  async incrementDownloadCount(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100))
    const template = this.templates.find(t => t.id === id)
    if (!template) return false
    
    template.downloadCount++
    return true
  }

  /**
   * 获取所有分类
   */
  async getCategories(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 50))
    const categories = Array.from(new Set(this.templates.map(t => t.category)))
    return categories.sort()
  }

  /**
   * 获取所有标签
   */
  async getTags(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 50))
    const tags = Array.from(new Set(this.templates.flatMap(t => t.tags)))
    return tags.sort()
  }
}

// 导出单例实例
export const templateAPI = new TemplateAPI()