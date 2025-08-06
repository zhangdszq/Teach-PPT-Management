# API 模块结构说明

本目录包含了所有与数据和API相关的文件，已经按照功能模块进行了重新组织。

## 文件结构

```
src/api/
├── types.ts                 # 所有数据类型定义
├── mock.ts                  # 向后兼容的统一导出文件
├── mock/                    # Mock数据和API实现
│   ├── index.ts            # Mock模块统一入口
│   ├── workspaces.ts       # 工作空间相关数据和API
│   ├── projects.ts         # 项目相关数据和API
│   ├── textbooks.ts        # 教材相关数据和API
│   ├── templates.ts        # 模板相关数据和API
│   └── resources.ts        # 资源相关数据和API
└── README.md               # 本说明文件
```

## 主要文件说明

### `types.ts`
包含所有业务相关的TypeScript接口定义：
- `Workspace` - 工作空间接口
- `Project` - 项目接口
- `Textbook` - 教材接口
- `Template` - 模板接口
- `Resource` - 资源接口
- `CreateFormData` - 创建表单数据接口
- `GeneratedPPT` - 生成的PPT接口
- `UserSettings` - 用户设置接口
- `AppState` - 应用状态接口
- `ProjectDraft` - 项目草稿接口
- `ExportData` - 导出数据接口
- `WorkspaceStats` - 工作空间统计接口

### `mock.ts`
为了保持向后兼容性，这个文件重新导出了所有的类型定义、mock数据和API实例。现有的导入语句无需修改。

### `mock/` 目录
包含了按功能模块分离的mock数据和API实现：

#### `workspaces.ts`
- `mockWorkspaces` - 工作空间mock数据
- `WorkspaceAPI` - 工作空间API类
- `workspaceAPI` - 工作空间API实例

#### `projects.ts`
- `mockProjects` - 项目mock数据
- `ProjectAPI` - 项目API类
- `projectAPI` - 项目API实例

#### `textbooks.ts`
- `mockTextbooks` - 教材mock数据
- `TextbookAPI` - 教材API类
- `textbookAPI` - 教材API实例

#### `templates.ts`
- `mockTemplates` - 模板mock数据
- `TemplateAPI` - 模板API类
- `templateAPI` - 模板API实例

#### `resources.ts`
- `mockResources` - 资源mock数据
- `ResourceAPI` - 资源API类
- `resourceAPI` - 资源API实例

#### `index.ts`
统一的mock模块入口，提供：
- 所有API类和实例的导出
- 所有mock数据的导出
- 所有类型定义的重新导出
- `MockAPI` 统一API类，整合所有功能
- `mockAPI` 统一API实例

## 使用方式

### 导入单个模块
```typescript
// 导入特定的API
import { workspaceAPI } from '@/api/mock/workspaces'
import { projectAPI } from '@/api/mock/projects'

// 使用API
const workspaces = await workspaceAPI.getWorkspaces()
const projects = await projectAPI.getProjectsByWorkspace('1')
```

### 导入统一API
```typescript
// 导入统一API
import { mockAPI } from '@/api/mock'

// 使用统一API
const workspaces = await mockAPI.workspace.getWorkspaces()
const projects = await mockAPI.project.getProjectsByWorkspace('1')
const stats = await mockAPI.getGlobalStats()
```

### 向后兼容的导入方式
```typescript
// 现有的导入方式仍然有效
import { mockAPI, Workspace, Project } from '@/api/mock'

// 使用方式保持不变
const workspaces = await mockAPI.getWorkspaces()
```

## API 功能特性

每个API类都提供了完整的CRUD操作：
- **Create** - 创建新记录
- **Read** - 读取记录（支持按ID、工作空间、搜索等）
- **Update** - 更新记录
- **Delete** - 删除记录

额外功能：
- 搜索和过滤
- 统计信息
- 批量操作
- 模拟网络延迟
- 数据关联性维护

## 数据特点

- **丰富的测试数据**：每个模块都包含了充足的测试数据
- **真实的业务场景**：数据设计贴近实际教学场景
- **完整的关联关系**：工作空间、项目、教材等数据之间保持正确的关联
- **多样化的内容**：涵盖小学到初中各年级的英语教学内容

## 扩展指南

如需添加新的数据类型或API：

1. 在 `types.ts` 中定义新的接口
2. 在 `mock/` 目录下创建对应的文件
3. 在 `mock/index.ts` 中添加导出
4. 在 `mock.ts` 中添加重新导出（保持向后兼容）

这样的模块化设计使得代码更易维护，功能更易扩展，同时保持了良好的向后兼容性。