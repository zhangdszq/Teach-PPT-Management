<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ isEditing ? '编辑模板' : '创建新模板' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 表单内容 -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 基础信息 -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-gray-900 border-b pb-2">基础信息</h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板名称 *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="请输入模板名称"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板描述</label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="请输入模板描述"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">学科 *</label>
                <select
                  v-model="formData.subject"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">年级 *</label>
                <select
                  v-model="formData.gradeLevel"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">请选择年级</option>
                  <option value="小学">小学</option>
                  <option value="初中">初中</option>
                  <option value="高中">高中</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板分类 *</label>
                <select
                  v-model="formData.templateCategory"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">请选择分类</option>
                  <option value="正式学习">正式学习</option>
                  <option value="看图选择">看图选择</option>
                  <option value="提问环节">提问环节</option>
                  <option value="练习测试">练习测试</option>
                  <option value="总结回顾">总结回顾</option>
                </select>
              </div>
            </div>

            <!-- 教学信息 -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-gray-900 border-b pb-2">教学信息</h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">模板类型</label>
                <input
                  v-model="formData.templateType"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="如：词汇学习、语法练习等"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">教学目的</label>
                <textarea
                  v-model="formData.teachingPurpose"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="请描述该模板的教学目的和适用场景"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">难度级别 *</label>
                <select
                  v-model="formData.difficultyLevel"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">请选择难度</option>
                  <option value="BEGINNER">入门级</option>
                  <option value="BASIC">基础级</option>
                  <option value="INTERMEDIATE">进阶级</option>
                  <option value="ADVANCED">高级</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">预估时长</label>
                <input
                  v-model="formData.estimatedDuration"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="如：15分钟、30分钟等"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">布局类型</label>
                <input
                  v-model="formData.layoutType"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="如：左右布局、上下布局等"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">视觉风格</label>
                <input
                  v-model="formData.visualStyle"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="如：简约、卡通、商务等"
                >
              </div>
            </div>
          </div>

          <!-- 标签管理 -->
          <div class="mt-6">
            <h4 class="text-md font-medium text-gray-900 border-b pb-2 mb-4">标签管理</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">添加标签</label>
                <div class="flex space-x-2">
                  <input
                    v-model="newTag"
                    @keyup.enter="addTag"
                    type="text"
                    class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="输入标签名称，按回车添加"
                  >
                  <button
                    @click="addTag"
                    type="button"
                    class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>
              
              <div v-if="formData.tags && formData.tags.length > 0">
                <label class="block text-sm font-medium text-gray-700 mb-2">当前标签</label>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tag, index) in formData.tags"
                    :key="index"
                    class="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {{ typeof tag === 'string' ? tag : tag.tag }}
                    <button
                      @click="removeTag(index)"
                      type="button"
                      class="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 幻灯片数据 -->
          <div class="mt-6" v-if="isEditing">
            <h4 class="text-md font-medium text-gray-900 border-b pb-2 mb-4">幻灯片数据</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600 mb-2">当前模板包含的幻灯片数据：</p>
              <div class="text-xs text-gray-500 font-mono bg-white p-3 rounded border max-h-32 overflow-y-auto">
                {{ JSON.stringify(formData.slideData, null, 2) }}
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
        <button
          @click="$emit('close')"
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          取消
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid || saving"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ saving ? '保存中...' : (isEditing ? '更新模板' : '创建模板') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import templateManagementAPI from '@/api/templateManagement'
import type { EnhancedTemplate } from '@/api/types'

// Props
interface Props {
  template?: EnhancedTemplate | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  template: null,
  isEditing: false
})

// Emits
const emit = defineEmits<{
  close: []
  save: []
}>()

// 响应式数据
const saving = ref(false)
const newTag = ref('')

// 表单数据
const formData = ref<Partial<EnhancedTemplate>>({
  name: '',
  description: '',
  subject: '',
  gradeLevel: '',
  templateCategory: '',
  templateType: '',
  teachingPurpose: '',
  difficultyLevel: 'BASIC',
  estimatedDuration: '',
  layoutType: '',
  visualStyle: '',
  tags: [],
  slideData: {}
})

// 计算属性
const isFormValid = computed(() => {
  return formData.value.name && 
         formData.value.subject && 
         formData.value.gradeLevel && 
         formData.value.templateCategory && 
         formData.value.difficultyLevel
})

// 方法
const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags?.some(tag => 
    (typeof tag === 'string' ? tag : tag.tag) === newTag.value.trim()
  )) {
    if (!formData.value.tags) {
      formData.value.tags = []
    }
    formData.value.tags.push({ tag: newTag.value.trim() } as any)
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  if (formData.value.tags) {
    formData.value.tags.splice(index, 1)
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value || saving.value) return

  saving.value = true
  try {
    let response
    if (props.isEditing && props.template) {
      response = await templateManagementAPI.updateTemplate(props.template.templateId, formData.value)
    } else {
      // 为新模板生成ID
      formData.value.templateId = `template_${Date.now()}`
      response = await templateManagementAPI.createTemplate(formData.value as any)
    }

    if (response.success) {
      emit('save')
    } else {
      console.error('保存失败:', response.message)
    }
  } catch (error) {
    console.error('保存模板失败:', error)
  } finally {
    saving.value = false
  }
}

// 监听模板变化，初始化表单数据
watch(() => props.template, (template) => {
  if (template) {
    formData.value = {
      ...template,
      tags: template.tags || []
    }
  } else {
    // 重置表单
    formData.value = {
      name: '',
      description: '',
      subject: '',
      gradeLevel: '',
      templateCategory: '',
      templateType: '',
      teachingPurpose: '',
      difficultyLevel: 'BASIC',
      estimatedDuration: '',
      layoutType: '',
      visualStyle: '',
      tags: [],
      slideData: {}
    }
  }
}, { immediate: true })
</script>