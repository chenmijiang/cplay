import jschardet from 'jschardet'

/**
 * 歌词文件
 *
 * @param {*} file 格式采用 txt
 * @returns promise({data})
 */
export async function formatLyrics(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      const txtbina = e.target.result
      // 用 jschardet 拿文件流编码 ，可能会存在偏差
      const coding = jschardet.detect(txtbina)
      let reader1 = new FileReader()
      reader1.readAsText(file, coding)
      reader1.onload = (e) => {
        // 兼容不同 操作系统的换行符, 统一采用 \n, 将多余的 \n 缩减到 两个(按照分段来处理)
        let dataArr = e.target.result
          .replace(/(\r\n|\r)/g, '\n')
          .replace(/(\n)\1+/g, '\n\n')
          .split('\n')
        resolve(dataArr)
      }
    }
  })
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
          picture =
            'data:' +
            tag.tags.picture.format +
            ';base64,' +
            window.btoa(base64String)
        }
        resolve({
          code: 200,
          msg: '成功获取音频文件的信息',
          data: {
            artist: tag.tags.artist || '未知',
            name: tag.tags.title || '未知',
            album: tag.tags.album || '未知',
            picUrl: picture || '',
          },
        })
      },
      onError: reject,
    })
  })
}
