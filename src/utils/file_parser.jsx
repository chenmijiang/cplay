/**
 * 格式化歌词内容
 *
 * @format
 * @param {string} content textarea content
 * @returns string[]
 */
export function formatLyrics(content) {
  // 兼容不同 操作系统的换行符, 统一采用 \n, 将多余的 \n 缩减到 两个(按照分段来处理)
  return content
    .trim()
    .replace(/(\r\n|\r)/g, '\n')
    .replace(/(\n)\1+/g, '\n\n')
    .split('\n')
}

/**
 * 获取音频文件的信息，如：歌名、专辑图片、歌手名、专辑名
 *
 * 调用 jsmediatags.js 获取信息，网址：https://github.com/aadsm/jsmediatags
 *
 * @param {*} musicfile
 * @returns promise({code,msg,data})
 */
export async function getMusicInfo(musicfile) {
  return new Promise((resolve, reject) => {
    window.jsmediatags.read(musicfile, {
      onSuccess: function (tag) {
        //生成图片url链接
        let picture
        if (tag.tags.picture) {
          let imageData = tag.tags.picture.data
          let base64String = ''
          for (let i = 0; i < imageData.length; i++) {
            base64String += String.fromCharCode(imageData[i])
          }
          picture = 'data:' + tag.tags.picture.format + ';base64,' + window.btoa(base64String)
        }
        resolve({
          code: 200,
          msg: '成功获取音频文件的信息',
          data: {
            artist: tag.tags.artist || '未知',
            name: tag.tags.title || '未知',
            album: tag.tags.album || '未知',
            picUrl: picture || ''
          }
        })
      },
      onError: reject
    })
  })
}
