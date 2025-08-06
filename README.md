# PPT生成管理平台

基于Vue3.x + TypeScript + TailwindCSS构建的现代化PPT生成管理平台。

## 功能特性

- 🎨 **AI智能生成** - 输入主题自动生成完整PPT
- 📚 **资源库管理** - 统一管理PPT资源和素材
- 🎯 **模板系统** - 丰富的PPT模板库
- ⚙️ **个性化设置** - 自定义AI生成参数和通知设置
- 📊 **数据统计** - 实时查看PPT生成和使用情况
- 🎭 **多种风格** - 商务、创意、简约、科技等多种风格

## 技术栈

- **前端框架**: Vue 3.4+
- **开发语言**: TypeScript
- **样式框架**: TailwindCSS 3.3+
- **路由管理**: Vue Router 4.2+
- **状态管理**: Pinia 2.1+
- **构建工具**: Vite 4.5+
- **HTTP客户端**: Axios 1.6+
- **工具库**: @vueuse/core
- **图标库**: Lucide Vue Next

## 项目结构

```
src/
├── views/          # 页面组件
│   ├── Dashboard.vue   # 仪表板
│   ├── Library.vue     # 资源库
│   ├── Templates.vue   # 模板管理
│   ├── Create.vue      # 创建PPT
│   └── Settings.vue    # 设置
├── router/         # 路由配置
├── App.vue         # 根组件
├── main.ts         # 应用入口
└── style.css       # 全局样式
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

## 页面说明

### 仪表板 (Dashboard)
- 显示PPT生成统计数据
- 展示最近创建的项目
- 快速访问各功能模块

### 资源库 (Library)
- 管理PPT相关资源文件
- 支持按类型和时间筛选
- 提供搜索功能

### 模板管理 (Templates)
- 浏览和选择PPT模板
- 支持多种风格模板
- 快速应用模板创建PPT

### 创建PPT (Create)
- AI智能生成PPT
- 自定义生成参数
- 支持多种创建方式

### 设置 (Settings)
- 个人信息管理
- AI生成参数配置
- 通知和数据管理

## 开发规范

- 使用TypeScript进行类型安全开发
- 遵循Vue 3 Composition API规范
- 使用TailwindCSS进行样式开发
- 保持组件的单一职责原则
- 合理使用Vue Router进行页面导航

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License