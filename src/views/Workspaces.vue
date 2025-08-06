<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 主内容区域 -->
    <main class="ml-64">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">工作空间</h2>
            <p class="text-sm text-gray-600">管理团队工作空间和协作环境</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              @click="showCreateModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + 创建工作空间
            </button>
            
            <div class="relative">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span class="text-sm font-medium">用户</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- 工作空间内容 -->
      <div class="p-6">
        <!-- 当前工作空间 -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">当前工作空间</h3>
            <select 
              v-model="selectedWorkspaceId" 
              @change="handleWorkspaceChange"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">
                {{ workspace.name }}
              </option>
            </select>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6" v-if="currentWorkspace">
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div class="text-2xl font-bold text-blue-600">
                    {{ currentWorkspace.name.charAt(0) }}
                  </div>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900">{{ currentWorkspace.name }}</h4>
                  <p class="text-gray-600 mb-2">{{ currentWorkspace.description }}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>成员: {{ currentWorkspace.memberCount }}人</span>
                    <span>教材: {{ currentWorkspace.textbookCount }}本</span>
                    <span>PPT: {{ currentWorkspace.pptCount }}个</span>
                    <span>模板: {{ currentWorkspace.templateCount }}个</span>
                  </div>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="text-gray-600 hover:text-gray-900 p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button class="text-gray-600 hover:text-gray-900 p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 所有工作空间 -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">所有工作空间</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 工作空间卡片 -->
            <div 
              v-for="workspace in workspaces" 
              :key="workspace.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              @click="showWorkspaceDetails(workspace)"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {{ workspace.name.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <h4 class="font-semibold text-gray-900">{{ workspace.name }}</h4>
                    <p class="text-xs text-gray-500">{{ workspace.memberCount }} 名成员</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      workspace.role === 'owner' ? 'bg-green-100 text-green-800' :
                      workspace.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ workspace.role === 'owner' ? '所有者' : workspace.role === 'admin' ? '管理员' : '成员' }}
                  </span>
                  <button 
                    class="text-gray-400 hover:text-gray-600 p-1"
                    @click.stop="showWorkspaceMenu(workspace)"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <p class="text-sm text-gray-600 mb-4">{{ workspace.description }}</p>
              
              <!-- 工作空间统计 -->
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-lg font-semibold text-gray-900">{{ workspace.pptCount }}</div>
                  <div class="text-xs text-gray-500">PPT</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-gray-900">{{ workspace.textbookCount }}</div>
                  <div class="text-xs text-gray-500">教材</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-gray-900">{{ workspace.templateCount }}</div>
                  <div class="text-xs text-gray-500">模板</div>
                </div>
              </div>
              
              <!-- 最近活动和成员 -->
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ workspace.lastActivity }}
                </div>
                <div class="flex items-center space-x-1">
                  <div 
                    v-for="member in workspace.recentMembers.slice(0, 3)" 
                    :key="member.id"
                    class="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium"
                    :style="{ backgroundColor: member.avatar }"
                    :title="member.name"
                  >
                    {{ member.name.charAt(0) }}
                  </div>
                  <span v-if="workspace.memberCount > 3" class="text-xs text-gray-400">+{{ workspace.memberCount - 3 }}</span>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div class="flex space-x-1">
                  <button class="text-gray-400 hover:text-gray-600 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-red-600 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <h4 class="font-semibold text-gray-900 mb-2">教学团队B</h4>
              <p class="text-sm text-gray-600 mb-4">高中物理教学团队工作空间</p>
              
              <div class="space-y-2 text-sm text-gray-500">
                <div class="flex justify-between">
                  <span>成员</span>
                  <span>8人</span>
                </div>
                <div class="flex justify-between">
                  <span>教材</span>
                  <span>3本</span>
                </div>
                <div class="flex justify-between">
                  <span>PPT</span>
                  <span>32个</span>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-2">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white">+6</div>
                  </div>
                  <span class="text-xs text-gray-500">活跃成员</span>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div class="flex space-x-1">
                  <button class="text-gray-400 hover:text-gray-600 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-red-600 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <h4 class="font-semibold text-gray-900 mb-2">个人工作空间</h4>
              <p class="text-sm text-gray-600 mb-4">我的个人PPT创作空间</p>
              
              <div class="space-y-2 text-sm text-gray-500">
                <div class="flex justify-between">
                  <span>成员</span>
                  <span>1人</span>
                </div>
                <div class="flex justify-between">
                  <span>教材</span>
                  <span>2本</span>
                </div>
                <div class="flex justify-between">
                  <span>PPT</span>
                  <span>15个</span>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-2">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span class="text-xs text-gray-500">仅自己</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 创建工作空间模态框 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">创建工作空间</h3>
          <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="createWorkspace">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">工作空间名称</label>
              <input 
                v-model="newWorkspace.name"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="请输入工作空间名称"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">描述</label>
              <textarea 
                v-model="newWorkspace.description"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                rows="3" 
                placeholder="请输入工作空间描述"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">类型</label>
              <select 
                v-model="newWorkspace.type"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="team">团队工作空间</option>
                <option value="personal">个人工作空间</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">邀请成员 (可选)</label>
              <input 
                v-model="newWorkspace.inviteEmails"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入邮箱地址，多个邮箱用逗号分隔"
              >
              <p class="text-xs text-gray-500 mt-1">创建后将自动发送邀请邮件</p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              @click="showCreateModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- 工作空间详情模态框 -->
    <div v-if="showWorkspaceDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
              {{ selectedWorkspace?.name?.charAt(0) }}
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ selectedWorkspace?.name }}</h3>
              <p class="text-sm text-gray-500">{{ selectedWorkspace?.memberCount }} 名成员</p>
            </div>
          </div>
          <button @click="showWorkspaceDetail = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex h-[calc(90vh-120px)]">
          <!-- 左侧标签页 -->
          <div class="w-48 bg-gray-50 border-r border-gray-200">
            <nav class="p-4 space-y-2">
              <button 
                v-for="tab in workspaceTabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon"></path>
                  </svg>
                  {{ tab.name }}
                </div>
              </button>
            </nav>
          </div>
          
          <!-- 右侧内容 -->
          <div class="flex-1 overflow-y-auto">
            <!-- 概览标签页 -->
            <div v-if="activeTab === 'overview'" class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-blue-600">PPT总数</p>
                      <p class="text-2xl font-bold text-blue-900">{{ selectedWorkspace?.pptCount }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-green-50 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-green-600">教材数量</p>
                      <p class="text-2xl font-bold text-green-900">{{ selectedWorkspace?.textbookCount }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-purple-600">模板数量</p>
                      <p class="text-2xl font-bold text-purple-900">{{ selectedWorkspace?.templateCount }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">最近活动</h4>
                <div class="space-y-4">
                  <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-medium mr-3" :style="{ backgroundColor: activity.userAvatar }">
                      {{ activity.userName.charAt(0) }}
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">{{ activity.userName }}</span>
                        {{ activity.action }}
                        <span class="font-medium">{{ activity.target }}</span>
                      </p>
                      <p class="text-xs text-gray-500">{{ activity.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
             <!-- 项目标签页 -->
             <div v-if="activeTab === 'projects'" class="p-6">
               <div class="flex items-center justify-between mb-6">
                 <h4 class="text-lg font-semibold text-gray-900">项目管理</h4>
                 <div class="flex items-center space-x-3">
                   <div class="flex items-center space-x-2">
                     <label class="text-sm text-gray-600">筛选:</label>
                     <select 
                       v-model="projectFilter"
                       class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     >
                       <option value="all">全部项目</option>
                       <option value="active">进行中</option>
                       <option value="completed">已完成</option>
                       <option value="archived">已归档</option>
                     </select>
                   </div>
                   <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                     <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                     </svg>
                     新建项目
                   </button>
                 </div>
               </div>
               
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div v-for="project in filteredProjects" :key="project.id" class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                   <div class="flex items-start justify-between mb-4">
                     <div class="flex-1">
                       <h5 class="text-lg font-semibold text-gray-900 mb-2">{{ project.name }}</h5>
                       <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>
                       
                       <div class="flex items-center space-x-4 text-xs text-gray-500">
                         <span class="flex items-center">
                           <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                           </svg>
                           {{ project.pptCount }} PPT
                         </span>
                         <span class="flex items-center">
                           <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                           </svg>
                           {{ project.memberCount }} 成员
                         </span>
                       </div>
                     </div>
                     
                     <div class="flex flex-col items-end">
                       <span 
                         :class="[
                           'px-2 py-1 text-xs rounded-full mb-2',
                           project.status === 'active' ? 'bg-green-100 text-green-800' :
                           project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                           'bg-gray-100 text-gray-800'
                         ]"
                       >
                         {{ project.status === 'active' ? '进行中' : project.status === 'completed' ? '已完成' : '已归档' }}
                       </span>
                       
                       <button class="text-gray-400 hover:text-gray-600 p-1">
                         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                         </svg>
                       </button>
                     </div>
                   </div>
                   
                   <div class="mb-4">
                     <div class="flex items-center justify-between text-sm text-gray-600 mb-1">
                       <span>进度</span>
                       <span>{{ project.progress }}%</span>
                     </div>
                     <div class="w-full bg-gray-200 rounded-full h-2">
                       <div 
                         class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                         :style="{ width: project.progress + '%' }"
                       ></div>
                     </div>
                   </div>
                   
                   <div class="flex items-center justify-between">
                     <div class="flex -space-x-2">
                       <div 
                         v-for="member in project.members.slice(0, 3)" 
                         :key="member.id"
                         class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                         :style="{ backgroundColor: member.avatar }"
                         :title="member.name"
                       >
                         {{ member.name.charAt(0) }}
                       </div>
                       <div 
                         v-if="project.members.length > 3"
                         class="w-6 h-6 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs text-white font-medium"
                       >
                         +{{ project.members.length - 3 }}
                       </div>
                     </div>
                     
                     <span class="text-xs text-gray-500">{{ project.lastUpdate }}</span>
                   </div>
                 </div>
               </div>
             </div>
             
             <!-- 成员标签页 -->
            <div v-if="activeTab === 'members'" class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h4 class="text-lg font-semibold text-gray-900">成员管理</h4>
                <button 
                  @click="showInviteModal = true"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  邀请成员
                </button>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">{{ workspaceMembers.length }} 名成员</span>
                    <div class="flex items-center space-x-2">
                      <input 
                        v-model="memberSearchQuery"
                        type="text" 
                        placeholder="搜索成员..."
                        class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                    </div>
                  </div>
                </div>
                
                <div class="divide-y divide-gray-200">
                  <div v-for="member in filteredMembers" :key="member.id" class="px-6 py-4 flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3" :style="{ backgroundColor: member.avatar }">
                        {{ member.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
                        <p class="text-sm text-gray-500">{{ member.email }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                      <span 
                        :class="[
                          'px-2 py-1 text-xs rounded-full',
                          member.role === 'owner' ? 'bg-green-100 text-green-800' :
                          member.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ member.role === 'owner' ? '所有者' : member.role === 'admin' ? '管理员' : '成员' }}
                      </span>
                      
                      <div class="flex items-center space-x-1">
                        <button 
                          v-if="member.role !== 'owner'"
                          @click="changeMemberRole(member)"
                          class="text-gray-400 hover:text-blue-600 p-1"
                          title="更改角色"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        
                        <button 
                          v-if="member.role !== 'owner'"
                          @click="removeMember(member)"
                          class="text-gray-400 hover:text-red-600 p-1"
                          title="移除成员"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
             <!-- 活动标签页 -->
             <div v-if="activeTab === 'activity'" class="p-6">
               <div class="flex items-center justify-between mb-6">
                 <h4 class="text-lg font-semibold text-gray-900">活动日志</h4>
                 <div class="flex items-center space-x-3">
                   <div class="flex items-center space-x-2">
                     <label class="text-sm text-gray-600">筛选:</label>
                     <select 
                       v-model="activityFilter"
                       class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     >
                       <option value="all">全部活动</option>
                       <option value="ppt">PPT相关</option>
                       <option value="member">成员相关</option>
                       <option value="project">项目相关</option>
                     </select>
                   </div>
                   <div class="flex items-center space-x-2">
                     <label class="text-sm text-gray-600">时间:</label>
                     <select 
                       v-model="activityTimeFilter"
                       class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     >
                       <option value="today">今天</option>
                       <option value="week">本周</option>
                       <option value="month">本月</option>
                       <option value="all">全部</option>
                     </select>
                   </div>
                 </div>
               </div>
               
               <div class="bg-white border border-gray-200 rounded-lg">
                 <div class="divide-y divide-gray-200">
                   <div v-for="activity in filteredActivities" :key="activity.id" class="p-6">
                     <div class="flex items-start">
                       <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-4" :style="{ backgroundColor: activity.userAvatar }">
                         {{ activity.userName.charAt(0) }}
                       </div>
                       
                       <div class="flex-1">
                         <div class="flex items-center justify-between mb-2">
                           <div class="flex items-center space-x-2">
                             <span class="font-medium text-gray-900">{{ activity.userName }}</span>
                             <span 
                               :class="[
                                 'px-2 py-1 text-xs rounded-full',
                                 activity.type === 'ppt' ? 'bg-blue-100 text-blue-800' :
                                 activity.type === 'member' ? 'bg-green-100 text-green-800' :
                                 activity.type === 'project' ? 'bg-purple-100 text-purple-800' :
                                 'bg-gray-100 text-gray-800'
                               ]"
                             >
                               {{ activity.type === 'ppt' ? 'PPT' : activity.type === 'member' ? '成员' : activity.type === 'project' ? '项目' : '其他' }}
                             </span>
                           </div>
                           <span class="text-sm text-gray-500">{{ activity.time }}</span>
                         </div>
                         
                         <p class="text-gray-700 mb-2">
                           {{ activity.action }}
                           <span class="font-medium text-gray-900">{{ activity.target }}</span>
                           <span v-if="activity.details" class="text-gray-600"> - {{ activity.details }}</span>
                         </p>
                         
                         <div v-if="activity.changes && activity.changes.length > 0" class="bg-gray-50 rounded-md p-3 mt-3">
                           <p class="text-sm font-medium text-gray-700 mb-2">变更详情:</p>
                           <ul class="text-sm text-gray-600 space-y-1">
                             <li v-for="change in activity.changes" :key="change.field" class="flex items-center">
                               <span class="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                               <span class="font-medium">{{ change.field }}:</span>
                               <span class="ml-1">{{ change.oldValue }} → {{ change.newValue }}</span>
                             </li>
                           </ul>
                         </div>
                         
                         <div v-if="activity.attachments && activity.attachments.length > 0" class="flex items-center space-x-2 mt-3">
                           <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                           </svg>
                           <div class="flex flex-wrap gap-2">
                             <span v-for="attachment in activity.attachments" :key="attachment.name" class="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                               {{ attachment.name }}
                             </span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div v-if="filteredActivities.length === 0" class="p-12 text-center">
                   <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>
                   <p class="text-gray-500">暂无活动记录</p>
                 </div>
               </div>
             </div>
             
             <!-- 设置标签页 -->
            <div v-if="activeTab === 'settings'" class="p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-6">工作空间设置</h4>
              
              <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 class="text-md font-medium text-gray-900 mb-4">基本信息</h5>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">工作空间名称</label>
                      <input 
                        v-model="workspaceSettings.name"
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
                      <textarea 
                        v-model="workspaceSettings.description"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 class="text-md font-medium text-gray-900 mb-4">权限设置</h5>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-900">成员可以邀请其他人</p>
                        <p class="text-sm text-gray-500">允许普通成员邀请新成员加入工作空间</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="workspaceSettings.allowMemberInvite" type="checkbox" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-900">公开工作空间</p>
                        <p class="text-sm text-gray-500">让其他人可以发现并申请加入此工作空间</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="workspaceSettings.isPublic" type="checkbox" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h5 class="text-md font-medium text-red-900 mb-4">危险操作</h5>
                  <div class="space-y-4">
                    <div>
                      <p class="text-sm text-red-700 mb-2">删除工作空间</p>
                      <p class="text-sm text-red-600 mb-4">删除后将无法恢复，所有数据将永久丢失</p>
                      <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        删除工作空间
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-end">
                  <button 
                    @click="saveWorkspaceSettings"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    保存设置
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 邀请成员模态框 -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">邀请成员</h3>
          <button @click="showInviteModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="inviteMember">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
              <input 
                v-model="inviteForm.email"
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入邮箱地址"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">角色</label>
              <select 
                v-model="inviteForm.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="member">成员 - 可以查看和编辑内容</option>
                <option value="admin">管理员 - 可以管理成员和设置</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邀请消息 (可选)</label>
              <textarea 
                v-model="inviteForm.message"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="添加个人消息..."
              ></textarea>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              @click="showInviteModal = false"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              发送邀请
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { mockAPI } from '@/api/mock'
import Sidebar from '@/components/Sidebar.vue'

// 工作空间store
const workspaceStore = useWorkspaceStore()
const { workspaces, currentWorkspace, switchWorkspace } = workspaceStore

// 响应式数据
const selectedWorkspaceId = ref(currentWorkspace?.id || '')
const showCreateModal = ref(false)
const showWorkspaceDetail = ref(false)
const showInviteModal = ref(false)
const activeTab = ref('overview')
const memberSearchQuery = ref('')
const projectFilter = ref('all')
const activityFilter = ref('all')
const activityTimeFilter = ref('week')

const newWorkspace = ref({
  name: '',
  description: '',
  type: 'team',
  inviteEmails: ''
})

const selectedWorkspace = ref(null)

const inviteForm = ref({
  email: '',
  role: 'member',
  message: ''
})

const workspaceSettings = ref({
  name: '',
  description: '',
  allowMemberInvite: true,
  isPublic: false
})

// 工作空间详情标签页
const workspaceTabs = [
    {
      id: 'overview',
      name: '概览',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      id: 'projects',
      name: '项目',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    },
    {
      id: 'members',
      name: '成员',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
    },
    {
      id: 'activity',
      name: '活动',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 'settings',
      name: '设置',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    }
  ]

// 工作空间成员数据
const workspaceMembers = ref([
  {
    id: 1,
    name: '张老师',
    email: 'zhang@example.com',
    role: 'owner',
    avatar: '#3B82F6',
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    name: '李老师',
    email: 'li@example.com',
    role: 'admin',
    avatar: '#10B981',
    joinDate: '2024-01-20'
  },
  {
    id: 3,
    name: '王老师',
    email: 'wang@example.com',
    role: 'member',
    avatar: '#8B5CF6',
    joinDate: '2024-02-01'
  },
  {
    id: 4,
    name: '赵老师',
    email: 'zhao@example.com',
    role: 'member',
    avatar: '#EF4444',
    joinDate: '2024-02-05'
  }
])

// 项目数据
  const workspaceProjects = ref([
    {
      id: 1,
      name: '初中英语七年级上册',
      description: '初中英语七年级上册全册PPT制作项目',
      status: 'active',
      progress: 75,
      pptCount: 12,
      memberCount: 4,
      lastUpdate: '2小时前',
      members: [
        { id: 1, name: '张老师', avatar: '#3B82F6' },
        { id: 2, name: '李老师', avatar: '#10B981' },
        { id: 3, name: '王老师', avatar: '#8B5CF6' },
        { id: 4, name: '赵老师', avatar: '#EF4444' }
      ]
    },
    {
      id: 2,
      name: '物理选修3-1',
      description: '物理选修3-1电磁学部分PPT',
      status: 'active',
      progress: 45,
      pptCount: 8,
      memberCount: 3,
      lastUpdate: '1天前',
      members: [
        { id: 2, name: '李老师', avatar: '#10B981' },
        { id: 3, name: '王老师', avatar: '#8B5CF6' },
        { id: 5, name: '陈老师', avatar: '#F59E0B' }
      ]
    },
    {
      id: 3,
      name: '化学实验课件',
      description: '高中化学实验演示课件制作',
      status: 'completed',
      progress: 100,
      pptCount: 15,
      memberCount: 2,
      lastUpdate: '3天前',
      members: [
        { id: 4, name: '赵老师', avatar: '#EF4444' },
        { id: 6, name: '刘老师', avatar: '#06B6D4' }
      ]
    },
    {
      id: 4,
      name: '生物必修二',
      description: '生物必修二遗传与进化',
      status: 'archived',
      progress: 100,
      pptCount: 10,
      memberCount: 2,
      lastUpdate: '1周前',
      members: [
        { id: 7, name: '孙老师', avatar: '#84CC16' },
        { id: 8, name: '周老师', avatar: '#EC4899' }
      ]
    }
  ])
  
  // 最近活动数据
  const recentActivities = ref([
    {
      id: 1,
      userName: '张老师',
      userAvatar: '#3B82F6',
      action: '创建了PPT',
      target: '初中英语第一单元',
      time: '2小时前'
    },
    {
      id: 2,
      userName: '李老师',
      userAvatar: '#10B981',
      action: '编辑了教材',
      target: '英语七年级上册',
      time: '4小时前'
    },
    {
      id: 3,
      userName: '王老师',
      userAvatar: '#8B5CF6',
      action: '上传了模板',
      target: '几何图形模板',
      time: '1天前'
    }
  ])
  
  // 详细活动数据
  const allActivities = ref([
    {
      id: 1,
      userName: '张老师',
      userAvatar: '#3B82F6',
      type: 'ppt',
      action: '创建了PPT',
      target: '英语语法时态',
      details: '在初中英语七年级上册项目中',
      time: '2小时前',
      changes: [
        { field: '标题', oldValue: '', newValue: '英语语法时态' },
        { field: '章节', oldValue: '', newValue: 'Unit 2' }
      ]
    },
    {
      id: 2,
      userName: '李老师',
      userAvatar: '#10B981',
      type: 'member',
      action: '邀请了新成员',
      target: '陈老师',
      details: '加入物理选修3-1项目',
      time: '3小时前'
    },
    {
      id: 3,
      userName: '王老师',
      userAvatar: '#8B5CF6',
      type: 'project',
      action: '更新了项目进度',
      target: '初中英语七年级上册',
      details: '从70%更新到75%',
      time: '4小时前',
      changes: [
        { field: '进度', oldValue: '70%', newValue: '75%' }
      ]
    },
    {
      id: 4,
      userName: '赵老师',
      userAvatar: '#EF4444',
      type: 'ppt',
      action: '完成了PPT',
      target: '化学反应速率',
      details: '在化学实验课件项目中',
      time: '6小时前',
      attachments: [
        { name: '化学反应速率.pptx', size: '2.5MB' }
      ]
    },
    {
      id: 5,
      userName: '李老师',
      userAvatar: '#10B981',
      type: 'ppt',
      action: '编辑了PPT',
      target: '电场强度',
      details: '添加了动画效果',
      time: '1天前',
      changes: [
        { field: '动画数量', oldValue: '3', newValue: '8' },
        { field: '页面数', oldValue: '15', newValue: '18' }
      ]
    },
    {
      id: 6,
      userName: '张老师',
      userAvatar: '#3B82F6',
      type: 'member',
      action: '更改了成员角色',
      target: '王老师',
      details: '从成员提升为管理员',
      time: '2天前',
      changes: [
        { field: '角色', oldValue: '成员', newValue: '管理员' }
      ]
    },
    {
      id: 7,
      userName: '孙老师',
      userAvatar: '#84CC16',
      type: 'project',
      action: '归档了项目',
      target: '生物必修二',
      details: '项目已完成并归档',
      time: '1周前'
    }
  ])

// 工作空间数据已从store中获取

// 计算属性
  const filteredMembers = computed(() => {
    if (!memberSearchQuery.value) {
      return workspaceMembers.value
    }
    return workspaceMembers.value.filter(member => 
      member.name.toLowerCase().includes(memberSearchQuery.value.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearchQuery.value.toLowerCase())
    )
  })
  
  const filteredProjects = computed(() => {
    if (projectFilter.value === 'all') {
      return workspaceProjects.value
    }
    return workspaceProjects.value.filter(project => project.status === projectFilter.value)
  })
  
  const filteredActivities = computed(() => {
    let filtered = allActivities.value
    
    // 按类型筛选
    if (activityFilter.value !== 'all') {
      filtered = filtered.filter(activity => activity.type === activityFilter.value)
    }
    
    // 按时间筛选
    if (activityTimeFilter.value !== 'all') {
      const now = new Date()
      filtered = filtered.filter(activity => {
        // 这里简化处理，实际应该根据真实时间戳进行筛选
        if (activityTimeFilter.value === 'today') {
          return activity.time.includes('小时前') || activity.time.includes('分钟前')
        } else if (activityTimeFilter.value === 'week') {
          return !activity.time.includes('周前') && !activity.time.includes('月前')
        } else if (activityTimeFilter.value === 'month') {
          return !activity.time.includes('月前')
        }
        return true
      })
    }
    
    return filtered
  })

// 处理工作空间切换
const handleWorkspaceChange = () => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value)
  }
}

// 显示工作空间详情
const showWorkspaceDetails = (workspace) => {
  console.log('显示工作空间详情:', workspace.name)
  selectedWorkspace.value = workspace
  showWorkspaceDetail.value = true
  activeTab.value = 'overview'
  
  // 初始化工作空间设置
  workspaceSettings.value = {
    name: workspace.name,
    description: workspace.description,
    allowMemberInvite: true,
    isPublic: false
  }
}

// 显示工作空间菜单
const showWorkspaceMenu = (workspace) => {
  console.log('显示工作空间菜单:', workspace.name)
  // 这里可以显示编辑、删除等操作菜单
}

// 创建工作空间
const createWorkspace = async () => {
  if (!newWorkspace.value.name.trim()) {
    alert('请输入工作空间名称')
    return
  }
  
  try {
    const workspaceData = {
        name: newWorkspace.value.name,
        description: newWorkspace.value.description,
        memberCount: 1,
        role: 'owner' as const,
        pptCount: 0,
        textbookCount: 0,
        templateCount: 0,
        resourceCount: 0,
        lastActivity: '刚刚创建',
        recentMembers: [],
        createdAt: new Date().toISOString()
      }
    
    await workspaceStore.addWorkspace(workspaceData)
    
    // 重置表单
    newWorkspace.value = {
      name: '',
      description: '',
      type: 'team',
      inviteEmails: ''
    }
    
    // 关闭模态框
    showCreateModal.value = false
    
    alert('工作空间创建成功！')
  } catch (error) {
    console.error('创建工作空间失败:', error)
    alert('创建工作空间失败，请重试')
  }
}

// 邀请成员
const inviteMember = () => {
  console.log('邀请成员:', inviteForm.value)
  
  // 这里应该调用API发送邀请
  
  // 重置表单
  inviteForm.value = {
    email: '',
    role: 'member',
    message: ''
  }
  
  // 关闭模态框
  showInviteModal.value = false
}

// 更改成员角色
const changeMemberRole = (member) => {
  console.log('更改成员角色:', member)
  // 这里应该显示角色选择对话框或直接切换角色
}

// 移除成员
const removeMember = (member) => {
  console.log('移除成员:', member)
  // 这里应该显示确认对话框并调用API移除成员
}

// 保存工作空间设置
const saveWorkspaceSettings = async () => {
  if (!selectedWorkspace.value) return
  
  try {
    await workspaceStore.updateWorkspace(selectedWorkspace.value.id, {
      name: workspaceSettings.value.name,
      description: workspaceSettings.value.description
    })
    
    alert('设置保存成功！')
  } catch (error) {
    console.error('保存工作空间设置失败:', error)
    alert('保存设置失败，请重试')
  }
}

// 生命周期
onMounted(async () => {
  await workspaceStore.initialize()
  selectedWorkspaceId.value = workspaceStore.currentWorkspaceId
})

// 监听当前工作空间变化，更新选择器
watch(() => currentWorkspace, (newWorkspace) => {
  if (newWorkspace) {
    selectedWorkspaceId.value = newWorkspace.id
  }
})
</script>

<style scoped>
/* 工作空间页面样式 */
</style>