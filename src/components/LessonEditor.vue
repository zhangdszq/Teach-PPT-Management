<template>
  <div class="lesson-editor bg-white rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">编辑课程</h3>
      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <form @submit.prevent="saveLesson" class="space-y-6">
      <!-- 基本信息 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">课程名称</label>
          <input 
            v-model="lessonForm.name"
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="请输入课程名称"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">课程类型</label>
          <select 
            v-model="lessonForm.lessonType"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">选择课程类型</option>
            <option value="VOCABULARY_SENTENCE">词汇句子</option>
            <option value="SCENARIO_BASED">场景对话</option>
            <option value="GRAMMAR_FOCUSED">语法重点</option>
            <option value="CONVERSATION">对话练习</option>
            <option value="READING_COMPREHENSION">阅读理解</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">课程描述</label>
        <textarea 
          v-model="lessonForm.description"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          rows="3"
          placeholder="请输入课程描述"
        ></textarea>
      </div>

      <!-- 词汇列表 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">词汇列表</label>
        <div class="space-y-3">
          <div v-for="(vocab, index) in lessonForm.vocabularies" :key="index" class="border border-gray-200 rounded-lg p-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">单词</label>
                <input 
                  v-model="vocab.word"
                  type="text" 
                  class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="输入单词"
                >
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">翻译</label>
                <input 
                  v-model="vocab.translation"
                  type="text" 
                  class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="输入翻译"
                >
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">音标</label>
                <div class="flex items-center space-x-2">
                  <input 
                    v-model="vocab.phonetic"
                    type="text" 
                    class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="输入音标"
                  >
                  <button 
                    type="button" 
                    @click="removeVocabulary(index)"
                    class="text-red-600 hover:text-red-700"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button 
            type="button" 
            @click="addVocabulary"
            class="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-gray-400 hover:text-gray-600"
          >
            + 添加词汇
          </button>
        </div>
      </div>

      <!-- 句子列表 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">句子列表</label>
        <div class="space-y-3">
          <div v-for="(sentence, index) in lessonForm.sentences" :key="index" class="border border-gray-200 rounded-lg p-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">句子内容</label>
                <textarea 
                  v-model="sentence.content"
                  class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                  rows="2"
                  placeholder="输入句子内容"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">翻译</label>
                <div class="flex flex-col space-y-2">
                  <textarea 
                    v-model="sentence.translation"
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                    rows="2"
                    placeholder="输入翻译"
                  ></textarea>
                  <button 
                    type="button" 
                    @click="removeSentence(index)"
                    class="self-end text-red-600 hover:text-red-700"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button 
            type="button" 
            @click="addSentence"
            class="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-gray-400 hover:text-gray-600"
          >
            + 添加句子
          </button>
        </div>
      </div>

      <!-- 场景列表 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">场景列表</label>
        <div class="space-y-2">
          <div v-for="(scenario, index) in lessonForm.scenarios" :key="index" class="flex items-center space-x-2">
            <textarea 
              v-model="lessonForm.scenarios[index]"
              class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              rows="2"
              placeholder="输入场景描述"
            ></textarea>
            <button 
              type="button" 
              @click="removeScenario(index)"
              class="text-red-600 hover:text-red-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
          <button 
            type="button" 
            @click="addScenario"
            class="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:border-gray-400 hover:text-gray-600"
          >
            + 添加场景
          </button>
        </div>
      </div>

      <!-- PPT关联 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">关联PPT</label>
        <select 
          v-model="lessonForm.pptId"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">选择PPT（可选）</option>
          <option v-for="ppt in availablePPTs" :key="ppt.id" :value="ppt.id">
            {{ ppt.name }} ({{ ppt.slides }}页) - ID: {{ ppt.pptId }}
          </option>
        </select>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end space-x-3">
        <button 
          type="button" 
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          取消
        </button>
        <button 
          type="submit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
        >
          {{ loading ? '保存中...' : '保存' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { textbookAPI } from '@/api/textbook'
import * as pptAPI from '@/api/pptManagement'
import type { Lesson, LessonType, PPT, Vocabulary, Sentence } from '@/api/types'
import type { PPTInfo } from '@/api/pptManagement'

// Props
interface Props {
  lesson?: Lesson
  unitId: number
}

const props = withDefaults(defineProps<Props>(), {
  lesson: undefined
})

// Emits
const emit = defineEmits<{
  close: []
  saved: [lesson: Lesson]
}>()

// 响应式数据
const loading = ref(false)
const availablePPTs = ref<PPT[]>([])

// 表单数据
const lessonForm = reactive({
  name: props.lesson?.name || '',
  description: props.lesson?.description || '',
  lessonType: props.lesson?.lessonType || '' as LessonType,
  vocabularies: props.lesson?.vocabularies || [{ id: 0, word: '', translation: '', phonetic: '', wordOrder: 0, lessonId: 0, createdAt: '', updatedAt: '' }] as Vocabulary[],
  sentences: props.lesson?.sentences || [{ id: 0, content: '', translation: '', sentenceOrder: 0, lessonId: 0, createdAt: '', updatedAt: '' }] as Sentence[],
  scenarios: props.lesson?.scenarios || [''],
  pptId: props.lesson?.pptId || undefined
})

/**
 * 添加词汇
 */
const addVocabulary = (): void => {
  const newVocab: Vocabulary = {
    id: 0,
    word: '',
    translation: '',
    phonetic: '',
    wordOrder: lessonForm.vocabularies.length,
    lessonId: 0,
    createdAt: '',
    updatedAt: ''
  }
  lessonForm.vocabularies.push(newVocab)
}

/**
 * 移除词汇
 */
const removeVocabulary = (index: number): void => {
  lessonForm.vocabularies.splice(index, 1)
}

/**
 * 添加句子
 */
const addSentence = (): void => {
  const newSentence: Sentence = {
    id: 0,
    content: '',
    translation: '',
    sentenceOrder: lessonForm.sentences.length,
    lessonId: 0,
    createdAt: '',
    updatedAt: ''
  }
  lessonForm.sentences.push(newSentence)
}

/**
 * 移除句子
 */
const removeSentence = (index: number): void => {
  lessonForm.sentences.splice(index, 1)
}

/**
 * 添加场景
 */
const addScenario = (): void => {
  lessonForm.scenarios.push('')
}

/**
 * 移除场景
 */
const removeScenario = (index: number): void => {
  lessonForm.scenarios.splice(index, 1)
}

/**
 * 保存课程
 */
const saveLesson = async (): Promise<void> => {
  try {
    loading.value = true
    
    // 过滤空值
    const cleanedForm = {
      ...lessonForm,
      vocabularies: lessonForm.vocabularies.filter((v: Vocabulary) => v.word.trim()),
      sentences: lessonForm.sentences.filter((s: Sentence) => s.content.trim()),
      scenarios: lessonForm.scenarios.filter((s: string) => s.trim())
    }
    
    let savedLesson: Lesson
    
    if (props.lesson) {
      // 更新现有课程
      savedLesson = await textbookAPI.updateLesson(props.lesson.id, cleanedForm)
    } else {
      // 创建新课程
      savedLesson = await textbookAPI.createLesson(props.unitId, {
        ...cleanedForm,
        unitId: props.unitId,
        lessonOrder: 1, // 默认顺序
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
    
    emit('saved', savedLesson)
    emit('close')
  } catch (error) {
    console.error('保存课程失败:', error)
    // 这里可以添加错误提示
  } finally {
    loading.value = false
  }
}

/**
 * 加载可用的PPT列表
 */
const loadAvailablePPTs = async (): Promise<void> => {
  try {
    const response = await pptAPI.getPPTList({
      status: 'all',
      page: 1,
      size: 100
    })
    
    if (response.success && response.data) {
       availablePPTs.value = response.data.map((ppt: PPTInfo) => ({
          id: parseInt(ppt.pptId) || 0,
          name: ppt.title,
          slides: ppt.slideCount || 0,
          pptId: ppt.pptId,
          chapterId: 0, // 默认值，因为PPTInfo中没有chapterId
          createdAt: ppt.createdAt || new Date().toISOString()
        }))
     }
  } catch (error) {
    console.error('加载PPT列表失败:', error)
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadAvailablePPTs()
})
</script>

<style scoped>
.lesson-editor {
  max-height: 80vh;
  overflow-y: auto;
}
</style>