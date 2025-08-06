/**
 * 前端数据存储工具类
 * 提供localStorage、sessionStorage、IndexedDB等多种存储方式
 */

// 存储类型枚举
export enum StorageType {
  LOCAL = 'localStorage',
  SESSION = 'sessionStorage',
  INDEXEDDB = 'indexedDB'
}

// 存储配置接口
export interface StorageConfig {
  type: StorageType
  key: string
  expiry?: number // 过期时间（毫秒）
  encrypt?: boolean // 是否加密
}

// 存储数据接口
export interface StorageData<T = any> {
  value: T
  timestamp: number
  expiry?: number
}

// 简单的加密/解密函数
class SimpleEncryption {
  private static key = 'teach-ppt-key'

  static encrypt(text: string): string {
    return btoa(encodeURIComponent(text))
  }

  static decrypt(encryptedText: string): string {
    try {
      return decodeURIComponent(atob(encryptedText))
    } catch {
      return encryptedText
    }
  }
}

// 本地存储管理类
export class LocalStorageManager {
  /**
   * 设置数据到localStorage
   */
  static set<T>(key: string, value: T, expiry?: number, encrypt = false): boolean {
    try {
      const data: StorageData<T> = {
        value,
        timestamp: Date.now(),
        expiry
      }
      
      let jsonString = JSON.stringify(data)
      if (encrypt) {
        jsonString = SimpleEncryption.encrypt(jsonString)
      }
      
      localStorage.setItem(key, jsonString)
      return true
    } catch (error) {
      console.error('LocalStorage set error:', error)
      return false
    }
  }

  /**
   * 从localStorage获取数据
   */
  static get<T>(key: string, decrypt = false): T | null {
    try {
      let item = localStorage.getItem(key)
      if (!item) return null

      if (decrypt) {
        item = SimpleEncryption.decrypt(item)
      }

      const data: StorageData<T> = JSON.parse(item)
      
      // 检查是否过期
      if (data.expiry && Date.now() > data.timestamp + data.expiry) {
        localStorage.removeItem(key)
        return null
      }

      return data.value
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return null
    }
  }

  /**
   * 删除localStorage中的数据
   */
  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('LocalStorage remove error:', error)
      return false
    }
  }

  /**
   * 清空localStorage
   */
  static clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('LocalStorage clear error:', error)
      return false
    }
  }

  /**
   * 获取localStorage使用情况
   */
  static getUsage(): { used: number; total: number; percentage: number } {
    let used = 0
    const total = 5 * 1024 * 1024 // 5MB (大概的localStorage限制)
    
    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length
        }
      }
    } catch (error) {
      console.error('LocalStorage usage calculation error:', error)
    }
    
    return {
      used,
      total,
      percentage: Math.round((used / total) * 100)
    }
  }
}

// SessionStorage管理类
export class SessionStorageManager {
  /**
   * 设置数据到sessionStorage
   */
  static set<T>(key: string, value: T, encrypt = false): boolean {
    try {
      const data: StorageData<T> = {
        value,
        timestamp: Date.now()
      }
      
      let jsonString = JSON.stringify(data)
      if (encrypt) {
        jsonString = SimpleEncryption.encrypt(jsonString)
      }
      
      sessionStorage.setItem(key, jsonString)
      return true
    } catch (error) {
      console.error('SessionStorage set error:', error)
      return false
    }
  }

  /**
   * 从sessionStorage获取数据
   */
  static get<T>(key: string, decrypt = false): T | null {
    try {
      let item = sessionStorage.getItem(key)
      if (!item) return null

      if (decrypt) {
        item = SimpleEncryption.decrypt(item)
      }

      const data: StorageData<T> = JSON.parse(item)
      return data.value
    } catch (error) {
      console.error('SessionStorage get error:', error)
      return null
    }
  }

  /**
   * 删除sessionStorage中的数据
   */
  static remove(key: string): boolean {
    try {
      sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('SessionStorage remove error:', error)
      return false
    }
  }

  /**
   * 清空sessionStorage
   */
  static clear(): boolean {
    try {
      sessionStorage.clear()
      return true
    } catch (error) {
      console.error('SessionStorage clear error:', error)
      return false
    }
  }
}

// IndexedDB管理类
export class IndexedDBManager {
  private static dbName = 'TeachPPTDB'
  private static version = 1
  private static db: IDBDatabase | null = null

  /**
   * 初始化IndexedDB
   */
  static async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => {
        console.error('IndexedDB open error:', request.error)
        resolve(false)
      }
      
      request.onsuccess = () => {
        this.db = request.result
        resolve(true)
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // 创建对象存储
        if (!db.objectStoreNames.contains('data')) {
          const store = db.createObjectStore('data', { keyPath: 'key' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('projects')) {
          const projectStore = db.createObjectStore('projects', { keyPath: 'id' })
          projectStore.createIndex('workspaceId', 'workspaceId', { unique: false })
          projectStore.createIndex('createdAt', 'createdAt', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('templates')) {
          const templateStore = db.createObjectStore('templates', { keyPath: 'id' })
          templateStore.createIndex('category', 'category', { unique: false })
        }
      }
    })
  }

  /**
   * 设置数据到IndexedDB
   */
  static async set<T>(key: string, value: T, storeName = 'data'): Promise<boolean> {
    if (!this.db) {
      await this.init()
    }
    
    return new Promise((resolve) => {
      if (!this.db) {
        resolve(false)
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      
      const data = {
        key,
        value,
        timestamp: Date.now()
      }
      
      const request = store.put(data)
      
      request.onsuccess = () => resolve(true)
      request.onerror = () => {
        console.error('IndexedDB set error:', request.error)
        resolve(false)
      }
    })
  }

  /**
   * 从IndexedDB获取数据
   */
  static async get<T>(key: string, storeName = 'data'): Promise<T | null> {
    if (!this.db) {
      await this.init()
    }
    
    return new Promise((resolve) => {
      if (!this.db) {
        resolve(null)
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(key)
      
      request.onsuccess = () => {
        const result = request.result
        resolve(result ? result.value : null)
      }
      
      request.onerror = () => {
        console.error('IndexedDB get error:', request.error)
        resolve(null)
      }
    })
  }

  /**
   * 删除IndexedDB中的数据
   */
  static async remove(key: string, storeName = 'data'): Promise<boolean> {
    if (!this.db) {
      await this.init()
    }
    
    return new Promise((resolve) => {
      if (!this.db) {
        resolve(false)
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)
      
      request.onsuccess = () => resolve(true)
      request.onerror = () => {
        console.error('IndexedDB remove error:', request.error)
        resolve(false)
      }
    })
  }

  /**
   * 获取所有数据
   */
  static async getAll<T>(storeName = 'data'): Promise<T[]> {
    if (!this.db) {
      await this.init()
    }
    
    return new Promise((resolve) => {
      if (!this.db) {
        resolve([])
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()
      
      request.onsuccess = () => {
        const results = request.result || []
        resolve(results.map(item => item.value))
      }
      
      request.onerror = () => {
        console.error('IndexedDB getAll error:', request.error)
        resolve([])
      }
    })
  }
}

// 统一存储管理器
export class StorageManager {
  /**
   * 根据配置存储数据
   */
  static async set<T>(config: StorageConfig, value: T): Promise<boolean> {
    switch (config.type) {
      case StorageType.LOCAL:
        return LocalStorageManager.set(config.key, value, config.expiry, config.encrypt)
      case StorageType.SESSION:
        return SessionStorageManager.set(config.key, value, config.encrypt)
      case StorageType.INDEXEDDB:
        return await IndexedDBManager.set(config.key, value)
      default:
        return false
    }
  }

  /**
   * 根据配置获取数据
   */
  static async get<T>(config: StorageConfig): Promise<T | null> {
    switch (config.type) {
      case StorageType.LOCAL:
        return LocalStorageManager.get<T>(config.key, config.encrypt)
      case StorageType.SESSION:
        return SessionStorageManager.get<T>(config.key, config.encrypt)
      case StorageType.INDEXEDDB:
        return await IndexedDBManager.get<T>(config.key)
      default:
        return null
    }
  }

  /**
   * 根据配置删除数据
   */
  static async remove(config: StorageConfig): Promise<boolean> {
    switch (config.type) {
      case StorageType.LOCAL:
        return LocalStorageManager.remove(config.key)
      case StorageType.SESSION:
        return SessionStorageManager.remove(config.key)
      case StorageType.INDEXEDDB:
        return await IndexedDBManager.remove(config.key)
      default:
        return false
    }
  }
}

// 常用存储键名常量
export const STORAGE_KEYS = {
  // 用户设置
  USER_SETTINGS: 'user_settings',
  USER_PREFERENCES: 'user_preferences',
  
  // 工作空间
  CURRENT_WORKSPACE: 'current_workspace',
  WORKSPACE_SETTINGS: 'workspace_settings',
  
  // 项目数据
  PROJECT_DRAFTS: 'project_drafts',
  PROJECT_CACHE: 'project_cache',
  
  // 应用状态
  APP_STATE: 'app_state',
  THEME_SETTINGS: 'theme_settings',
  
  // 临时数据
  TEMP_DATA: 'temp_data',
  FORM_DATA: 'form_data'
} as const

// 导出默认实例
export default {
  LocalStorageManager,
  SessionStorageManager,
  IndexedDBManager,
  StorageManager,
  STORAGE_KEYS
}