/** @format */

import Icon from '@/components/common/IconSvg'

export const navbar_links = [
  { path: '/', detail: '首页' },
  { path: '/space', detail: '个人空间' }
]

export const side_navlinks = [
  {
    id: 'search',
    icon: <Icon name="search" />,
    name: '搜索'
  },
  {
    id: 'history',
    icon: <Icon name="history" />,
    name: '历史'
  },
  {
    id: 'cloud',
    icon: <Icon name="cloud" />,
    name: '云盘'
  },
  {
    id: 'settings',
    icon: <Icon name="settings" />,
    name: '设置'
  }
]

export const qualityItems = [
  { id: 1, name: '标准 - 128Kbps', value: 128000 },
  { id: 2, name: '较高 - 192Kbps', value: 192000 },
  { id: 3, name: '高品质 - 320Kbps', value: 320000 }
]

export const idbConfig = {
  databaseName: 'songs-db',
  version: 1,
  stores: [
    {
      name: 'songs',
      id: { keyPath: 'id', autoIncrement: true },
      indices: [
        // 保存歌曲的sid
        { name: 'sid', keyPath: 'sid', options: { unique: false } },
        // 保存歌曲源
        { name: 'file', keyPath: 'file', options: { unique: false } }
      ]
    }
  ]
}
