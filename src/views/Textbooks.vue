<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 主内容区域 -->
    <div class="ml-64 flex flex-col min-h-screen">
      <!-- 顶部导航栏 -->
      <div class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900">教材管理</h1>

            <!-- 工作空间选择器 -->
            <select
              v-model="selectedWorkspaceId"
              @change="handleWorkspaceChange"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">选择工作空间</option>
              <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">
                {{ workspace.name }}
              </option>
            </select>
          </div>

          <div class="flex items-center space-x-4">
            <!-- 搜索框 -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教材..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

            <!-- 添加教材按钮 -->
            <button
              @click="showCreateModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + 添加教材
            </button>

            <!-- 用户菜单 -->
            <img src="https://s.vipkidstatic.com/fe-static/temp/rudy.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover" />
          </div>
        </div>
      </div>

      <!-- 教材内容区域 -->
      <div class="flex-1 p-6 overflow-auto">
        <!-- 筛选器 -->
        <div class="mb-6 flex items-center space-x-4">
          <select v-model="filters.subject" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">所有学科</option>
            <option value="英语">英语</option>
            <option value="物理">物理</option>
            <option value="化学">化学</option>
            <option value="语文">语文</option>
            <option value="数学">数学</option>
          </select>

          <select v-model="filters.grade" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">所有年级</option>
            <option value="1年级">1年级</option>
            <option value="2年级">2年级</option>
            <option value="3年级">3年级</option>
            <option value="4年级">4年级</option>
            <option value="5年级">5年级</option>
            <option value="6年级">6年级</option>
            <option value="初一">初一</option>
            <option value="初二">初二</option>
            <option value="初三">初三</option>
          </select>

          <select v-model="filters.version" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">所有版本</option>
            <option value="人民教育出版社">人民教育出版社</option>
            <option value="江苏教育出版社">江苏教育出版社</option>
            <option value="北京师范大学出版社">北京师范大学出版社</option>
            <option value="外语教学与研究出版社">外语教学与研究出版社</option>
            <option value="牛津大学出版社">牛津大学出版社</option>
          </select>

          <div class="flex-1"></div>

          <!-- 视图切换 -->
          <div class="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              @click="viewMode = 'grid'"
              :class="['px-3 py-2 text-sm', viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50']"
            >
              网格
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'px-3 py-2 text-sm border-l border-gray-300',
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50',
              ]"
            >
              列表
            </button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="text-gray-500">加载中...</div>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="flex items-center justify-center py-12">
          <div class="text-red-500">{{ error }}</div>
        </div>

        <!-- 教材列表 -->
        <div v-else>
          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            <div
              v-for="textbook in filteredTextbooks"
              :key="textbook.id"
              @click="selectTextbook(textbook)"
              class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer relative group"
            >
              <!-- 右上角操作按钮 -->
              <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div class="flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                  <button
                    @click.stop="editTextbook(textbook)"
                    class="text-gray-400 hover:text-blue-600 p-1.5 transition-colors rounded"
                    title="编辑教材"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click.stop="deleteTextbook(textbook.id)"
                    class="text-gray-400 hover:text-red-600 p-1.5 transition-colors rounded"
                    title="删除教材"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- 教材封面 -->
              <div
                class="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg flex items-center justify-center relative overflow-hidden"
              >
                <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
                <!-- 学科标签 -->
                <div class="absolute top-3 left-3">
                  <span class="px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded-full">
                    {{ textbook.subject }}
                  </span>
                </div>
              </div>

              <div class="p-4">
                <!-- 教材信息 -->
                <div class="mb-3">
                  <h3 class="font-semibold text-gray-900 text-lg leading-tight mb-2">{{ textbook.name }}</h3>
                  <p class="text-sm text-gray-600">{{ textbook.grade }}</p>
                </div>

                <!-- 统计信息 -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="bg-gray-50 rounded-lg p-3 text-center">
                    <div class="text-xl font-bold text-gray-900">{{ textbook.unitCount || 0 }}</div>
                    <div class="text-xs text-gray-500 mt-1">单元</div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3 text-center">
                    <div class="text-xl font-bold text-gray-900">{{ textbook.pptCount }}</div>
                    <div class="text-xs text-gray-500 mt-1">PPT</div>
                  </div>
                </div>

                <!-- 出版社信息 -->
                <div class="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
                  <div class="flex items-center text-gray-500">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    {{ textbook.publisher }}
                  </div>
                  <div class="text-xs text-gray-400">最近更新</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                <div class="col-span-4">教材名称</div>
                <div class="col-span-2">学科</div>
                <div class="col-span-2">年级</div>
                <div class="col-span-2">版本</div>
                <div class="col-span-1">单元数</div>
                <div class="col-span-1">操作</div>
              </div>
            </div>

            <div class="divide-y divide-gray-200">
              <div
                v-for="textbook in filteredTextbooks"
                :key="textbook.id"
                @click="selectTextbook(textbook)"
                class="px-6 py-4 hover:bg-gray-50 cursor-pointer"
              >
                <div class="grid grid-cols-12 gap-4 items-center">
                  <div class="col-span-4">
                    <h3 class="font-medium text-gray-900">{{ textbook.name }}</h3>
                  </div>
                  <div class="col-span-2 text-sm text-gray-500">{{ textbook.subject }}</div>
                  <div class="col-span-2 text-sm text-gray-500">{{ textbook.grade }}</div>
                  <div class="col-span-2 text-sm text-gray-500">{{ textbook.publisher }}</div>
                  <div class="col-span-1 text-sm text-gray-500">{{ textbook.unitCount || 0 }}</div>
                  <div class="col-span-1">
                    <div class="flex space-x-2">
                      <button @click.stop="editTextbook(textbook)" class="text-blue-600 hover:text-blue-700 text-sm">编辑</button>
                      <button @click.stop="deleteTextbook(textbook.id)" class="text-red-600 hover:text-red-700 text-sm">删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教材详情模态框 -->
    <div v-if="selectedTextbook" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ selectedTextbook.name }}</h2>
            <p class="text-sm text-gray-500">{{ selectedTextbook.subject }} · {{ selectedTextbook.grade }} · {{ selectedTextbook.publisher }}</p>
          </div>
          <button @click="selectedTextbook = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- 单元列表 -->
          <div class="space-y-4">
            <div v-for="unit in selectedTextbook.unitList" :key="unit.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-gray-900">{{ unit.name }}</h4>
                <div class="flex space-x-2">
                  <button @click="addLesson(unit.id)" class="text-blue-600 hover:text-blue-700 text-sm font-medium">+ 添加课程</button>
                  <button @click="editUnit(unit)" class="text-green-600 hover:text-green-700 text-sm font-medium">编辑单元</button>
                  <button @click="deleteUnit(unit.id)" class="text-red-600 hover:text-red-700 text-sm font-medium">删除单元</button>
                </div>
              </div>

              <!-- 课程列表 -->
              <div class="space-y-2">
                <div v-for="lesson in unit.lessons" :key="lesson.id" class="bg-white rounded-lg p-3">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h5 class="font-medium text-gray-900">{{ lesson.name }}</h5>
                          <div class="flex items-center space-x-4 text-sm text-gray-500">
                            <span>类型: {{ getLessonTypeLabel(lesson.lessonType) }}</span>
                            <span>词汇: {{ lesson.vocabularies.length }}个</span>
                            <span>句子: {{ lesson.sentences.length }}个</span>
                            <span>场景: {{ lesson.scenarios.length }}个</span>
                            <span v-if="lesson.pptId" class="text-green-600">已关联PPT</span>
                            <button v-else @click="createPPTForLesson(lesson.id)" class="text-blue-600 hover:text-blue-700 text-sm underline">
                              去创建PPT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button @click="editLesson(lesson)" class="text-blue-600 hover:text-blue-700 text-sm">编辑</button>
                      <button @click="viewLessonContent(lesson)" class="text-green-600 hover:text-green-700 text-sm">查看内容</button>
                      <button @click="deleteLesson(lesson.id)" class="text-red-600 hover:text-red-700 text-sm">删除</button>
                    </div>
                  </div>
                </div>

                <div v-if="unit.lessons.length === 0" class="text-center py-4 text-gray-500 text-sm">暂无课程，点击上方按钮添加</div>
              </div>
            </div>

            <!-- 添加单元按钮 -->
            <button
              @click="addUnit"
              class="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + 添加单元
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加教材模态框 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">添加教材</h3>
          <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createTextbook">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">教材名称</label>
              <input
                v-model="newTextbook.name"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入教材名称"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">学科</label>
                <select
                  v-model="newTextbook.subject"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">选择学科</option>
                  <option value="英语">英语</option>
                  <option value="物理">物理</option>
                  <option value="化学">化学</option>
                  <option value="语文">语文</option>
                  <option value="数学">数学</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">年级</label>
                <select
                  v-model="newTextbook.grade"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">选择年级</option>
                  <option value="1年级">1年级</option>
                  <option value="2年级">2年级</option>
                  <option value="3年级">3年级</option>
                  <option value="4年级">4年级</option>
                  <option value="5年级">5年级</option>
                  <option value="6年级">6年级</option>
                  <option value="初一">初一</option>
                  <option value="初二">初二</option>
                  <option value="初三">初三</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">版本</label>
              <select
                v-model="newTextbook.publisher"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">选择版本</option>
                <option value="人民教育出版社">人民教育出版社</option>
                <option value="江苏教育出版社">江苏教育出版社</option>
                <option value="北京师范大学出版社">北京师范大学出版社</option>
                <option value="外语教学与研究出版社">外语教学与研究出版社</option>
                <option value="牛津大学出版社">牛津大学出版社</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">单元数</label>
              <input
                v-model.number="newTextbook.units"
                type="number"
                min="1"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入单元数"
                required
              />
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
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              添加
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 编辑单元弹框 -->
    <div v-if="showEditUnitModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">编辑单元</h3>
          <button @click="closeEditUnitModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveUnitEdit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">单元名称</label>
            <input
              v-model="editUnitForm.name"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入单元名称"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">单元描述</label>
            <textarea
              v-model="editUnitForm.description"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入单元描述（可选）"
              rows="3"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeEditUnitModal"
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
    </div>

    <!-- 编辑教材弹框 -->
    <div v-if="showEditTextbookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">编辑教材</h3>
          <button @click="closeEditTextbookModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveTextbookEdit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">教材名称</label>
            <input
              v-model="editTextbookForm.name"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入教材名称"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">学科</label>
              <select
                v-model="editTextbookForm.subject"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">选择学科</option>
                <option value="英语">英语</option>
                <option value="物理">物理</option>
                <option value="化学">化学</option>
                <option value="语文">语文</option>
                <option value="数学">数学</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">年级</label>
              <select
                v-model="editTextbookForm.grade"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">选择年级</option>
                <option value="1年级">1年级</option>
                <option value="2年级">2年级</option>
                <option value="3年级">3年级</option>
                <option value="4年级">4年级</option>
                <option value="5年级">5年级</option>
                <option value="6年级">6年级</option>
                <option value="初一">初一</option>
                <option value="初二">初二</option>
                <option value="初三">初三</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">版本</label>
            <select
              v-model="editTextbookForm.publisher"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">选择版本</option>
              <option value="人民教育出版社">人民教育出版社</option>
              <option value="江苏教育出版社">江苏教育出版社</option>
              <option value="北京师范大学出版社">北京师范大学出版社</option>
              <option value="外语教学与研究出版社">外语教学与研究出版社</option>
              <option value="牛津大学出版社">牛津大学出版社</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeEditTextbookModal"
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
    </div>

    <!-- 课程编辑器 -->
    <div v-if="showLessonEditor" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <LessonEditor :lesson="editingLesson" :unit-id="editingUnitId" @close="closeLessonEditor" @saved="handleLessonSaved" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useWorkspaceStore } from '@/stores/workspace';
import { textbookAPI } from '@/api/textbook';
import Sidebar from '@/components/Sidebar.vue';
import LessonEditor from '@/components/LessonEditor.vue';
import type { Textbook, Unit, Lesson, LessonType } from '@/api/types';

// 工作空间store
const workspaceStore = useWorkspaceStore();
const { workspaces, currentWorkspace, currentWorkspaceName, switchWorkspace } = workspaceStore;

// 响应式数据
const viewMode = ref('grid');
const showCreateModal = ref(false);
const showLessonEditor = ref(false);
const showEditUnitModal = ref(false);
const showEditTextbookModal = ref(false);
const selectedTextbook = ref<Textbook | null>(null);
const editingLesson = ref<Lesson | undefined>(undefined);
const editingUnit = ref<Unit | undefined>(undefined);
const editingTextbook = ref<Textbook | undefined>(undefined);
const editingUnitId = ref<number>(0);
const selectedWorkspaceId = ref(currentWorkspace?.id || '');
const searchQuery = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

// 教材数据
const textbooks = ref<Textbook[]>([]);

// 是否开发环境
const isDev = import.meta.env.DEV;

// 新教材表单数据
const newTextbook = ref({
  name: '',
  subject: '',
  grade: '',
  publisher: '',
  units: 1,
  workspaceId: '',
});

// 编辑单元表单数据
const editUnitForm = ref({
  name: '',
  description: '',
});

// 编辑教材表单数据
const editTextbookForm = ref({
  name: '',
  subject: '',
  grade: '',
  publisher: '',
});

// 筛选条件
const filters = ref({
  subject: '',
  grade: '',
  version: '',
});

// 过滤后的教材列表
const filteredTextbooks = computed(() => {
  let result = textbooks.value;

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (textbook) =>
        textbook.name.toLowerCase().includes(query) || textbook.subject.toLowerCase().includes(query) || textbook.grade.toLowerCase().includes(query),
    );
  }

  // 学科过滤
  if (filters.value.subject) {
    result = result.filter((textbook) => textbook.subject === filters.value.subject);
  }

  // 年级过滤
  if (filters.value.grade) {
    result = result.filter((textbook) => textbook.grade === filters.value.grade);
  }

  // 版本过滤
  if (filters.value.version) {
    result = result.filter((textbook) => textbook.publisher === filters.value.version);
  }

  return result;
});

/**
 * 获取课程类型标签
 */
const getLessonTypeLabel = (type: LessonType): string => {
  const labels = {
    VOCABULARY_SENTENCE: '词汇句子',
    SCENARIO_BASED: '场景对话',
    GRAMMAR_FOCUSED: '语法重点',
    CONVERSATION: '对话练习',
    READING_COMPREHENSION: '阅读理解',
  };
  return labels[type] || type;
};

/**
 * 加载教材列表
 */
const loadTextbooks = async (): Promise<void> => {
  if (!currentWorkspace) return;

  try {
    loading.value = true;
    error.value = null;
    const textbookList = await textbookAPI.getTextbooks(currentWorkspace.id);

    // 为每个教材获取单元数量
    for (const textbook of textbookList) {
      try {
        const units = await textbookAPI.getTextbookUnits(textbook.id);
        textbook.unitCount = units.length;
      } catch (err) {
        console.warn(`Failed to load units for textbook ${textbook.id}:`, err);
        textbook.unitCount = 0;
      }
    }

    textbooks.value = textbookList;
  } catch (err) {
    error.value = '加载教材列表失败';
    console.error('Failed to load textbooks:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 选择教材
 */
const selectTextbook = async (textbook: Textbook): Promise<void> => {
  try {
    loading.value = true;
    // 获取教材详情和单元信息
    const detailTextbook = await textbookAPI.getTextbookDetail(textbook.id);
    const units = await textbookAPI.getTextbookUnits(textbook.id);

    // 为每个单元加载课程
    for (const unit of units) {
      unit.lessons = await textbookAPI.getUnitLessons(unit.id);
    }

    detailTextbook.unitList = units;
    selectedTextbook.value = detailTextbook;
  } catch (err) {
    error.value = '加载教材详情失败';
    console.error('Failed to load textbook detail:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 处理工作空间切换
 */
const handleWorkspaceChange = (): void => {
  if (selectedWorkspaceId.value) {
    switchWorkspace(selectedWorkspaceId.value);
    selectedTextbook.value = null;
    loadTextbooks();
  }
};

/**
 * 创建教材
 */
const createTextbook = async (): Promise<void> => {
  if (!currentWorkspace) return;

  try {
    loading.value = true;
    error.value = null;

    const textbookData = {
      ...newTextbook.value,
      workspaceId: currentWorkspace.id,
      pptCount: 0,
      coverImage: '',
    };

    const createdTextbook = await textbookAPI.createTextbook(textbookData);
    // 新创建的教材初始单元数量为0
    createdTextbook.unitCount = 0;
    textbooks.value.push(createdTextbook);

    // 重置表单
    newTextbook.value = {
      name: '',
      subject: '',
      grade: '',
      publisher: '',
      units: 1,
      workspaceId: '',
    };

    showCreateModal.value = false;
  } catch (err) {
    error.value = '创建教材失败';
    console.error('Failed to create textbook:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 删除教材
 */
const deleteTextbook = async (textbookId: number): Promise<void> => {
  if (!confirm('确定要删除这个教材吗？')) return;

  try {
    loading.value = true;
    await textbookAPI.deleteTextbook(textbookId);
    textbooks.value = textbooks.value.filter((t) => t.id !== textbookId);

    if (selectedTextbook.value?.id === textbookId) {
      selectedTextbook.value = null;
    }
  } catch (err) {
    error.value = '删除教材失败';
    console.error('Failed to delete textbook:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 添加单元
 */
const addUnit = async (): Promise<void> => {
  if (!selectedTextbook.value) return;

  const unitName = prompt('请输入单元名称:');
  if (!unitName) return;

  try {
    loading.value = true;
    const unit = await textbookAPI.createUnit(selectedTextbook.value.id, {
      name: unitName,
      unitOrder: (selectedTextbook.value.unitList?.length || 0) + 1,
      textbookId: selectedTextbook.value.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    unit.lessons = [];

    if (!selectedTextbook.value.unitList) {
      selectedTextbook.value.unitList = [];
    }
    selectedTextbook.value.unitList.push(unit);

    // 更新教材列表中对应教材的单元数量
    const textbookInList = textbooks.value.find((t) => t.id === selectedTextbook.value!.id);
    if (textbookInList) {
      textbookInList.unitCount = selectedTextbook.value.unitList.length;
    }
  } catch (err) {
    error.value = '创建单元失败';
    console.error('Failed to create unit:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 编辑单元
 */
const editUnit = (unit: Unit): void => {
  editingUnit.value = unit;
  editUnitForm.value = {
    name: unit.name,
    description: unit.description || '',
  };
  showEditUnitModal.value = true;
};

/**
 * 保存单元编辑
 */
const saveUnitEdit = async (): Promise<void> => {
  if (!editingUnit.value) return;

  try {
    loading.value = true;
    await textbookAPI.updateUnit(editingUnit.value.id, editUnitForm.value);

    // 更新本地数据
    editingUnit.value.name = editUnitForm.value.name;
    editingUnit.value.description = editUnitForm.value.description;

    // 关闭弹框
    closeEditUnitModal();
  } catch (err) {
    error.value = '更新单元失败';
    console.error('Failed to update unit:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 关闭编辑单元弹框
 */
const closeEditUnitModal = (): void => {
  showEditUnitModal.value = false;
  editingUnit.value = undefined;
  editUnitForm.value = {
    name: '',
    description: '',
  };
};

/**
 * 删除单元
 */
const deleteUnit = async (unitId: number): Promise<void> => {
  if (!confirm('确定要删除这个单元吗？删除后将无法恢复！')) return;

  try {
    loading.value = true;
    await textbookAPI.deleteUnit(unitId);

    // 从UI中移除单元
    if (selectedTextbook.value?.unitList) {
      selectedTextbook.value.unitList = selectedTextbook.value.unitList.filter((u) => u.id !== unitId);

      // 更新教材列表中对应教材的单元数量
      const textbookInList = textbooks.value.find((t) => t.id === selectedTextbook.value!.id);
      if (textbookInList) {
        textbookInList.unitCount = selectedTextbook.value.unitList.length;
      }
    }
  } catch (err) {
    error.value = '删除单元失败';
    console.error('Failed to delete unit:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 添加课程
 */
const addLesson = (unitId: number): void => {
  editingLesson.value = undefined;
  editingUnitId.value = unitId;
  showLessonEditor.value = true;
};

/**
 * 编辑课程
 */
const editLesson = (lesson: Lesson): void => {
  editingLesson.value = lesson;
  editingUnitId.value = lesson.unitId;
  showLessonEditor.value = true;
};

/**
 * 查看课程内容
 */
const viewLessonContent = (lesson: Lesson): void => {
  // 这里可以实现课程内容查看功能
  const vocabularies = lesson.vocabularies.map((v) => v.word).join(', ');
  const sentences = lesson.sentences.map((s) => s.content).join(', ');
  const scenarios = lesson.scenarios.join(', ');
  alert(`课程内容:\n词汇: ${vocabularies}\n句子: ${sentences}\n场景: ${scenarios}`);
};

/**
 * 跳转到PPT创建页面
 */
const createPPTForLesson = (lessonId: number): void => {
  // 查找对应的lesson对象
  let targetLesson: Lesson | undefined;
  if (selectedTextbook.value?.unitList) {
    for (const unit of selectedTextbook.value.unitList) {
      targetLesson = unit.lessons.find((l) => l.id === lessonId);
      if (targetLesson) break;
    }
  }

  if (!targetLesson || !selectedTextbook.value) {
    alert('无法找到课程信息');
    return;
  }

  // 构建URL参数
  const params = new URLSearchParams({
    lessonId: lessonId.toString(),
    grade: selectedTextbook.value.grade,
    courseType: targetLesson.lessonType,
  });

  // const url = `http://localhost:5174/?${params.toString()}`
  const url = `${isDev ? 'http://localhost:5174/' : '/edit'}?${params.toString()}`;
  // const editorUrl = `${isDev ? 'http://localhost:5174' : '/edit'}?pptId=${ppt.pptId || ppt.id}`;
  window.open(url, '_blank');
};

/**
 * 删除课程
 */
const deleteLesson = async (lessonId: number): Promise<void> => {
  if (!confirm('确定要删除这个课程吗？')) return;

  try {
    loading.value = true;
    await textbookAPI.deleteLesson(lessonId);

    // 从UI中移除课程
    if (selectedTextbook.value?.unitList) {
      for (const unit of selectedTextbook.value.unitList) {
        unit.lessons = unit.lessons.filter((l) => l.id !== lessonId);
      }
    }
  } catch (err) {
    error.value = '删除课程失败';
    console.error('Failed to delete lesson:', err);
  } finally {
    loading.value = false;
  }
};

/**
 * 关闭课程编辑器
 */
const closeLessonEditor = (): void => {
  showLessonEditor.value = false;
  editingLesson.value = undefined;
  editingUnitId.value = 0;
};

/**
 * 处理课程保存
 */
const handleLessonSaved = (lesson: Lesson): void => {
  if (!selectedTextbook.value?.unitList) return;

  const unit = selectedTextbook.value.unitList.find((u) => u.id === lesson.unitId);
  if (!unit) return;

  const existingIndex = unit.lessons.findIndex((l) => l.id === lesson.id);
  if (existingIndex >= 0) {
    // 更新现有课程
    unit.lessons[existingIndex] = lesson;
  } else {
    // 添加新课程
    unit.lessons.push(lesson);
  }

  // 保存成功后关闭弹框
  closeLessonEditor();
};

/**
 * 编辑教材
 */
const editTextbook = (textbook: Textbook): void => {
  editingTextbook.value = textbook;
  editTextbookForm.value = {
    name: textbook.name,
    subject: textbook.subject,
    grade: textbook.grade,
    publisher: textbook.publisher,
  };
  showEditTextbookModal.value = true;
};

/**
 * 保存教材编辑
 */
const saveTextbookEdit = async (): Promise<void> => {
  if (!editingTextbook.value) return;

  try {
    loading.value = true;

    // 确保包含必要的字段，特别是 workspace_id
    const updateData = {
      ...editTextbookForm.value,
      workspaceId: editingTextbook.value.workspaceId,
      pptCount: editingTextbook.value.pptCount || 0,
      coverImage: editingTextbook.value.coverImage || '',
    };

    const updatedTextbook = await textbookAPI.updateTextbook(editingTextbook.value.id, updateData);

    // 更新本地数据
    const index = textbooks.value.findIndex((t) => t.id === editingTextbook.value!.id);
    if (index !== -1) {
      textbooks.value[index] = { ...textbooks.value[index], ...updatedTextbook };
    }

    alert('教材更新成功');
    closeEditTextbookModal();
  } catch (err) {
    console.error('更新教材失败:', err);
    alert('更新教材失败');
  } finally {
    loading.value = false;
  }
};

/**
 * 关闭编辑教材弹框
 */
const closeEditTextbookModal = (): void => {
  showEditTextbookModal.value = false;
  editingTextbook.value = undefined;
  editTextbookForm.value = {
    name: '',
    subject: '',
    grade: '',
    publisher: '',
  };
};

/**
 * 监听工作空间变化
 */
watch(
  () => currentWorkspace,
  (newWorkspace) => {
    if (newWorkspace) {
      selectedWorkspaceId.value = newWorkspace.id;
      loadTextbooks();
    }
  },
  { immediate: true },
);

/**
 * 组件挂载时加载数据
 */
onMounted(() => {
  if (currentWorkspace) {
    selectedWorkspaceId.value = currentWorkspace.id;
    loadTextbooks();
  }
});
</script>
