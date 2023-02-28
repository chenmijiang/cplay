import useDB, { initDB } from "./db";
import { useCallback } from "react";

export const useSongsDB = () => {
  const { add, getOneByKey, getAll, deleteAll, deleteByID } = useDB()
  const clearExtratSong = useCallback(async (name) => {
    let songs = await getAll()
    songs.forEach((song) => {
      if (song.file.name === name) {
        deleteByID(song.id)
      }
    })
  }, [getAll, deleteByID])

  // 查询一条 db 数据
  const selectSong = useCallback((sid) => getOneByKey('sid', sid), [getOneByKey])
  // 写入一条 db 数据
  // 保存歌曲的sid: 歌曲名称+歌手名称+上传时间
  const addSong = useCallback(async (sid, file) => {
    await clearExtratSong(file.name)
    add({ sid, file })
  }, [add, clearExtratSong])
  // 删除一条 db 数据
  const deleteSong = useCallback(async (sid) => {
    let song = await selectSong(sid)
    deleteByID(song.id)
  }, [selectSong, deleteByID])
  // 删除所有 db 数据
  const clearAllSongs = useCallback(() => deleteAll(), [deleteAll])

  return { addSong, deleteSong, clearAllSongs, selectSong }
}

export { initDB }
