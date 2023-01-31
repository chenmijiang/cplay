//歌词操作
const lyricsEdit = {
  //2种模式：编辑模式，可编辑预览模式
  //edited === true 编辑模式(显示所有时间轴)
  //edited === false 可编辑预览模式(点击歌词才显示时间轴，并且歌词可滚动)
  edited: true,
  // edited == false && viewed == (true || false)
  copyed: false, //区分登录和未登录时关闭窗口是否保存音频文件和歌词文件
  uploaded: false, //区分登录和未登录时关闭窗口是否保存音频文件和歌词文件
  currentIndex: -1, //当前索引
  //时间轴
  times: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
}

export default lyricsEdit