// 页面配置文件 / Pages configuration file
// 在此添加、删除或重新排序页面 / Add, remove or reorder pages here
console.log("pagesConfig loaded ✅", import.meta.url);

import TitleSlide from './slides/TitleSlide.jsx'
import ComponentsSlide from './slides/ComponentsSlide.jsx'
import UseCaseSlide from './slides/UseCaseSlide.jsx'
import FullScreenImageSlide from './slides/FullScreenImageSlide.jsx'
import MultiTaskLabelsSlide from './slides/MultiTaskLabelsSlide.jsx'
import MultimodalPipeline from './slides/MultimodalPipeline.jsx'
import ModelPipeline from './slides/ModelPipeline.jsx'
import ExampleSlide from './slides/ExampleSlide.jsx'
import CanYourDataSlide from './slides/CanYourDataSlide.jsx'
import React from "react"; // 

// 页面列表配置 / Pages list configuration
// 每个页面需要：id (唯一), component (组件), key (唯一标识)
// Each page needs: id (unique), component (component), key (unique identifier)
// Wrapper component for FullScreenImageSlide with image path

const FullScreenImageSlideWrapper = (props) =>
  React.createElement(FullScreenImageSlide, {
    imagePath: "/images/slide-image.png",
    ...props,
  });

export const pages = [
  { id: 0, component: TitleSlide, key: 'title' },
  { id: 1, component: ComponentsSlide, key: 'components' },
  { id: 2, component: UseCaseSlide, key: 'usecase' },
  { id: 3, component: FullScreenImageSlideWrapper, key: 'fullscreen-image' },
  { id: 4, component: MultiTaskLabelsSlide, key: 'multi-task-labels' },
  { id: 5, component: CanYourDataSlide, key: 'can-your-data' },
  { id: 6, component: MultimodalPipeline, key: 'multi' },
  { id: 7, component: ModelPipeline, key: 'model' },
  { id: 8, component: ExampleSlide, key: 'example' }
]

// 导出总页数 / Export total pages count
export const totalPages = pages.length
