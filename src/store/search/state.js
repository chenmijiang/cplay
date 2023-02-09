// 搜索
const search = {
  // {keyword: '搜索关键词'}
  history: [],
  // {name: '歌曲名', id: '歌曲id', pic: '歌曲封面', artist: '歌手名'}
  songs: [],
  // 搜索缓存，key为搜索关键词，value为缓存Map，默认最多缓存5组
  songsCache: {}
}

export default search