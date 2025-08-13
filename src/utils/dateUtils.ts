/**
 * 日期时间工具函数
 */

/**
 * 格式化日期为北京时间
 * @param dateString - 日期字符串或时间戳
 * @returns 格式化后的北京时间字符串
 */
export const formatToBeijingTime = (dateString: string | number | Date): string => {
  if (!dateString) return '未知时间'
  
  try {
    const date = new Date(dateString)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return '无效时间'
    }
    
    // 转换为北京时间 (UTC+8)
    return date.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch (error) {
    console.error('日期格式化错误:', error)
    return '格式错误'
  }
}

/**
 * 格式化日期为北京时间（简化版，不包含秒）
 * @param dateString - 日期字符串或时间戳
 * @returns 格式化后的北京时间字符串
 */
export const formatToBeijingTimeShort = (dateString: string | number | Date): string => {
  if (!dateString) return '未知时间'
  
  try {
    const date = new Date(dateString)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return '无效时间'
    }
    
    // 转换为北京时间 (UTC+8)
    return date.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('日期格式化错误:', error)
    return '格式错误'
  }
}

/**
 * 格式化日期为北京时间（仅日期）
 * @param dateString - 日期字符串或时间戳
 * @returns 格式化后的北京时间日期字符串
 */
export const formatToBeijingDate = (dateString: string | number | Date): string => {
  if (!dateString) return '未知日期'
  
  try {
    const date = new Date(dateString)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return '无效日期'
    }
    
    // 转换为北京时间 (UTC+8)
    return date.toLocaleDateString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch (error) {
    console.error('日期格式化错误:', error)
    return '格式错误'
  }
}

/**
 * 获取相对时间描述（如：2小时前、1天前等）
 * @param dateString - 日期字符串或时间戳
 * @returns 相对时间描述
 */
export const getRelativeTime = (dateString: string | number | Date): string => {
  if (!dateString) return '未知时间'
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return '无效时间'
    }
    
    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffSeconds < 60) {
      return '刚刚'
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`
    } else if (diffHours < 24) {
      return `${diffHours}小时前`
    } else if (diffDays < 7) {
      return `${diffDays}天前`
    } else {
      // 超过7天显示具体日期
      return formatToBeijingDate(dateString)
    }
  } catch (error) {
    console.error('相对时间计算错误:', error)
    return '时间错误'
  }
}