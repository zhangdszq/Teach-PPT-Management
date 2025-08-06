<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 主侧边栏 -->
    <Sidebar />

    <!-- 主内容区域 -->
    <main class="ml-64">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">设置</h2>
            <p class="text-sm text-gray-600">管理您的账户和应用设置</p>
          </div>
        </div>
      </header>

      <!-- 设置内容区域 -->
      <div class="flex h-[calc(100vh-80px)]">
        <!-- 设置侧边栏 -->
        <SettingsSidebar 
          :active-section="activeSection" 
          @section-change="handleSectionChange" 
        />
        
        <!-- 设置内容 -->
         <div class="flex-1 p-6 overflow-y-auto">
           <div class="max-w-4xl mx-auto">
            <!-- 个人信息部分 -->
            <div v-if="activeSection === 'profile'" class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">个人信息</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                    <input
                      type="text"
                      value="用户"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                    <input
                      type="email"
                      value="user@example.com"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                    <input
                      type="tel"
                      value="138****8888"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">公司</label>
                    <input
                      type="text"
                      placeholder="请输入公司名称"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end">
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    保存更改
                  </button>
                </div>
              </div>
            </div>

            <!-- AI设置部分 -->
            <div v-if="activeSection === 'ai'" class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">AI生成设置</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">自动生成图片</h4>
                      <p class="text-sm text-gray-600">在生成PPT时自动添加相关图片</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">智能排版</h4>
                      <p class="text-sm text-gray-600">自动优化PPT页面布局和排版</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">内容建议</h4>
                      <p class="text-sm text-gray-600">提供内容优化和改进建议</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- 通知设置部分 -->
            <div v-if="activeSection === 'notifications'" class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">通知设置</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                      <p class="text-sm text-gray-600">接收重要更新和功能通知</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">桌面通知</h4>
                      <p class="text-sm text-gray-600">在浏览器中显示通知</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- 安全设置部分 -->
            <div v-if="activeSection === 'security'" class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">安全设置</h3>
                
                <div class="space-y-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 mb-2">修改密码</h4>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">当前密码</label>
                        <input
                          type="password"
                          placeholder="请输入当前密码"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">新密码</label>
                        <input
                          type="password"
                          placeholder="请输入新密码"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">确认新密码</label>
                        <input
                          type="password"
                          placeholder="请再次输入新密码"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                      </div>
                    </div>
                    <div class="mt-4">
                      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        更新密码
                      </button>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-200 pt-6">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">两步验证</h4>
                    <p class="text-sm text-gray-600 mb-4">为您的账户添加额外的安全保护</p>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      启用两步验证
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 数据管理部分 -->
            <div v-if="activeSection === 'data'" class="space-y-6">
              <DataManager />
            </div>

            <!-- 关于部分 -->
            <div v-if="activeSection === 'about'" class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">关于</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-lg font-medium text-gray-900">Teach PPT</h4>
                      <p class="text-sm text-gray-600">版本 1.0.0</p>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-200 pt-4">
                    <p class="text-sm text-gray-600 mb-4">
                      一个专业的PPT生成和管理平台，帮助教师快速创建高质量的教学演示文稿。
                    </p>
                    
                    <div class="space-y-2 text-sm text-gray-600">
                      <div class="flex justify-between">
                        <span>开发团队</span>
                        <span>PPT Team</span>
                      </div>
                      <div class="flex justify-between">
                        <span>技术支持</span>
                        <span>support@ppt.com</span>
                      </div>
                      <div class="flex justify-between">
                        <span>更新时间</span>
                        <span>2024-01-15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import DataManager from '@/components/DataManager.vue'

// 当前激活的设置部分
const activeSection = ref('profile')

// 处理设置部分切换
const handleSectionChange = (section: string) => {
  activeSection.value = section
}
</script>

<style scoped>
/* 设置页面样式 */
</style>