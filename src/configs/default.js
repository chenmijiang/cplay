export const navbar_links = [
  { path: '/', detail: '首页' },
  { path: '/person', detail: '个人空间' }
]

export const routes = [
  { path: '/', component: 'HomePage' },
  { path: '/person', component: 'PersonSpace' },
  { path: '*', component: 'NotFound' },
]

// 300毫秒滚动动画时长，该项可能会造成歌词时间轴不准确
export const animation_duration = 300