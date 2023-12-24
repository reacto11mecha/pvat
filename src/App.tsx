import { useEffect, useState } from 'react'

import './App.css'

const usePageVisibility = () => {
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const cbBlur = () =>
      setIsPageVisible(false)

    const cbFocus = () =>
      setIsPageVisible(true)

    window.addEventListener("blur", cbBlur)
    window.addEventListener("focus", cbFocus)

    return () => {
      window.removeEventListener("blur", cbBlur)
      window.removeEventListener("focus", cbFocus)
    }
  }, [])

  return { isPageVisible }
}

function App() {
  const [results, setResults] = useState<string[]>([])

  const { isPageVisible } = usePageVisibility()

  useEffect(() => {
    setResults(prev => [...prev, `Is visible? ${isPageVisible}`])
  }, [isPageVisible])

  return (
    <div>
      <h1>Page visibility test</h1>
      <ul>
        {results.map((res, idx) => <li key={idx}>{res}</li>)}
      </ul>
    </div>
  )
}

export default App
