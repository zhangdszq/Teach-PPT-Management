import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表板'
    }
  },
  {
    path: '/workspaces',
    name: 'Workspaces',
    component: () => import('@/views/Workspaces.vue'),
    meta: {
      title: '工作空间'
    }
  },
  {
    path: '/textbooks',
    name: 'Textbooks',
    component: () => import('@/views/Textbooks.vue'),
    meta: {
      title: '教材管理'
    }
  },
  {
    path: '/ppt-management',
    name: 'PPTManagement',
    component: () => import('@/views/PPTManagement.vue'),
    meta: {
      title: 'PPT管理'
    }
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/Library.vue'),
    meta: {
      title: '资源库'
    }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/Templates.vue'),
    meta: {
      title: '模板管理'
    }
  },
  {
    path: '/prompts',
    name: 'Prompts',
    component: () => import('@/views/Prompts.vue'),
    meta: {
      title: 'Prompt管理'
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue'),
    meta: {
      title: '创建PPT'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/workspace-demo',
    name: 'WorkspaceDemo',
    component: () => import('@/components/WorkspaceDemo.vue'),
    meta: {
      title: '工作空间演示'
    }
  },
  {
    path: '/data-storage-example',
    name: 'DataStorageExample',
    component: () => import('@/examples/DataStorageExample.vue'),
    meta: {
      title: '数据存储示例'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} - PPT生成管理平台`
  }
  next()
})

export default router