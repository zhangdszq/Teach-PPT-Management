<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
      <!-- 弹窗头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ isEdit ? '编辑模板' : '创建模板' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 基本信息 -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-gray-900 mb-4">基本信息</h4>
              
              <!-- 模板名称 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板名称 *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入模板名称"
                >
              </div>
              
              <!-- 模板描述 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板描述</label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入模板描述"
                ></textarea>
              </div>
              
              <!-- 学科 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">学科 *</label>
                <select
                  v-model="formData.subject"
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">请选择学科</option>
                  <option value="英语">英语</option>
                  <option value="数学">数学</option>
                  <option value="语文">语文</option>
                  <option value="物理">物理</option>
                  <option value="化学">化学</option>
                  <option value="生物">生物</option>
                  <option value="历史">历史</option>
                  <option value="地理">地理</option>
                </select>
              </div>
              
              <!-- 年级 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">年级 *</label>
                <select
                  v-model="formData.gradeLevel"
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">请选择年级</option>
                  <option value="小学一年级">小学一年级</option>
                  <option value="小学二年级">小学二年级</option>
                  <option value="小学三年级">小学三年级</option>
                  <option value="小学四年级">小学四年级</option>
                  <option value="小学五年级">小学五年级</option>
                  <option value="小学六年级">小学六年级</option>
                  <option value="初中一年级">初中一年级</option>
                  <option value="初中二年级">初中二年级</option>
                  <option value="初中三年级">初中三年级</option>
                  <option value="高中一年级">高中一年级</option>
                  <option value="高中二年级">高中二年级</option>
                  <option value="高中三年级">高中三年级</option>
                </select>
              </div>
              
              <!-- 模板类型 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板类型</label>
                <select
                  v-model="formData.templateType"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">请选择模板类型</option>
                  <option value="正式学习">正式学习</option>
                  <option value="看图选择">看图选择</option>
                  <option value="提问环节">提问环节</option>
                  <option value="词汇学习">词汇学习</option>
                  <option value="语法练习">语法练习</option>
                  <option value="阅读理解">阅读理解</option>
                </select>
              </div>
              
              <!-- 难度级别 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">难度级别</label>
                <select
                  v-model="formData.difficultyLevel"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">请选择难度级别</option>
                  <option value="BEGINNER">入门级</option>
                  <option value="BASIC">基础级</option>
                  <option value="INTERMEDIATE">进阶级</option>
                  <option value="ADVANCED">高级</option>
                </select>
              </div>
            </div>
            
            <!-- 设计信息 -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-gray-900 mb-4">设计信息</h4>
              
              <!-- 布局类型 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">布局类型</label>
                <select
                  v-model="formData.layoutType"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">请选择布局类型</option>
                  <option value="单栏布局">单栏布局</option>
                  <option value="双栏布局">双栏布局</option>
                  <option value="三栏布局">三栏布局</option>
                  <option value="网格布局">网格布局</option>
                  <option value="自由布局">自由布局</option>
                </select>
              </div>
              
              <!-- 视觉风格 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">视觉风格</label>
                <select
                  v-model="formData.visualStyle"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">请选择视觉风格</option>
                  <option value="简约现代">简约现代</option>
                  <option value="活泼可爱">活泼可爱</option>
                  <option value="专业商务">专业商务</option>
                  <option value="创意艺术">创意艺术</option>
                  <option value="传统经典">传统经典</option>
                </select>
              </div>
              
              <!-- 教学目的 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">教学目的</label>
                <textarea
                  v-model="formData.teachingPurpose"
                  rows="3"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请描述该模板的教学目的和适用场景"
                ></textarea>
              </div>
              
              <!-- 预计时长 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">预计时长</label>
                <input
                  v-model="formData.estimatedDuration"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例如：45分钟、1课时"
                >
              </div>
              
              <!-- 模板分类 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板分类</label>
                <input
                  v-model="formData.templateCategory"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例如：教育、商务、科技"
                >
              </div>
              
              <!-- 标签 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">标签</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span 
                    v-for="(tag, index) in formData.tags" 
                    :key="index"
                    class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {{ tag }}
                    <button 
                      @click="removeTag(index)"
                      type="button"
                      class="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div class="flex">
                  <input
                    v-model="newTag"
                    type="text"
                    class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="输入标签"
                    @keyup.enter="addTag"
                  >
                  <button 
                    @click="addTag"
                    type="button"
                    class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 元素配置 -->
          <div class="mt-8">
            <h4 class="text-md font-medium text-gray-900 mb-4">模板元素配置</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="elementType in elementTypes" :key="elementType.value" class="flex items-center justify-between">
                  <label class="text-sm font-medium text-gray-700">{{ elementType.label }}</label>
                  <input
                    v-model.number="elementCounts[elementType.value]"
                    type="number"
                    min="0"
                    max="20"
                    class="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                  >
                </div>
              </div>
            </div>
          </div>
          
          <!-- 按钮组 -->
          <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              @click="$emit('close')"
              type="button"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {{ isEdit ? '更新模板' : '创建模板' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import type { Template } from '@/api/types'

// Props
interface Props {
  template?: Template | null
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  template: null,
  isEdit: false
})

// Emits
const emit = defineEmits<{
  close: []
  save: [templateData: Partial<Template>]
}>()

// 响应式数据
const newTag = ref('')

const formData = reactive({
  name: '',
  description: '',
  subject: '',
  gradeLevel: '',
  templateType: '',
  difficultyLevel: '',
  layoutType: '',
  visualStyle: '',
  teachingPurpose: '',
  estimatedDuration: '',
  templateCategory: '',
  tags: [] as string[]
})

const elementCounts = reactive({
  vocabulary: 0,
  image: 0,
  sentence: 0,
  text: 0,
  title: 0,
  question: 0,
  projectNumber: 0
})

const elementTypes = [
  { value: 'vocabulary', label: '词汇' },
  { value: 'image', label: '图片' },
  { value: 'sentence', label: '句子' },
  { value: 'text', label: '文本' },
  { value: 'title', label: '标题' },
  { value: 'question', label: '问题' },
  { value: 'projectNumber', label: '项目编号' }
]

// 方法
const addTag = () => {
  if (newTag.value.trim() && !formData.tags.includes(newTag.value.trim())) {
    formData.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  formData.tags.splice(index, 1)
}

const handleSubmit = () => {
  // 构建元素数据
  const elements = Object.entries(elementCounts)
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => ({
      elementType: type,
      elementCount: count,
      elementDescription: elementTypes.find(et => et.value === type)?.label + '元素'
    }))
  
  const templateData = {
    ...formData,
    elements,
    templateId: props.isEdit ? props.template?.templateId : `template_${Date.now()}`
  }
  
  emit('save', templateData)
}

// 监听模板数据变化
watch(() => props.template, (template) => {
  if (template) {
    Object.assign(formData, {
      name: template.name || '',
      description: template.description || '',
      subject: template.subject || '',
      gradeLevel: template.gradeLevel || '',
      templateType: template.templateType || '',
      difficultyLevel: template.difficultyLevel || '',
      layoutType: template.layoutType || '',
      visualStyle: template.visualStyle || '',
      teachingPurpose: template.teachingPurpose || '',
      estimatedDuration: template.estimatedDuration || '',
      templateCategory: template.templateCategory || '',
      tags: [...(template.tags || [])]
    })
    
    // 重置元素计数
    Object.keys(elementCounts).forEach(key => {
      elementCounts[key] = 0
    })
    
    // 设置现有元素计数
    if (template.elements) {
      template.elements.forEach(element => {
        if (elementCounts.hasOwnProperty(element.elementType)) {
          elementCounts[element.elementType] = element.elementCount
        }
      })
    }
  }
}, { immediate: true })
</script>