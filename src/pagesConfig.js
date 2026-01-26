// 页面配置文件 / Pages configuration file
// 在此添加、删除或重新排序页面 / Add, remove or reorder pages here
console.log("pagesConfig loaded ✅", import.meta.url);

import React from 'react';
import TitleSlide from './slides/TitleSlide.jsx'
import SignificanceSlide from './slides/SignificanceSlide.jsx'
import ComponentsSlide from './slides/ComponentsSlide.jsx'
import UseCaseSlide from './slides/UseCaseSlide.jsx'
import FullScreenImageSlide from './slides/FullScreenImageSlide.jsx'
import MultiTaskLabelsSlide from './slides/MultiTaskLabelsSlide.jsx'
import MultimodalPipeline from './slides/MultimodalPipeline.jsx'
import ModelPipeline from './slides/ModelPipeline.jsx'
import ASVSFSlide from './slides/ASVSFSlide.jsx'
import SimulationSlide from './slides/SimulationSlide.jsx'
import QuadrantSlide from './slides/QuadrantSlide.jsx'
import BenchmarkTableSlide from './slides/BenchmarkTableSlide.jsx'
import QASlide from './slides/QASlide.jsx'
import QAOnlySlide from './slides/QAOnlySlide.jsx'

// Wrapper component for FullScreenImageSlide with image path
const FullScreenImageSlideWrapper = (props) =>
  React.createElement(FullScreenImageSlide, {
    imagePath: "/images/slide-image.png",
    ...props,
  });

// 页面列表配置 / Pages list configuration
// 每个页面需要：id (唯一), component (组件), key (唯一标识)
// Each page needs: id (unique), component (component), key (unique identifier)
export const pages = [
  { id: 0, component: TitleSlide, key: 'title' },
  { id: 1, component: SignificanceSlide, key: 'significance' },
  { id: 2, component: ComponentsSlide, key: 'components' },
  { id: 3, component: UseCaseSlide, key: 'usecase' },
  { id: 4, component: FullScreenImageSlideWrapper, key: 'fullscreen-image' },
  { id: 5, component: MultiTaskLabelsSlide, key: 'multi-task-labels' },
  { id: 6, component: ModelPipeline, key: 'model' },
  { id: 7, component: ASVSFSlide, key: 'asvf' },
  { id: 8, component: SimulationSlide, key: 'simulation' },
  { id: 9, component: QuadrantSlide, key: 'quadrant' },
  { id: 10, component: BenchmarkTableSlide, key: 'benchmark-table' },
  { id: 11, component: MultimodalPipeline, key: 'multi' },
  { id: 12, component: QASlide, key: 'acknowledgements' },
  { id: 13, component: QAOnlySlide, key: 'qa' }
]

// 导出总页数 / Export total pages count
export const totalPages = pages.length
