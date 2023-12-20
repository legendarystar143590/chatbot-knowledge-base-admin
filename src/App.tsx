import { lazy, useEffect } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { themeChange } from 'theme-change'

const Layout = lazy(() => import('./containers/Layout'))
const Landing = lazy(() => import('./pages/Landing'))

function App() {

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Layout />} />

        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
