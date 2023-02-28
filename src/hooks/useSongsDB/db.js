import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";

import { idbConfig } from '@/configs/default'

// 初始化数据库
export const initDB = () => setupIndexedDB(idbConfig)

// 获取数据库
const useDB = () => useIndexedDBStore("songs")

export default useDB