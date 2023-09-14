import { useEffect, useState } from 'react';

export default function useLocalStorage() {
  const [storage, setStorage] = useState<Storage>()

  useEffect(() => {
    setStorage(localStorage || null)
  }, [])

  return [storage, {
    get: storage?.getItem,
    set: storage?.setItem,
    clear: storage?.clear,
    remove: storage?.removeItem,
  }]
}