import { useState } from 'react'

import { getMusicInfo } from '@/utils/file_parser'

export default function useMusicFile() {
  const [musicfile, setMusicfile] = useState({})
  const [isMusicUpload, setIsMusicUpload] = useState(false)

  function musicChangeListener({ target }) {
    let result = checkFile(target, 'audio')
    if (result.code === 200) {
      getMusicInfo(result.data.file).then(({ data }) => {
        // 音频链接
        let src = URL.createObjectURL(result.data.file)
        data.src = src
        data.sameUrled = false
        setMusicfile(data)
      })
    }
    setIsMusicUpload(result.code === 200 ? true : false)
  }

  return [[musicfile, isMusicUpload], musicChangeListener]
}

function checkFile(el, type) {
  let file = el.files[0]
  return file && file.type.includes(type)
    ? {
      code: 200,
      data: { file },
    }
    : {
      code: 500,
      data: { msg: '文件格式错误或空文件' },
    }
}
