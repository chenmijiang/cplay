import Icon from '@/components/IconSvg'

export const navbar_links = [
  { path: '/', detail: '首页' },
  { path: '/space', detail: '个人空间' },
]

export const side_navlinks = [
  {
    id: 'search',
    icon: <Icon name="search" />,
    name: '搜索',
  },
  {
    id: 'history',
    icon: <Icon name="history" />,
    name: '历史',
  },
  {
    id: 'cloud',
    icon: <Icon name="cloud" />,
    name: '云盘',
  },
  {
    id: 'settings',
    icon: <Icon name="settings" />,
    name: '设置',
  },
]

// 300毫秒滚动动画时长，该项可能会造成歌词时间轴不准确
export const animation_duration = 300
