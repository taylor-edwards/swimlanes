import { useEffect } from 'react'
import { useCache } from '../store'

const CacheHandler = ({ children }) => {
  const [lastExport, exportCache, restoreCache] = useCache()
  useEffect(() => {
    if (lastExport.timestamp === null) {
      restoreCache()
    }
  }, [lastExport.timestamp])
  return children
}

export default CacheHandler
