# NeuroHydra - Multimodal Biomedical AI Presentation System
# NeuroHydra - 多模态生物医学 AI 演示系统

A Generalizable DINOv3–Mamba Framework for Multimodal Biomedical AI

[English](#english) | [中文](#中文)

---

## English

### Quick Start

#### Install Dependencies
```bash
npm install
```

#### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application

#### Build for Production
```bash
npm run build
npm run preview
```

### How to Add New Pages

#### Step 1: Create Page Component

Create a new component in the `src/slides/` directory, for example `MyNewPage.jsx`:

```jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MyNewPage = ({ autoPlay, manualTick }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-20">
      <h1 className="text-6xl font-bold">
        {language === 'zh' ? '我的新页面' : 'My New Page'}
      </h1>
    </div>
  );
};

export default MyNewPage;
```

#### Step 2: Register the Page

Import and add the new page in `src/pagesConfig.js`:

```javascript
import MyNewPage from './slides/MyNewPage.jsx'

export const pages = [
  { id: 0, component: TitleSlide, key: 'title' },
  { id: 1, component: MultimodalPipeline, key: 'multi' },
  { id: 2, component: ModelPipeline, key: 'model' },
  { id: 3, component: ExampleSlide, key: 'example' },
  { id: 4, component: MyNewPage, key: 'mynew' }, // Add this line
]
```

Done! The new page will automatically appear in the presentation flow.

### Project Structure

```
src/
├── slides/              # All presentation pages go here
│   ├── TitleSlide.jsx
│   ├── MultimodalPipeline.jsx
│   ├── ModelPipeline.jsx
│   └── ExampleSlide.jsx
├── pagesConfig.js       # Configure page order
└── App.jsx              # Main application (usually no need to modify)
```

---

## 中文

### 快速开始

#### 安装依赖
```bash
npm install
```

#### 运行项目
```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果

#### 构建生产版本
```bash
npm run build
npm run preview
```

### 如何添加新页面

#### 第一步：创建页面组件

在 `src/slides/` 目录下创建新组件，例如 `MyNewPage.jsx`：

```jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MyNewPage = ({ autoPlay, manualTick }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-20">
      <h1 className="text-6xl font-bold">
        {language === 'zh' ? '我的新页面' : 'My New Page'}
      </h1>
    </div>
  );
};

export default MyNewPage;
```

#### 第二步：注册页面

在 `src/pagesConfig.js` 中导入并添加新页面：

```javascript
import MyNewPage from './slides/MyNewPage.jsx'

export const pages = [
  { id: 0, component: TitleSlide, key: 'title' },
  { id: 1, component: MultimodalPipeline, key: 'multi' },
  { id: 2, component: ModelPipeline, key: 'model' },
  { id: 3, component: ExampleSlide, key: 'example' },
  { id: 4, component: MyNewPage, key: 'mynew' }, // 添加这一行
]
```

完成！新页面会自动出现在演示流程中。

### 项目结构

```
src/
├── slides/              # 所有演示页面放这里
│   ├── TitleSlide.jsx
│   ├── MultimodalPipeline.jsx
│   ├── ModelPipeline.jsx
│   └── ExampleSlide.jsx
├── pagesConfig.js       # 配置页面顺序
└── App.jsx              # 主程序（一般不需要改）
```
