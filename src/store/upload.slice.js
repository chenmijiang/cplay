import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { songPic as songPicApi, songUrl as songUrlApi } from '@/apis'

// 歌曲封面 && 歌曲播放地址
export const songPicAndUrl = createAsyncThunk('upload/songPicAndUrl', async (
  { id, name, artist, br = 320000 }) => {
  const { data } = await songUrlApi({ id, br })
  const { songs } = await songPicApi({ ids: id })
  return {
    src: data[0].url,
    name,
    artist,
    picUrl: songs[0].al.picUrl,
  }
})

// 歌曲播放地址，一段时间会失效，需要重新请求
export const songUrl = createAsyncThunk('upload/songUrl', async (id, br = 320000) => {
  const { data } = await songUrlApi({ id, br })
  return {
    src: data[0].url
  }
})

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    id: 0, //歌曲id
    src: './music.mp3', //播放源
    name: '海（Original Mix）', //歌曲名称
    artist: '洛天依', //歌手
    picUrl: '', //歌曲图片 && 背景图片
    sameUrled: true, //歌曲图片源是否相同
    //歌词
    lyrics: [
      '作词 : 卦者灵风',
      '作曲 : 卦者灵风/DBRT',
      '编曲：DBRT',
      '调校：DBRT',
      '母带：AVF',
      '混音：DBRT',
      'PV：琉璃猫映像',
      '曲绘：风铃',
      '',
      '“小时候，我常伏在窗口痴想——',
      '山那边是什么呢？',
      '妈妈给我说过：海',
      '哦，山那边是海吗？',
      '于是，怀着一种隐秘的想望',
      '有一天我终于爬上了那个山顶”',
      '',
      '黄昏的天',
      '越过地平线',
      '将山川连绵',
      '晕上了金边',
      '睁开的眼',
      '踮起的脚尖',
      '被繁星点点',
      '遮住视线',
      '我曾以为这世界的边界就在那山尖（在那山尖）',
      '小心翼翼的沿着山路却不敢逾越（不敢逾越）',
      '波光粼粼的海面是连环画上的情节（我的童年）',
      '随着故事完结而停歇',
      '我翻上一座高山',
      '前方依然',
      '山路漫漫',
      '天渐晚',
      '路艰难',
      '一座座的山川',
      '不见终端',
      '我看到那浪花衬起一片鱼肚白',
      '我看到那三江踏着风雷将海面破开',
      '我看到那远方的灯塔闪耀着粉碎了黑暗',
      '我看到了山那边的海',
      '',
      '寂静的夜',
      '淹没了一切',
      '闭上了双眼',
      '憧憬着明天',
      '炽热的天',
      '像一团火焰',
      '躺在池塘边',
      '幻想海面',
      '我曾以为这世界的边界就在我眼前（在我眼前）',
      '气喘吁吁的爬上山巅就以为登天（哦蓝天）',
      '波光粼粼的海面是深夜梦中的情节',
      '随着清晨到来而破灭',
      '我翻上一座高山',
      '前方依然',
      '山路漫漫',
      '天渐晚',
      '路艰难',
      '一座座的山川',
      '不见终端',
      '我看到那浪花衬起一片鱼肚白',
      '我看到那三江踏着风雷将海面破开',
      '我看到那远方的灯塔闪耀着粉碎了黑暗',
      '我看到了山那边的海',
      '',
      '“而在这座山的那边，就是海呀',
      '是一个全新的世界',
      '在一瞬间照亮你的眼睛……”',
    ],
  },
  reducers: {
    uploadLyrics: (state, action) => {
      state.lyrics = action.payload
    },
    uploadMusicWay: (state, action) => {
      const { src, name, artist, picUrl, sameUrled } = action.payload
      state.id = 0
      state.src = src
      state.name = name
      state.artist = artist
      state.picUrl = picUrl
      state.sameUrled = sameUrled
    },
    uploadSameUrl: (state, action) => {
      state.sameUrled = action.payload
    },
    uploadPicUrl: (state, action) => {
      state.picUrl = action.payload
    }
  },
  extraReducers: build => {
    build.addCase(songPicAndUrl.fulfilled, (state, action) => {
      const { src, name, artist, picUrl } = action.payload
      state.src = src
      state.name = name
      state.artist = artist
      state.picUrl = picUrl
    })
  }
})

export const {
  uploadLyrics,
  uploadMusicWay,
  uploadSameUrl,
  uploadPicUrl
} = uploadSlice.actions
export default uploadSlice.reducer