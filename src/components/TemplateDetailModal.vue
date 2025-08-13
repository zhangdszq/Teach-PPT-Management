<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      <!-- 弹窗头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">模板详情</h3>
        <div class="flex items-center space-x-2">
          <button 
            @click="$emit('edit', template)"
            class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            编辑
          </button>
          <button 
            @click="$emit('duplicate', template)"
            class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            复制
          </button>
          <button 
            @click="$emit('export', template)"
            class="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            导出
          </button>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左侧：基本信息 -->
          <div class="lg:col-span-2 space-y-6">
            <!-- 模板预览 -->
            <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg aspect-video flex items-center justify-center">
              <div class="text-center text-white">
                <div class="text-4xl mb-2">📄</div>
                <div class="text-lg font-medium">{{ template.name }}</div>
                <div class="text-sm opacity-90">{{ template.templateCategory }}</div>
              </div>
            </div>
            
            <!-- 基本信息 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">基本信息</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-500">模板名称</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">模板ID</label>
                  <p class="mt-1 text-sm text-gray-900 font-mono">{{ template.templateId }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">学科</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.subject }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">年级</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.gradeLevel }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">模板类型</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.templateType }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">难度级别</label>
                  <p class="mt-1 text-sm text-gray-900">
                    <span :class="getDifficultyColor(template.difficultyLevel)" class="px-2 py-1 rounded text-xs">
                      {{ getDifficultyLabel(template.difficultyLevel) }}
                    </span>
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">布局类型</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.layoutType || '未设置' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">视觉风格</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.visualStyle || '未设置' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">教学目的</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.teachingPurpose || '未设置' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">预计时长</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.estimatedDuration || '未设置' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">创建时间</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(template.createdAt) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">更新时间</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(template.updatedAt) }}</p>
                </div>
              </div>
              
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-500">模板描述</label>
                <p class="mt-1 text-sm text-gray-900">{{ template.description || '暂无描述' }}</p>
              </div>
            </div>
            
            <!-- 模板元素统计 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">模板元素</h4>
              <div v-if="template.elements && template.elements.length > 0" class="space-y-4">
                <div 
                  v-for="element in template.elements" 
                  :key="element.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-blue-600 text-sm font-medium">{{ getElementIcon(element.elementType) }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ getElementTypeName(element.elementType) }}</div>
                      <div class="text-xs text-gray-500">{{ element.elementDescription || '无描述' }}</div>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600">
                    数量: {{ element.elementCount }}
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-gray-500">
                <div class="text-4xl mb-2">📝</div>
                <p>暂无元素信息</p>
              </div>
            </div>
            
            <!-- 幻灯片数据预览 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">幻灯片数据</h4>
              <div v-if="template.slideData" class="bg-gray-50 rounded-lg p-4">
                <pre class="text-xs text-gray-700 overflow-x-auto">{{ formatSlideData(template.slideData) }}</pre>
              </div>
              <div v-else class="text-center py-8 text-gray-500">
                <div class="text-4xl mb-2">📊</div>
                <p>暂无幻灯片数据</p>
              </div>
            </div>
          </div>
          
          <!-- 右侧：标签和统计信息 -->
          <div class="space-y-6">
            <!-- 标签 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">标签</h4>
              <div v-if="template.tags && template.tags.length > 0" class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in template.tags" 
                  :key="tag"
                  class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
              <div v-else class="text-center py-4 text-gray-500">
                <p class="text-sm">暂无标签</p>
              </div>
            </div>
            
            <!-- 使用统计 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">使用统计</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">下载次数</span>
                  <span class="text-sm font-medium text-gray-900">{{ template.downloadCount || 0 }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">使用次数</span>
                  <span class="text-sm font-medium text-gray-900">{{ template.usageCount || 0 }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">收藏次数</span>
                  <span class="text-sm font-medium text-gray-900">{{ template.favoriteCount || 0 }}</span>
                </div>
              </div>
            </div>
            
            <!-- 教学特征 -->
            <div v-if="template.pedagogicalFeatures" class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">教学特征</h4>
              <div class="space-y-3">
                <div v-if="template.pedagogicalFeatures.interactivityLevel">
                  <label class="block text-sm font-medium text-gray-500">互动性级别</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.pedagogicalFeatures.interactivityLevel }}</p>
                </div>
                <div v-if="template.pedagogicalFeatures.cognitiveLoad">
                  <label class="block text-sm font-medium text-gray-500">认知负荷</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.pedagogicalFeatures.cognitiveLoad }}</p>
                </div>
                <div v-if="template.pedagogicalFeatures.learningObjectives">
                  <label class="block text-sm font-medium text-gray-500">学习目标</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.pedagogicalFeatures.learningObjectives }}</p>
                </div>
              </div>
            </div>
            
            <!-- 内容结构 -->
            <div v-if="template.contentStructure" class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">内容结构</h4>
              <div class="space-y-3">
                <div v-if="template.contentStructure.slideCount">
                  <label class="block text-sm font-medium text-gray-500">幻灯片数量</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.contentStructure.slideCount }}</p>
                </div>
                <div v-if="template.contentStructure.textDensity">
                  <label class="block text-sm font-medium text-gray-500">文本密度</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.contentStructure.textDensity }}</p>
                </div>
                <div v-if="template.contentStructure.mediaRatio">
                  <label class="block text-sm font-medium text-gray-500">媒体比例</label>
                  <p class="mt-1 text-sm text-gray-900">{{ template.contentStructure.mediaRatio }}</p>
                </div>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">操作</h4>
              <div class="space-y-3">
                <button 
                  @click="$emit('use', template)"
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  使用模板
                </button>
                <button 
                  @click="$emit('preview', template)"
                  class="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  预览模板
                </button>
                <button 
                  @click="$emit('download', template)"
                  class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  下载模板
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Template } from '@/api/types'

// Props
interface Props {
  template: Template
  visible: boolean
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  close: []
  edit: [template: Template]
  duplicate: [template: Template]
  export: [template: Template]
  use: [template: Template]
  preview: [template: Template]
  download: [template: Template]
}>()

// 难度级别颜色
const getDifficultyColor = (level: string) => {
  const colors = {
    'BEGINNER': 'bg-green-100 text-green-800',
    'BASIC': 'bg-blue-100 text-blue-800',
    'INTERMEDIATE': 'bg-yellow-100 text-yellow-800',
    'ADVANCED': 'bg-red-100 text-red-800'
  }
  return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

// 难度级别标签
const getDifficultyLabel = (level: string) => {
  const labels = {
    'BEGINNER': '入门级',
    'BASIC': '基础级',
    'INTERMEDIATE': '进阶级',
    'ADVANCED': '高级'
  }
  return labels[level as keyof typeof labels] || level
}

// 元素类型图标
const getElementIcon = (type: string) => {
  const icons = {
    'text': '📝',
    'vocabulary': '📚',
    'sentence': '💬',
    'image': '🖼️',
    'video': '🎥',
    'audio': '🎵',
    'chart': '📊',
    'table': '📋',
    'shape': '🔷',
    'latex': '🧮'
  }
  return icons[type as keyof typeof icons] || '📄'
}

// 元素类型名称
const getElementTypeName = (type: string) => {
  const names = {
    'text': '文本',
    'vocabulary': '词汇',
    'sentence': '句子',
    'image': '图片',
    'video': '视频',
    'audio': '音频',
    'chart': '图表',
    'table': '表格',
    'shape': '形状',
    'latex': 'LaTeX公式'
  }
  return names[type as keyof typeof names] || type
}

// 导入时间格式化工具
import { formatToBeijingTimeShort } from '@/utils/dateUtils'

// 格式化日期（使用北京时间）
const formatDate = (dateString: string) => {
  return formatToBeijingTimeShort(dateString)
}

// 格式化幻灯片数据
const formatSlideData = (slideData: any) => {
  if (!slideData) return '暂无数据'
  try {
    return JSON.stringify(slideData, null, 2)
  } catch (error) {
    return '数据格式错误'
  }
}
</script>

<style scoped>
.template-card {
  position: relative;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>