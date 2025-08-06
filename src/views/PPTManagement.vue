<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 主内容区域 -->
    <div class="ml-64">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700">工作空间:</label>
                <select 
                  v-model="selectedWorkspaceId"
                  @change="handleWorkspaceChange"
                  class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option 
                    v-for="workspace in workspaces" 
                    :key="workspace.id" 
                    :value="workspace.id"
                  >
                    {{ workspace.name }}
                  </option>
                </select>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-1">
              {{ currentWorkspaceName }} - 管理所有PPT文件和项目
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="搜索PPT..." 
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <router-link 
              to="/create"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + 新建PPT
            </router-link>
            
            <div class="relative">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span class="text-sm font-medium">用户</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- PPT管理内容 -->
      <div class="p-6">
        <!-- 筛选和视图控制 -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <!-- 批量操作 -->
            <div v-if="selectedPPTs.length > 0" class="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <span class="text-sm font-medium text-blue-700">已选择 {{ selectedPPTs.length }} 项</span>
              <button 
                @click="batchPublish"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                批量发布
              </button>
              <button 
                @click="batchArchive"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                批量归档
              </button>
              <button 
                @click="batchDelete"
                class="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                批量删除
              </button>
              <button 
                @click="clearSelection"
                class="text-sm text-gray-600 hover:text-gray-700"
              >
                取消选择
              </button>
            </div>
            
            <!-- 状态筛选 -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">状态:</label>
              <select 
                v-model="statusFilter"
                class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部</option>
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
                <option value="archived">已归档</option>
              </select>
            </div>
            
            <!-- 学科筛选 -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">学科:</label>
              <select 
                v-model="subjectFilter"
                class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部学科</option>
                <option value="英语">英语</option>
                <option value="物理">物理</option>
                <option value="化学">化学</option>
                <option value="语文">语文</option>
              </select>
            </div>
            
            <!-- 排序 -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">排序:</label>
              <select 
                v-model="sortBy"
                class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="createdAt">创建时间</option>
                <option value="updatedAt">更新时间</option>
                <option value="name">名称</option>
                <option value="slides">页数</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- 导出按钮 -->
            <button 
              @click="exportPPTs"
              class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>导出</span>
            </button>
            
            <!-- 视图切换 -->
            <div class="flex bg-gray-100 rounded-lg p-1">
              <button 
                @click="viewMode = 'grid'"
                :class="[
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                网格
              </button>
              <button 
                @click="viewMode = 'list'"
                :class="[
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                列表
              </button>
            </div>
          </div>
        </div>

        <!-- PPT列表 -->
        <div v-if="filteredPPTs.length > 0">
          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="ppt in filteredPPTs" 
              :key="ppt.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative"
              @click="selectPPT(ppt)"
            >
              <!-- 选择复选框 -->
              <div class="absolute top-3 left-3 z-10">
                <input 
                  type="checkbox" 
                  :checked="selectedPPTs.includes(ppt.id)"
                  @click.stop
                  @change="togglePPTSelection(ppt.id)"
                  class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                >
              </div>
              
              <!-- PPT缩略图 -->
              <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center relative">
                <div class="text-white text-center">
                  <div class="text-2xl font-bold mb-1">{{ ppt.slides }}</div>
                  <div class="text-sm opacity-90">页</div>
                </div>
                <!-- 状态标识 -->
                <div class="absolute top-3 right-3">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs rounded-full text-white',
                      ppt.status === 'published' ? 'bg-green-500' :
                      ppt.status === 'draft' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    ]"
                  >
                    {{ getStatusText(ppt.status) }}
                  </span>
                </div>
              </div>
              
              <!-- PPT信息 -->
              <div class="p-4">
                <h3 class="font-medium text-gray-900 mb-1 truncate">{{ ppt.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ ppt.subject }} · {{ ppt.chapter }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{{ ppt.slides }}页</span>
                  <span>{{ ppt.createdAt }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <button 
                    @click.stop="showPPTDetails(ppt)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    查看详情
                  </button>
                  <div class="flex items-center space-x-1">
                    <button 
                      @click.stop="editPPT(ppt)"
                      class="text-blue-600 hover:text-blue-700 p-1"
                      title="编辑"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button 
                      @click.stop="previewPPT(ppt)"
                      class="text-green-600 hover:text-green-700 p-1"
                      title="预览"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <div class="relative">
                      <button 
                        @click.stop="togglePPTMenu(ppt.id)"
                        class="text-gray-600 hover:text-gray-700 p-1"
                        title="更多操作"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                      <!-- 下拉菜单 -->
                      <div 
                        v-if="activePPTMenu === ppt.id"
                        class="absolute right-0 top-8 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-20"
                      >
                        <button 
                          @click.stop="duplicatePPT(ppt)"
                          class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          复制
                        </button>
                        <button 
                          @click.stop="downloadPPT(ppt)"
                          class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          下载
                        </button>
                        <button 
                          @click.stop="sharePPT(ppt)"
                          class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          分享
                        </button>
                        <hr class="my-1">
                        <button 
                          @click.stop="deletePPT(ppt)"
                          class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 列表视图 -->
          <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left">
                      <input 
                        type="checkbox" 
                        :checked="isAllSelected"
                        @change="toggleSelectAll"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      >
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PPT名称</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学科</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">章节</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">页数</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="ppt in filteredPPTs" 
                    :key="ppt.id"
                    class="hover:bg-gray-50 cursor-pointer"
                    @click="selectPPT(ppt)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        :checked="selectedPPTs.includes(ppt.id)"
                        @click.stop
                        @change="togglePPTSelection(ppt.id)"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span class="text-white text-xs font-bold">{{ ppt.slides }}</span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ ppt.name }}</div>
                          <div class="text-sm text-gray-500">{{ ppt.slides }}页</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ppt.subject }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ppt.chapter }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ppt.slides }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="[
                          'px-2 py-1 text-xs rounded-full',
                          ppt.status === 'published' ? 'bg-green-100 text-green-800' :
                          ppt.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ getStatusText(ppt.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ppt.createdAt }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center space-x-2">
                        <button 
                          @click.stop="showPPTDetails(ppt)"
                          class="text-blue-600 hover:text-blue-700"
                        >
                          详情
                        </button>
                        <button 
                          @click.stop="editPPT(ppt)"
                          class="text-blue-600 hover:text-blue-700"
                        >
                          编辑
                        </button>
                        <button 
                          @click.stop="previewPPT(ppt)"
                          class="text-green-600 hover:text-green-700"
                        >
                          预览
                        </button>
                        <div class="relative">
                          <button 
                            @click.stop="togglePPTMenu(ppt.id)"
                            class="text-gray-600 hover:text-gray-700"
                          >
                            ⋯
                          </button>
                          <div 
                            v-if="activePPTMenu === ppt.id"
                            class="absolute right-0 top-8 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-20"
                          >
                            <button 
                              @click.stop="duplicatePPT(ppt)"
                              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              复制
                            </button>
                            <button 
                              @click.stop="downloadPPT(ppt)"
                              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              下载
                            </button>
                            <button 
                              @click.stop="sharePPT(ppt)"
                              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              分享
                            </button>
                            <hr class="my-1">
                            <button 
                              @click.stop="deletePPT(ppt)"
                              class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📄</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无PPT</h3>
          <p class="text-gray-600 mb-4">当前工作空间还没有PPT文件，创建第一个吧！</p>
          <router-link 
            to="/create"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            创建PPT
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- PPT详情弹窗 -->
    <div 
      v-if="showDetailsModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showDetailsModal = false"
    >
      <div 
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <!-- 弹窗头部 -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">PPT详情</h3>
            <button 
              @click="showDetailsModal = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- PPT信息 -->
          <div v-if="selectedPPTDetails" class="space-y-6">
            <!-- 基本信息 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-4">基本信息</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-sm font-medium text-gray-500">PPT名称</label>
                    <p class="text-gray-900">{{ selectedPPTDetails.name }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">学科</label>
                    <p class="text-gray-900">{{ selectedPPTDetails.subject }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">章节</label>
                    <p class="text-gray-900">{{ selectedPPTDetails.chapter }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">页数</label>
                    <p class="text-gray-900">{{ selectedPPTDetails.slides }}页</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-4">状态信息</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-sm font-medium text-gray-500">当前状态</label>
                    <div class="mt-1">
                      <span 
                        :class="[
                          'px-3 py-1 text-sm rounded-full',
                          selectedPPTDetails.status === 'published' ? 'bg-green-100 text-green-800' :
                          selectedPPTDetails.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ getStatusText(selectedPPTDetails.status) }}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">创建时间</label>
                    <p class="text-gray-900">{{ selectedPPTDetails.createdAt }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">工作空间</label>
                    <p class="text-gray-900">{{ currentWorkspaceName }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 预览缩略图 -->
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-4">预览</h4>
              <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div class="text-white text-center">
                  <div class="text-4xl font-bold mb-2">{{ selectedPPTDetails.slides }}</div>
                  <div class="text-lg opacity-90">页PPT</div>
                </div>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button 
                @click="showDetailsModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                关闭
              </button>
              <button 
                @click="previewPPT(selectedPPTDetails); showDetailsModal = false"
                class="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                预览PPT
              </button>
              <button 
                @click="editPPT(selectedPPTDetails); showDetailsModal = false"
                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                编辑PPT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import Sidebar from '@/components/Sidebar.vue'

// 接口定义
interface PPT {
  id: number
  name: string
  subject: string
  chapter: string
  slides: number
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
  workspaceId: string
  textbookId?: number
  chapterId?: number
}

// 工作空间store
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(currentWorkspace?.id || '')
const searchQuery = ref('')
const statusFilter = ref('all')
const subjectFilter = ref('all')
const sortBy = ref('createdAt')
const viewMode = ref<'grid' | 'list'>('grid')
const selectedPPTs = ref<number[]>([])
const activePPTMenu = ref<number | null>(null)
const showDetailsModal = ref(false)
const selectedPPTDetails = ref<PPT | null>(null)

// 模拟PPT数据
const allPPTs = ref<PPT[]>([
  {
    id: 1,
    name: '英语字母与发音',
    subject: '英语',
    chapter: 'Unit 1 Hello',
    slides: 15,
    status: 'published',
    createdAt: '2024-12-15',
    updatedAt: '2024-12-16',
    workspaceId: '1',
    textbookId: 1,
    chapterId: 1
  },
  {
    id: 2,
    name: '基础问候语',
    subject: '英语',
    chapter: 'Unit 1 Hello',
    slides: 18,
    status: 'draft',
    createdAt: '2024-12-16',
    updatedAt: '2024-12-17',
    workspaceId: '1',
    textbookId: 1,
    chapterId: 1
  },
  {
    id: 3,
    name: '家庭成员介绍',
    subject: '英语',
    chapter: 'Unit 2 My Family',
    slides: 20,
    status: 'published',
    createdAt: '2024-12-17',
    updatedAt: '2024-12-18',
    workspaceId: '1',
    textbookId: 1,
    chapterId: 2
  },
  {
    id: 4,
    name: '质点 参考系和坐标系',
    subject: '物理',
    chapter: '第一章 运动的描述',
    slides: 12,
    status: 'published',
    createdAt: '2024-12-10',
    updatedAt: '2024-12-11',
    workspaceId: '2',
    textbookId: 2,
    chapterId: 1
  },
  {
    id: 5,
    name: '时间和位移',
    subject: '物理',
    chapter: '第一章 运动的描述',
    slides: 16,
    status: 'draft',
    createdAt: '2024-12-12',
    updatedAt: '2024-12-13',
    workspaceId: '2',
    textbookId: 2,
    chapterId: 1
  },
  {
    id: 6,
    name: '化学实验基础',
    subject: '化学',
    chapter: '第一章 化学实验基本方法',
    slides: 22,
    status: 'archived',
    createdAt: '2024-12-08',
    updatedAt: '2024-12-09',
    workspaceId: '3',
    textbookId: 3,
    chapterId: 1
  }
])

// 计算属性：根据当前工作空间和筛选条件过滤PPT
const filteredPPTs = computed(() => {
  let filtered = allPPTs.value
  
  // 按工作空间过滤
  if (currentWorkspace) {
    filtered = filtered.filter(ppt => ppt.workspaceId === currentWorkspace.id)
  }
  
  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(ppt => 
      ppt.name.toLowerCase().includes(query) ||
      ppt.subject.toLowerCase().includes(query) ||
      ppt.chapter.toLowerCase().includes(query)
    )
  }
  
  // 按状态过滤
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(ppt => ppt.status === statusFilter.value)
  }
  
  // 按学科过滤
  if (subjectFilter.value !== 'all') {
    filtered = filtered.filter(ppt => ppt.subject === subjectFilter.value)
  }
  
  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'slides':
        return b.slides - a.slides
      case 'updatedAt':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'createdAt':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
  
  return filtered
})

// 计算属性：是否全选
const isAllSelected = computed(() => {
  return filteredPPTs.value.length > 0 && selectedPPTs.value.length === filteredPPTs.value.length
})

// 方法
const handleWorkspaceChange = () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
  }
}

const getStatusText = (status: string) => {
  const statusMap = {
    'draft': '草稿',
    'published': '已发布',
    'archived': '已归档'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const selectPPT = (ppt: PPT) => {
  console.log('选择PPT:', ppt)
  // 这里可以跳转到PPT详情页或编辑页
}

const editPPT = (ppt: PPT) => {
  console.log('编辑PPT:', ppt)
  // 跳转到PPT编辑器
  alert(`编辑PPT: ${ppt.name}`)
}

const previewPPT = (ppt: PPT) => {
  console.log('预览PPT:', ppt)
  // 打开PPT预览
  alert(`预览PPT: ${ppt.name}`)
}

const deletePPT = (ppt: PPT) => {
  if (confirm(`确定要删除PPT "${ppt.name}" 吗？`)) {
    const index = allPPTs.value.findIndex(p => p.id === ppt.id)
    if (index > -1) {
      allPPTs.value.splice(index, 1)
    }
    console.log('删除PPT:', ppt)
  }
}

// 批量选择相关方法
const togglePPTSelection = (pptId: number) => {
  const index = selectedPPTs.value.indexOf(pptId)
  if (index > -1) {
    selectedPPTs.value.splice(index, 1)
  } else {
    selectedPPTs.value.push(pptId)
  }
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedPPTs.value = []
  } else {
    selectedPPTs.value = filteredPPTs.value.map(ppt => ppt.id)
  }
}

const clearSelection = () => {
  selectedPPTs.value = []
}

// 批量操作方法
const batchPublish = () => {
  console.log('批量发布:', selectedPPTs.value)
  alert(`批量发布 ${selectedPPTs.value.length} 个PPT`)
}

const batchArchive = () => {
  console.log('批量归档:', selectedPPTs.value)
  alert(`批量归档 ${selectedPPTs.value.length} 个PPT`)
}

const batchDelete = () => {
  if (confirm(`确定要删除选中的 ${selectedPPTs.value.length} 个PPT吗？`)) {
    selectedPPTs.value.forEach(id => {
      const index = allPPTs.value.findIndex(p => p.id === id)
      if (index > -1) {
        allPPTs.value.splice(index, 1)
      }
    })
    selectedPPTs.value = []
    console.log('批量删除完成')
  }
}

// PPT菜单相关方法
const togglePPTMenu = (pptId: number) => {
  activePPTMenu.value = activePPTMenu.value === pptId ? null : pptId
}

const duplicatePPT = (ppt: PPT) => {
  console.log('复制PPT:', ppt)
  alert(`复制PPT: ${ppt.name}`)
  activePPTMenu.value = null
}

const downloadPPT = (ppt: PPT) => {
  console.log('下载PPT:', ppt)
  alert(`下载PPT: ${ppt.name}`)
  activePPTMenu.value = null
}

const sharePPT = (ppt: PPT) => {
  console.log('分享PPT:', ppt)
  alert(`分享PPT: ${ppt.name}`)
  activePPTMenu.value = null
}

// PPT详情相关方法
const showPPTDetails = (ppt: PPT) => {
  selectedPPTDetails.value = ppt
  showDetailsModal.value = true
  console.log('显示PPT详情:', ppt)
}

// 导出功能
const exportPPTs = () => {
  console.log('导出PPT列表')
  alert('导出功能开发中...')
}

// 点击外部关闭菜单
const handleClickOutside = () => {
  activePPTMenu.value = null
}

// 生命周期
onMounted(async () => {
  await workspaceStore.initialize()
  selectedWorkspaceId.value = workspaceStore.currentWorkspaceId
  
  // 添加全局点击事件监听
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* PPT管理页面样式 */
</style>