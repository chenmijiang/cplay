import { songCheck as songCheckApi } from '@/apis'

// 歌曲是否可用
export const songCheck = async (id, br = 320000) => {
  const result = await songCheckApi({ id, br })
  return result
}