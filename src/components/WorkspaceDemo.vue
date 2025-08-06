<template>
  <div class="workspace-demo p-6 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">工作空间功能演示</h1>
      <p class="text-lg text-gray-600">
        体验完整的工作空间管理功能，包括创建、切换、数据管理和团队协作等核心特性。
      </p>
    </div>

    <!-- 功能导航 -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(demo, key) in demos"
          :key="key"
          @click="activeDemo = key"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeDemo === key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ demo.title }}
        </button>
      </div>
    </div>

    <!-- 演示内容 -->
    <div class="bg-white rounded-lg shadow-lg border border-gray-200">
      <!-- 工作空间基础操作 -->
      <div v-if="activeDemo === 'basic'" class="p-6">
        <h2 class="text-xl font-semibold mb-4">工作空间基础操作</h2>
        
        <!-- 当前工作空间信息 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">当前工作空间</h3>
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {{ currentWorkspace?.name?.charAt(0) || 'T' }}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">{{ currentWorkspace?.name || '教学团队A' }}</h4>
                  <p class="text-sm text-gray-600">{{ currentWorkspace?.description || '初中英语教学团队工作空间' }}</p>
                  <div class="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span>成员: {{ currentWorkspace?.memberCount || 12 }}人</span>
                    <span>PPT: {{ currentWorkspace?.pptCount || 45 }}个</span>
                    <span>模板: {{ currentWorkspace?.templateCount || 8 }}个</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">工作空间ID</div>
                <div class="font-mono text-sm">{{ currentWorkspace?.id || 'ws_001' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 工作空间切换 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">切换工作空间</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="workspace in demoWorkspaces"
              :key="workspace.id"
              @click="switchToWorkspace(workspace)"
              :class="[
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                workspace.id === (currentWorkspace?.id || 'ws_001')
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              ]"
            >
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold',
                  workspace.color
                ]">
                  {{ workspace.name.charAt(0) }}
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ workspace.name }}</h4>
                  <p class="text-sm text-gray-500">{{ workspace.memberCount }} 名成员</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex space-x-3">
          <button
            @click="showCreateWorkspaceModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            创建新工作空间
          </button>
          <button
            @click="exportWorkspaceData"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            导出工作空间数据
          </button>
          <button
            @click="showWorkspaceSettings = true"
            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            工作空间设置
          </button>
        </div>
      </div>

      <!-- 数据管理演示 -->
      <div v-if="activeDemo === 'data'" class="p-6">
        <h2 class="text-xl font-semibold mb-4">数据管理与同步</h2>
        
        <!-- 存储状态 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">存储状态</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-blue-900">LocalStorage</h4>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p class="text-sm text-blue-700">用户设置、工作空间偏好</p>
              <div class="text-xs text-blue-600 mt-2">{{ localStorageSize }} 已使用</div>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-purple-900">SessionStorage</h4>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p class="text-sm text-purple-700">临时数据、编辑状态</p>
              <div class="text-xs text-purple-600 mt-2">{{ sessionStorageSize }} 已使用</div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-green-900">IndexedDB</h4>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p class="text-sm text-green-700">项目数据、离线缓存</p>
              <div class="text-xs text-green-600 mt-2">{{ formatBytes(estimatedIndexedDBSize) }} 已使用</div>
            </div>
          </div>
        </div>

        <!-- 自动保存设置 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">自动保存设置</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <label class="flex items-center space-x-2">
                <input
                  v-model="autoSaveEnabled"
                  type="checkbox"
                  class="rounded border-gray-300"
                >
                <span class="font-medium">启用自动保存</span>
              </label>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span>上次保存:</span>
                <span class="font-mono">{{ lastSaveTime || '从未保存' }}</span>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">
                  保存间隔: {{ autoSaveInterval }} 分钟
                </label>
                <input
                  v-model="autoSaveInterval"
                  type="range"
                  min="1"
                  max="30"
                  class="w-full"
                  :disabled="!autoSaveEnabled"
                >
              </div>
              <div class="flex items-end">
                <button
                  @click="manualSave"
                  :disabled="saveInProgress"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {{ saveInProgress ? '保存中...' : '立即保存' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 数据操作 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium mb-3">数据导出</h3>
            <div class="space-y-3">
              <button
                @click="exportUserSettings"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                导出用户设置
              </button>
              <button
                @click="exportProjectDrafts"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                导出项目草稿
              </button>
              <button
                @click="exportAllData"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                导出所有数据
              </button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-3">数据导入</h3>
            <div class="space-y-3">
              <label class="block">
                <span class="sr-only">选择文件</span>
                <input
                  type="file"
                  accept=".json"
                  @change="importData"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                >
              </label>
              <button
                @click="clearAllData"
                class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                清除所有数据
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 团队协作演示 -->
      <div v-if="activeDemo === 'collaboration'" class="p-6">
        <h2 class="text-xl font-semibold mb-4">团队协作功能</h2>
        
        <!-- 成员管理 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">团队成员</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="member in teamMembers"
                :key="member.id"
                class="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center text-white font-medium',
                    member.avatarColor
                  ]">
                    {{ member.name.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{{ member.name }}</h4>
                    <p class="text-sm text-gray-500">{{ member.role }}</p>
                  </div>
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    member.online ? 'bg-green-500' : 'bg-gray-300'
                  ]"></div>
                </div>
              </div>
            </div>
            
            <div class="mt-4 flex space-x-2">
              <button
                @click="showInviteModal = true"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                邀请成员
              </button>
              <button
                @click="showMemberManagement = true"
                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                管理权限
              </button>
            </div>
          </div>
        </div>

        <!-- 协作活动 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">最近活动</h3>
          <div class="bg-white border border-gray-200 rounded-lg">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-start space-x-3">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium',
                  activity.userColor
                ]">
                  {{ activity.user.charAt(0) }}
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900">
                    <span class="font-medium">{{ activity.user }}</span>
                    {{ activity.action }}
                    <span class="font-medium">{{ activity.target }}</span>
                  </p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
                <div :class="[
                  'px-2 py-1 text-xs rounded-full',
                  activity.type === 'create' ? 'bg-green-100 text-green-800' :
                  activity.type === 'edit' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'delete' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                ]">
                  {{ activity.type === 'create' ? '创建' :
                     activity.type === 'edit' ? '编辑' :
                     activity.type === 'delete' ? '删除' : '其他' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 权限设置 -->
        <div>
          <h3 class="text-lg font-medium mb-3">权限设置</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-3 rounded border">
                <h4 class="font-medium text-gray-900 mb-2">查看权限</h4>
                <div class="space-y-2 text-sm">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" checked class="rounded">
                    <span>所有成员</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" checked class="rounded">
                    <span>管理员</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded">
                    <span>仅所有者</span>
                  </label>
                </div>
              </div>
              
              <div class="bg-white p-3 rounded border">
                <h4 class="font-medium text-gray-900 mb-2">编辑权限</h4>
                <div class="space-y-2 text-sm">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded">
                    <span>所有成员</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" checked class="rounded">
                    <span>管理员</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" checked class="rounded">
                    <span>仅所有者</span>
                  </label>
                </div>
              </div>
              
              <div class="bg-white p-3 rounded border">
                <h4 class="font-medium text-gray-900 mb-2">管理权限</h4>
                <div class="space-y-2 text-sm">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded">
                    <span>所有成员</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded">
                    <span>管理员</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" checked class="rounded">
                    <span>仅所有者</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用统计演示 -->
      <div v-if="activeDemo === 'analytics'" class="p-6">
        <h2 class="text-xl font-semibold mb-4">使用统计与分析</h2>
        
        <!-- 概览统计 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">工作空间概览</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ stats.totalProjects }}</div>
              <div class="text-sm text-blue-700">总项目数</div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <div class="text-2xl font-bold text-green-600">{{ stats.activeMembers }}</div>
              <div class="text-sm text-green-700">活跃成员</div>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
              <div class="text-2xl font-bold text-purple-600">{{ stats.templatesUsed }}</div>
              <div class="text-sm text-purple-700">使用模板</div>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg border border-orange-200 text-center">
              <div class="text-2xl font-bold text-orange-600">{{ stats.storageUsed }}</div>
              <div class="text-sm text-orange-700">存储使用</div>
            </div>
          </div>
        </div>

        <!-- 活动趋势 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">活动趋势</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="h-48 flex items-end justify-between space-x-2">
              <div
                v-for="(day, index) in activityData"
                :key="index"
                class="flex-1 bg-blue-500 rounded-t"
                :style="{ height: `${(day.value / Math.max(...activityData.map(d => d.value))) * 100}%` }"
                :title="`${day.label}: ${day.value} 次活动`"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-600">
              <span v-for="(day, index) in activityData" :key="index">
                {{ day.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- 热门资源 -->
        <div>
          <h3 class="text-lg font-medium mb-3">热门资源</h3>
          <div class="bg-white border border-gray-200 rounded-lg">
            <div
              v-for="resource in popularResources"
              :key="resource.id"
              class="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                    resource.type === 'ppt' ? 'bg-blue-500' :
                    resource.type === 'template' ? 'bg-purple-500' :
                    'bg-green-500'
                  ]">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path v-if="resource.type === 'ppt'" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z"></path>
                      <path v-else-if="resource.type === 'template'" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                      <path v-else d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v0a2 2 0 012 2v6.5A1.5 1.5 0 009.5 13h1A1.5 1.5 0 0012 11.5V5a2 2 0 012-2v0a2 2 0 012 2v5a4 4 0 01-4 4H9a4 4 0 01-4-4V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ resource.name }}</h4>
                    <p class="text-sm text-gray-500">{{ resource.description }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-semibold text-gray-900">{{ resource.views }}</div>
                  <div class="text-xs text-gray-500">次查看</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作结果提示 -->
    <div
      v-if="operationResult"
      :class="[
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300',
        operationResult.type === 'success' ? 'bg-green-500 text-white' :
        operationResult.type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
      ]"
    >
      {{ operationResult.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { useDataManagerStore } from '@/stores/dataManager'

// Stores
const workspaceStore = useWorkspaceStore()
const dataManagerStore = useDataManagerStore()

// 演示数据
const demos = {
  basic: { title: '基础操作' },
  data: { title: '数据管理' },
  collaboration: { title: '团队协作' },
  analytics: { title: '使用统计' }
}

const activeDemo = ref('basic')

// 工作空间数据
const demoWorkspaces = ref([
  {
    id: 'ws_001',
    name: '教学团队A',
    memberCount: 12,
    color: 'bg-blue-600'
  },
  {
    id: 'ws_002',
    name: '英语教研组',
    memberCount: 8,
    color: 'bg-green-600'
  },
  {
    id: 'ws_003',
    name: '物理实验室',
    memberCount: 6,
    color: 'bg-purple-600'
  }
])

const currentWorkspace = computed(() => workspaceStore.currentWorkspace)

// 数据管理状态
const autoSaveEnabled = ref(true)
const autoSaveInterval = ref(5)
const saveInProgress = ref(false)
const lastSaveTime = ref<string | null>(null)
const estimatedIndexedDBSize = ref(2.5 * 1024 * 1024) // 2.5MB

// 存储大小计算
const localStorageSize = computed(() => {
  try {
    return formatBytes(Object.keys(localStorage).length * 1024)
  } catch {
    return '0 B'
  }
})

const sessionStorageSize = computed(() => {
  try {
    return formatBytes(Object.keys(sessionStorage).length * 512)
  } catch {
    return '0 B'
  }
})

// 团队成员数据
const teamMembers = ref([
  {
    id: '1',
    name: '张老师',
    role: '所有者',
    online: true,
    avatarColor: 'bg-blue-600'
  },
  {
    id: '2',
    name: '李老师',
    role: '管理员',
    online: true,
    avatarColor: 'bg-green-600'
  },
  {
    id: '3',
    name: '王老师',
    role: '成员',
    online: false,
    avatarColor: 'bg-purple-600'
  },
  {
    id: '4',
    name: '陈老师',
    role: '成员',
    online: true,
    avatarColor: 'bg-orange-600'
  }
])

// 最近活动数据
const recentActivities = ref([
  {
    id: '1',
    user: '张老师',
    action: '创建了',
    target: '初中英语第一单元PPT',
    time: '2分钟前',
    type: 'create',
    userColor: 'bg-blue-600'
  },
  {
    id: '2',
    user: '李老师',
    action: '编辑了',
    target: '函数模板',
    time: '15分钟前',
    type: 'edit',
    userColor: 'bg-green-600'
  },
  {
    id: '3',
    user: '王老师',
    action: '上传了',
    target: '教学素材包',
    time: '1小时前',
    type: 'create',
    userColor: 'bg-purple-600'
  }
])

// 统计数据
const stats = ref({
  totalProjects: 45,
  activeMembers: 12,
  templatesUsed: 8,
  storageUsed: '2.3GB'
})

// 活动趋势数据
const activityData = ref([
  { label: '周一', value: 12 },
  { label: '周二', value: 19 },
  { label: '周三', value: 15 },
  { label: '周四', value: 25 },
  { label: '周五', value: 22 },
  { label: '周六', value: 8 },
  { label: '周日', value: 5 }
])

// 热门资源数据
const popularResources = ref([
  {
    id: '1',
    name: '初中英语语法PPT',
    description: '英语语法基础知识讲解',
    type: 'ppt',
    views: 156
  },
  {
    id: '2',
    name: '简约教学模板',
    description: '适用于各学科的通用模板',
    type: 'template',
    views: 89
  },
  {
    id: '3',
    name: '物理实验教材',
    description: '高中物理实验指导',
    type: 'textbook',
    views: 67
  }
])

// 模态框状态
const showCreateWorkspaceModal = ref(false)
const showWorkspaceSettings = ref(false)
const showInviteModal = ref(false)
const showMemberManagement = ref(false)

// 操作结果
const operationResult = ref<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)

// 方法
const switchToWorkspace = (workspace: any) => {
  workspaceStore.switchWorkspace(workspace.id)
  showResult('success', `已切换到工作空间: ${workspace.name}`)
}

const manualSave = async () => {
  saveInProgress.value = true
  try {
    // 模拟保存过程
    await new Promise(resolve => setTimeout(resolve, 1000))
    lastSaveTime.value = new Date().toLocaleTimeString()
    showResult('success', '数据保存成功')
  } catch (error) {
    showResult('error', '数据保存失败')
  } finally {
    saveInProgress.value = false
  }
}

const exportWorkspaceData = async () => {
  try {
    const success = await dataManagerStore.downloadDataFile()
    showResult(success ? 'success' : 'error', success ? '工作空间数据导出成功' : '导出失败')
  } catch (error) {
    showResult('error', '导出过程中发生错误')
  }
}

const exportUserSettings = async () => {
  try {
    const settings = dataManagerStore.userSettings
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'user-settings.json'
    a.click()
    URL.revokeObjectURL(url)
    showResult('success', '用户设置导出成功')
  } catch (error) {
    showResult('error', '导出失败')
  }
}

const exportProjectDrafts = async () => {
  try {
    const drafts = dataManagerStore.projectDrafts
    const blob = new Blob([JSON.stringify(drafts, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'project-drafts.json'
    a.click()
    URL.revokeObjectURL(url)
    showResult('success', '项目草稿导出成功')
  } catch (error) {
    showResult('error', '导出失败')
  }
}

const exportAllData = async () => {
  try {
    const success = await dataManagerStore.downloadDataFile()
    showResult(success ? 'success' : 'error', success ? '所有数据导出成功' : '导出失败')
  } catch (error) {
    showResult('error', '导出失败')
  }
}

const importData = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  try {
    const success = await dataManagerStore.importDataFromFile(file)
    showResult(success ? 'success' : 'error', success ? '数据导入成功' : '导入失败')
  } catch (error) {
    showResult('error', '导入过程中发生错误')
  } finally {
    target.value = ''
  }
}

const clearAllData = async () => {
  if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
    try {
      const success = await dataManagerStore.clearAllData()
      showResult(success ? 'success' : 'error', success ? '数据清除成功' : '清除失败')
    } catch (error) {
      showResult('error', '清除过程中发生错误')
    }
  }
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const showResult = (type: 'success' | 'error' | 'info', message: string) => {
  operationResult.value = { type, message }
  setTimeout(() => {
    operationResult.value = null
  }, 3000)
}

// 自动保存定时器
let autoSaveTimer: ReturnType<typeof setInterval> | null = null

const startAutoSave = () => {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
  }
  
  if (autoSaveEnabled.value) {
    autoSaveTimer = setInterval(() => {
      manualSave()
    }, autoSaveInterval.value * 60 * 1000)
  }
}

// 生命周期
onMounted(async () => {
  await workspaceStore.initialize()
  await dataManagerStore.initialize()
  startAutoSave()
})

onUnmounted(() => {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
  }
})

// 监听自动保存设置变化
watch([autoSaveEnabled, autoSaveInterval], () => {
  startAutoSave()
})
</script>

<style scoped>
.workspace-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 动画效果 */
.transition-all {
  transition: all 0.3s ease;
}

/* 卡片悬停效果 */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>