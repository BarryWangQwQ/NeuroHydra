// 页面配置文件 / Pages configuration file
// 在此添加、删除或重新排序页面 / Add, remove or reorder pages here

import TitleSlide from './slides/TitleSlide.jsx'
import MultimodalPipeline from './slides/MultimodalPipeline.jsx'
import ModelPipeline from './slides/ModelPipeline.jsx'
import ExampleSlide from './slides/ExampleSlide.jsx'

// 页面列表配置 / Pages list configuration
// 每个页面需要：id (唯一), component (组件), key (唯一标识)
// Each page needs: id (unique), component (component), key (unique identifier)
export const pages = [
  { id: 0, component: TitleSlide, key: 'title' },
  { id: 1, component: MultimodalPipeline, key: 'multi' },
  { id: 2, component: ModelPipeline, key: 'model' },
  { id: 3, component: ExampleSlide, key: 'example' }
]

// 导出总页数 / Export total pages count
export const totalPages = pages.length
